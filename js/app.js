/* =========================================================
 * 互動功能：日期選單、行前清單、收支記帳、心得筆記、每日預算試算
 * 資料存在 localStorage（只在本機瀏覽器）
 * ========================================================= */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const WEEK = ["日", "一", "二", "三", "四", "五", "六"];
  const parseDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
  const md = (iso) => { const d = parseDate(iso); return `${d.getMonth() + 1}/${d.getDate()}`; };
  const wk = (iso) => WEEK[parseDate(iso).getDay()];
  const fmtUSD = (n) => "$" + (Math.round(n * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const fmtTWD = (n) => "NT$" + Math.round(n).toLocaleString("en-US");
  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) && n >= 0 ? n : 0; };

  const KEY = "palau2027:v1";
  const store = {
    load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } },
    save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ } },
  };

  const DEFAULT_RATE = 32.5; // 參考值，使用者可修改
  const saved = store.load();
  const state = {
    selected: saved.selected && ITINERARY.some((d) => d.date === saved.selected) ? saved.selected : ITINERARY[0].date,
    checks: saved.checks || {},
    custom: saved.custom || [],
    ledger: saved.ledger || [],
    notes: saved.notes || {},
    budget: Object.assign({ rate: DEFAULT_RATE, total: 30000, totalCur: "TWD", days: ITINERARY.length, perDay: {} }, saved.budget || {}),
  };

  const dayIndex = (iso) => ITINERARY.findIndex((d) => d.date === iso);
  const dayLabel = (iso) => {
    if (iso === "pre") return "行前";
    if (iso === TRAINING.date) return "行前培訓 7/14";
    const i = dayIndex(iso);
    return i >= 0 ? `Day ${i + 1}・${md(iso)}（${wk(iso)}）` : iso;
  };
  const toUSD = (amt, cur) => (cur === "USD" ? amt : amt / state.budget.rate);
  const toTWD = (amt, cur) => (cur === "TWD" ? amt : amt * state.budget.rate);

  /* ========== NAV ========== */
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open);
    links.classList.toggle("open", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); links.classList.remove("open"); }
  });

  /* ========== TRAINING ========== */
  $("#training-meta").innerHTML = `${esc(TRAINING.label)}<br>${esc(TRAINING.place)}　<a class="map-btn" style="margin-left:4px" target="_blank" rel="noopener" href="${mapsUrl(TRAINING.mapQuery)}">在 Google Maps 開啟 ↗</a>`;
  $("#training-focus").innerHTML = `<span class="warn">${esc(TRAINING.note)}</span>` + TRAINING.focus.map((f) => `<span>${esc(f)}</span>`).join("");
  $("#training-list").innerHTML = TRAINING.sessions.map((s) => `
    <li class="${s.type === "Break" ? "is-break" : ""}" data-reveal>
      <span class="t-time">${esc(s.time)}</span>
      <span class="t-type">${esc(s.type)}</span>
      <div><p class="t-title">${esc(s.title)}</p>${s.desc ? `<p class="t-desc">${esc(s.desc)}</p>` : ""}</div>
    </li>`).join("");

  /* ========== DAY MENU ========== */
  const menu = $("#day-menu");
  menu.innerHTML = ITINERARY.map((d, i) => `
    <button class="day-chip" role="tab" id="tab-${d.date}" data-date="${d.date}" aria-selected="false" aria-controls="day-panel">
      <span class="d-sub">Day ${i + 1}</span>
      <span class="d-num">${md(d.date)}</span>
      <span class="d-sub">週${wk(d.date)}</span>
    </button>`).join("");
  menu.addEventListener("click", (e) => {
    const b = e.target.closest(".day-chip");
    if (b) selectDay(b.dataset.date);
  });
  menu.addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const i = dayIndex(state.selected) + (e.key === "ArrowRight" ? 1 : -1);
    if (ITINERARY[i]) { selectDay(ITINERARY[i].date); $(`#tab-${ITINERARY[i].date}`).focus(); }
  });

  function renderDay() {
    const i = dayIndex(state.selected);
    const d = ITINERARY[i];
    const img = IMAGES[d.img];
    $$(".day-chip", menu).forEach((b) => {
      const on = b.dataset.date === d.date;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
    });
    $("#day-panel").setAttribute("aria-labelledby", `tab-${d.date}`);
    $("#day-panel").innerHTML = `
      <figure class="day-hero">
        ${img ? `<img src="${img.src}" alt="${esc(img.alt)}" loading="lazy" onerror="this.remove()"><figcaption>${esc(img.alt)}・${esc(img.author)} / ${esc(img.license)}</figcaption>` : ""}
      </figure>
      <div class="day-body">
        <div class="day-meta">
          <span>Day ${i + 1}・${md(d.date)}（${wk(d.date)}）</span>
          <span class="day-badge">${esc(d.theme)}</span>
          ${d.sdg.map((n) => `<span class="day-badge">SDG ${n} ${esc(SDG_NAMES[n] || "")}</span>`).join("")}
        </div>
        <h3 class="day-title">${esc(d.title)}</h3>
        <p class="day-summary">${esc(d.summary)}</p>
        <div class="spots">
          ${d.spots.map((s) => `
            <div class="spot">
              <div><h4>${esc(s.name)}</h4><p>${esc(s.desc)}</p></div>
              <a class="map-btn" href="${mapsUrl(s.map)}" target="_blank" rel="noopener">在 Google Maps 開啟 ↗</a>
            </div>`).join("")}
        </div>
        <div class="day-nav">
          <button class="btn btn-ghost-dark" data-go="-1" ${i === 0 ? "disabled style='visibility:hidden'" : ""}>← 前一天</button>
          <button class="btn btn-ghost-dark" data-go="1" ${i === ITINERARY.length - 1 ? "disabled style='visibility:hidden'" : ""}>後一天 →</button>
        </div>
      </div>`;
    const chip = $(`#tab-${d.date}`);
    const wrap = $(".day-menu-wrap");
    wrap.scrollTo({ left: chip.offsetLeft - wrap.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }
  $("#day-panel").addEventListener("click", (e) => {
    const b = e.target.closest("[data-go]");
    if (!b) return;
    const n = ITINERARY[dayIndex(state.selected) + Number(b.dataset.go)];
    if (n) selectDay(n.date);
  });

  function selectDay(iso) {
    state.selected = iso;
    store.save();
    renderDay();
    renderBudgetDay();
    renderNotes();
    if ($("#lg-filter").checked) renderLedger();
    $("#lg-date").value = iso;
  }

  /* ========== CHECKLIST ========== */
  function allItems() {
    const groups = CHECKLIST.map((g, gi) => ({ group: g.group, items: g.items.map((t, ii) => ({ id: `c${gi}-${ii}`, text: t })) }));
    if (state.custom.length) groups.push({ group: "我的項目", items: state.custom.map((c) => ({ id: c.id, text: c.text, custom: true })) });
    return groups;
  }
  function renderChecklist() {
    const groups = allItems();
    $("#check-groups").innerHTML = groups.map((g) => `
      <div class="check-group">
        <h3>${esc(g.group)}</h3>
        ${g.items.map((it) => `
          <label class="check-item">
            <input type="checkbox" data-id="${it.id}" ${state.checks[it.id] ? "checked" : ""}>
            <span>${esc(it.text)}</span>
            ${it.custom ? `<button type="button" class="rm" data-rm="${it.id}" aria-label="刪除 ${esc(it.text)}">×</button>` : ""}
          </label>`).join("")}
      </div>`).join("");
    updateCheckProgress();
  }
  function updateCheckProgress() {
    const ids = allItems().flatMap((g) => g.items.map((i) => i.id));
    const done = ids.filter((id) => state.checks[id]).length;
    $("#check-bar").style.width = ids.length ? (done / ids.length) * 100 + "%" : "0";
    $("#check-count").textContent = `已完成 ${done} / ${ids.length} 項` + (done === ids.length && ids.length ? "　🎒 準備好出發了！" : "");
  }
  $("#check-groups").addEventListener("change", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    state.checks[id] = e.target.checked;
    store.save();
    updateCheckProgress();
  });
  $("#check-groups").addEventListener("click", (e) => {
    const rm = e.target.closest("[data-rm]");
    if (!rm) return;
    e.preventDefault();
    state.custom = state.custom.filter((c) => c.id !== rm.dataset.rm);
    delete state.checks[rm.dataset.rm];
    store.save();
    renderChecklist();
  });
  $("#check-add").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = $("#check-new").value.trim();
    if (!v) return;
    state.custom.push({ id: "u" + Date.now(), text: v });
    $("#check-new").value = "";
    store.save();
    renderChecklist();
  });
  $("#check-reset").addEventListener("click", () => {
    if (!confirm("確定要取消所有勾選嗎？")) return;
    state.checks = {};
    store.save();
    renderChecklist();
  });

  /* ========== LEDGER ========== */
  const ledgerDates = ["pre", TRAINING.date, ...ITINERARY.map((d) => d.date)];
  $("#lg-date").innerHTML = ledgerDates.map((d) => `<option value="${d}">${esc(dayLabel(d))}</option>`).join("");
  $("#lg-date").value = state.selected;

  $("#ledger-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const amt = num($("#lg-amt").value);
    if (!amt) { $("#lg-amt").focus(); return; }
    state.ledger.push({
      id: "l" + Date.now(),
      date: $("#lg-date").value,
      type: $("#lg-type").value,
      cat: $("#lg-cat").value,
      amt,
      cur: $("#lg-cur").value,
      note: $("#lg-note").value.trim().slice(0, 60),
    });
    $("#lg-amt").value = "";
    $("#lg-note").value = "";
    store.save();
    renderLedger();
    renderBudgetDay();
    renderSummary();
  });
  $("#ledger-list").addEventListener("click", (e) => {
    const rm = e.target.closest("[data-rm]");
    if (!rm) return;
    state.ledger = state.ledger.filter((l) => l.id !== rm.dataset.rm);
    store.save();
    renderLedger();
    renderBudgetDay();
    renderSummary();
  });
  $("#lg-filter").addEventListener("change", renderLedger);

  function renderLedger() {
    let inc = 0, out = 0;
    state.ledger.forEach((l) => { const t = toTWD(l.amt, l.cur); l.type === "in" ? (inc += t) : (out += t); });
    const bal = inc - out;
    $("#ledger-stats").innerHTML = `
      <div class="stat pos"><p class="k">收入</p><p class="v">${fmtTWD(inc)}</p><p class="s">≈ ${fmtUSD(inc / state.budget.rate)}</p></div>
      <div class="stat"><p class="k">支出</p><p class="v">${fmtTWD(out)}</p><p class="s">≈ ${fmtUSD(out / state.budget.rate)}</p></div>
      <div class="stat ${bal >= 0 ? "pos" : ""}"><p class="k">結餘</p><p class="v">${fmtTWD(bal)}</p><p class="s">≈ ${fmtUSD(bal / state.budget.rate)}</p></div>`;

    const filter = $("#lg-filter").checked;
    const order = (d) => ledgerDates.indexOf(d);
    const rows = state.ledger
      .filter((l) => !filter || l.date === state.selected)
      .sort((a, b) => order(a.date) - order(b.date) || a.id.localeCompare(b.id));
    $("#ledger-list").innerHTML = rows.length
      ? rows.map((l) => {
          const other = l.cur === "USD" ? fmtTWD(toTWD(l.amt, "USD")) : fmtUSD(toUSD(l.amt, "TWD"));
          const main = l.cur === "USD" ? fmtUSD(l.amt) : fmtTWD(l.amt);
          const dl = l.date === "pre" ? "行前" : md(l.date);
          return `<li class="${l.type}">
            <span class="l-date">${dl}</span>
            <div><p class="l-cat">${l.type === "in" ? "＋ " : ""}${esc(l.cat)}</p>${l.note ? `<p class="l-note">${esc(l.note)}</p>` : ""}</div>
            <span class="l-amt">${l.type === "in" ? "+" : "−"}${main}<small>≈ ${other}</small></span>
            <button type="button" class="rm" data-rm="${l.id}" aria-label="刪除這筆">×</button>
          </li>`;
        }).join("")
      : `<li class="empty">${filter ? "這一天還沒有紀錄" : "還沒有任何紀錄，從上方新增第一筆吧"}</li>`;
  }

  /* ========== NOTES ========== */
  const noteFields = { see: "#note-see", hear: "#note-hear", feel: "#note-feel", free: "#note-free" };
  let noteTimer;
  function renderNotes() {
    const n = state.notes[state.selected] || {};
    $("#notes-day").textContent = dayLabel(state.selected) + "　" + ITINERARY[dayIndex(state.selected)].title;
    Object.entries(noteFields).forEach(([k, sel]) => { $(sel).value = n[k] || ""; });
  }
  Object.entries(noteFields).forEach(([k, sel]) => {
    $(sel).addEventListener("input", (e) => {
      (state.notes[state.selected] ||= {})[k] = e.target.value;
      const s = $("#notes-saved");
      s.textContent = "儲存中…";
      clearTimeout(noteTimer);
      noteTimer = setTimeout(() => { store.save(); s.textContent = "已自動儲存"; }, 400);
    });
  });
  $("#notes-export").addEventListener("click", () => {
    const parts = ITINERARY.map((d) => {
      const n = state.notes[d.date];
      if (!n || !Object.values(n).some((v) => v && v.trim())) return null;
      return `【${dayLabel(d.date)}】${d.title}\n看見：${n.see || ""}\n聽見：${n.hear || ""}\n體驗：${n.feel || ""}\n心得：${n.free || ""}\n`;
    }).filter(Boolean);
    if (!parts.length) { alert("目前還沒有筆記內容。"); return; }
    const blob = new Blob(["帛琉南島永續實踐計畫・田野筆記\n\n" + parts.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "palau-notes.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  /* ========== BUDGET SIDEBAR ========== */
  const CATS = [
    { k: "food", label: "餐飲" },
    { k: "trans", label: "交通" },
    { k: "ticket", label: "門票活動" },
    { k: "gift", label: "紀念品" },
    { k: "other", label: "其他" },
  ];
  const B = state.budget;
  $("#bd-rate").value = B.rate;
  $("#bd-total").value = B.total;
  $("#bd-total-cur").value = B.totalCur;
  $("#bd-days").value = B.days;
  $("#bd-cats").innerHTML = CATS.map((c) => `<label>${c.label}（USD）<input type="number" min="0" step="1" data-cat="${c.k}" placeholder="0" inputmode="decimal"></label>`).join("");

  const totalUSD = () => toUSD(num(B.total), B.totalCur);
  const avgUSD = () => totalUSD() / Math.max(1, Math.round(num(B.days)) || 1);
  const dayPlanUSD = (iso) => CATS.reduce((s, c) => s + num((B.perDay[iso] || {})[c.k]), 0);
  const daySpentUSD = (iso) => state.ledger.filter((l) => l.date === iso && l.type === "out").reduce((s, l) => s + toUSD(l.amt, l.cur), 0);

  function renderAvg() {
    const a = avgUSD();
    $("#bd-avg-usd").textContent = fmtUSD(a);
    $("#bd-avg-twd").textContent = "≈ " + fmtTWD(a * B.rate) + " / 天";
  }
  function renderBudgetDay() {
    const iso = state.selected;
    const p = B.perDay[iso] || {};
    $("#bd-day-label").textContent = "・" + dayLabel(iso);
    $$("#bd-cats input").forEach((inp) => { inp.value = p[inp.dataset.cat] ?? ""; });
    renderCompare();
  }
  function renderCompare() {
    const iso = state.selected;
    const plan = dayPlanUSD(iso);
    $("#bd-day-usd").textContent = fmtUSD(plan);
    $("#bd-day-twd").textContent = "≈ " + fmtTWD(plan * B.rate);

    const avg = avgUSD();
    const spent = daySpentUSD(iso);
    const target = plan || avg;
    const pct = target ? Math.min(100, (spent / target) * 100) : 0;
    const over = spent > target && target > 0;
    const planVsAvg = plan
      ? (plan > avg ? `<span class="over">比平均可花多 ${fmtUSD(plan - avg)}</span>` : `比平均可花少 ${fmtUSD(avg - plan)}`)
      : "尚未填寫本日預估，以下用平均值比較";
    $("#bd-compare").innerHTML = `
      <p>${planVsAvg}</p>
      <p style="margin-top:8px">本日實際支出（記帳）：<strong>${fmtUSD(spent)}</strong> / ${fmtUSD(target)}</p>
      <div class="bar ${over ? "over-bar" : ""}"><span style="width:${pct}%"></span></div>
      <p>${over ? `<span class="over">已超支 ${fmtUSD(spent - target)}</span>` : `還可以花 ${fmtUSD(Math.max(0, target - spent))}（≈ ${fmtTWD(Math.max(0, target - spent) * B.rate)}）`}</p>`;
    $("#fab-amt").textContent = fmtUSD(Math.max(0, target - spent));
  }
  function renderSummary() {
    const total = totalUSD();
    const planned = ITINERARY.reduce((s, d) => s + dayPlanUSD(d.date), 0);
    const spent = state.ledger.filter((l) => l.type === "out").reduce((s, l) => s + toUSD(l.amt, l.cur), 0);
    const income = state.ledger.filter((l) => l.type === "in").reduce((s, l) => s + toUSD(l.amt, l.cur), 0);
    const cell = (v) => `<dd class="${v < 0 ? "neg" : ""}">${fmtUSD(v)}<br><span class="muted" style="font-weight:400;font-size:12px">${fmtTWD(v * B.rate)}</span></dd>`;
    $("#bd-summary").innerHTML = `
      <dt>總預算</dt>${cell(total)}
      <dt>逐日預估合計</dt>${cell(planned)}
      <dt>預估後剩餘</dt>${cell(total - planned)}
      <dt>實際支出（記帳）</dt>${cell(spent)}
      <dt>實際剩餘（含收入）</dt>${cell(total + income - spent)}`;
  }
  function renderAllBudget() { renderAvg(); renderCompare(); renderSummary(); }

  $("#bd-rate").addEventListener("input", (e) => { B.rate = num(e.target.value) || DEFAULT_RATE; store.save(); renderAllBudget(); renderLedger(); });
  $("#bd-total").addEventListener("input", (e) => { B.total = num(e.target.value); store.save(); renderAllBudget(); });
  $("#bd-total-cur").addEventListener("change", (e) => { B.totalCur = e.target.value; store.save(); renderAllBudget(); });
  $("#bd-days").addEventListener("input", (e) => { B.days = Math.max(1, Math.round(num(e.target.value)) || 1); store.save(); renderAllBudget(); });
  $("#bd-cats").addEventListener("input", (e) => {
    const k = e.target.dataset.cat;
    if (!k) return;
    (B.perDay[state.selected] ||= {})[k] = e.target.value === "" ? "" : num(e.target.value);
    store.save();
    renderCompare();
    renderSummary();
  });

  /* mobile sheet */
  const sheet = $("#budget"), fab = $("#budget-fab"), backdrop = $("#budget-backdrop");
  const setSheet = (open) => {
    sheet.classList.toggle("open", open);
    backdrop.hidden = !open;
    fab.setAttribute("aria-expanded", open);
    document.documentElement.classList.toggle("sheet-open", open);
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  };
  fab.addEventListener("click", () => setSheet(true));
  backdrop.addEventListener("click", () => setSheet(false));
  $(".budget-close").addEventListener("click", () => setSheet(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setSheet(false); });
  /* FAB 只在進入行程規劃區後出現 */
  const planner = $("#planner");
  const io = new IntersectionObserver(([en]) => fab.classList.toggle("hidden", !en.isIntersecting), { rootMargin: "0px 0px -30% 0px" });
  fab.classList.add("hidden");
  io.observe(planner);

  /* ========== CAUTIONS & CREDITS ========== */
  $("#caution-grid").innerHTML = CAUTIONS.map((c, i) => `
    <article class="caution" data-reveal>
      <span class="n">0${i + 1}</span><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p>
    </article>`).join("");

  const seen = new Set();
  $("#credits-list").innerHTML = Object.values(IMAGES).filter((im) => !seen.has(im.page) && seen.add(im.page))
    .map((im) => `<li>${esc(im.alt)}：<a href="${im.page}" target="_blank" rel="noopener">${esc(im.author)}</a>，${esc(im.license)}，via Wikimedia Commons</li>`).join("");

  /* hero pinned image */
  const pin = $("#pin-img");
  pin.src = IMAGES.rock.src;
  pin.onerror = () => pin.remove();

  /* ========== INIT ========== */
  renderDay();
  renderChecklist();
  renderLedger();
  renderNotes();
  renderBudgetDay();
  renderAllBudget();
})();

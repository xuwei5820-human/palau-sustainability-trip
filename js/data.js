/* =========================================================
 * 帛琉南島永續實踐計畫 — 網站資料
 * 行程修正時，只要改這個檔案即可（日期、標題、景點、SDG）。
 * 年份：民國 116 年 = 西元 2027 年
 * ========================================================= */

/** Google Maps 搜尋連結（不需 API key） */
const mapsUrl = (q) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);

/* ---------- 行前培訓（7/14）---------- */
const TRAINING = {
  date: "2027-07-14",
  label: "116 年 7 月 14 日（三）08:00–17:30",
  place: "銘傳大學基河校區 J616 會議室",
  mapQuery: "銘傳大學基河校區",
  note: "若無法參加視同放棄錄取資格",
  focus: [
    "田野調查方法論、ESG 永續路徑地圖與文化轉譯法",
    "跨文化互動與現地溝通技巧，提升文化適切性與現場執行成效",
  ],
  sessions: [
    { time: "08:00–08:20", type: "報到", title: "報到", desc: "" },
    { time: "08:20–09:20", type: "Icebreaker", title: "破冰與自我介紹", desc: "30 秒自我介紹、參與動機、個人專長；建立團隊氛圍與溝通規則。" },
    { time: "09:20–09:50", type: "Activity", title: "團隊組成與角色卡抽選", desc: "分組、角色說明（隊長／觀察員／文化記錄／影像控管）；確認團隊責任鏈與相互支援。" },
    { time: "09:50–10:00", type: "Break", title: "Tea time", desc: "交流與互動。" },
    { time: "10:00–11:30", type: "Lecture", title: "把 ESG 轉化為肉眼可見的「田野線索」", desc: "E：辨識減塑、低碳、防曬乳禁用的環境治理足跡。S：從 Bai 會所的維護與在地導覽員觀察部落主體性。G：理解帛琉宣言（Palau Pledge）與傳統 Bul 禁漁制度如何透過法規與社區共治落實。" },
    { time: "11:30–12:30", type: "Practical", title: "田野紀錄實作練習", desc: "發放「永續路徑筆記本」，練習記錄「五感永續地圖」——看見、聽見、體驗到的 ESG。" },
    { time: "12:30–13:30", type: "Break", title: "午休", desc: "" },
    { time: "13:30–14:30", type: "Lecture + Demo", title: "文化轉譯說故事", desc: "Photo-Elicitation 影像導引法、Storytelling 故事架構法；以「平等、平視」的南島同族視角記錄，拒絕獵奇。" },
    { time: "14:30–15:50", type: "Lecture + Demo", title: "南島共鳴：跨文化互動與現地微訪談", desc: "以聊天代替問卷；5–10 分鐘微訪談技巧、開放式提問、英語田野破冰句型。" },
    { time: "15:50–16:00", type: "Break", title: "Tea time", desc: "交流與互動。" },
    { time: "16:00–17:00", type: "Lecture + Practice", title: "尊重在地：部落倫理、禁忌與危機應變", desc: "母系社會結構、Bai 會所穿著與性別規範、拜訪耆老禮儀；被婉拒時如何優雅退場與致歉；情境演練沙盒。" },
    { time: "17:00–17:30", type: "Q&A", title: "課程回饋＋提問", desc: "自評量表前測、行前行政注意事項（護照、行李、網卡）、綜合 Q&A 與結訓。" },
  ],
};

/* ---------- 帛琉行程（7/29–8/12）---------- */
const ITINERARY = [
  {
    date: "2027-07-29",
    title: "啟程：桃園 → 帛琉",
    theme: "出發日",
    summary: "由桃園國際機場搭機前往帛琉，完成住宿安排、環境熟悉，並召開團隊行程說明及共同公約共識座談會。",
    sdg: [],
    img: "koror",
    spots: [
      { name: "桃園國際機場", desc: "集合、報到、托運行李。", map: "Taoyuan International Airport" },
      { name: "帛琉國際機場", desc: "入境時於護照上簽署帛琉宣言（Palau Pledge）。", map: "Palau International Airport" },
    ],
  },
  {
    date: "2027-07-30",
    title: "帛琉永續海洋生態體察 I",
    theme: "海洋",
    summary: "洛克群島海域探勘：當地人文與生態介紹。",
    sdg: [14],
    img: "seventy",
    spots: [
      { name: "洛克群島（Rock Islands）", desc: "聯合國教科文組織世界遺產，數百座蘑菇狀石灰岩島。", map: "Rock Islands Southern Lagoon, Palau" },
    ],
  },
  {
    date: "2027-07-31",
    title: "帛琉永續復育實際體察 II",
    theme: "海洋",
    summary: "洛克群島海域探勘：硨磲海域野放復育行動。",
    sdg: [14],
    img: "clam",
    spots: [
      { name: "洛克群島硨磲海域", desc: "參與硨磲貝野放復育行動。", map: "Rock Islands Southern Lagoon, Palau" },
    ],
  },
  {
    date: "2027-08-01",
    title: "原民部落人文踏查 I：生活與農魚產業升級",
    theme: "產業",
    summary: "觀察當地早市市場經濟運作；拜訪國合會農技團畜牧中心與水產養殖所硨磲貝復育中心。",
    sdg: [2, 14],
    img: "market",
    spots: [
      { name: "科羅早市", desc: "觀察在地市場經濟運作。", map: "Koror market Palau" },
      { name: "國合會駐帛琉技術團－畜牧中心", desc: "邦交國農業合作交流。", map: "Taiwan Technical Mission Palau" },
      { name: "國合會水產養殖所－硨磲貝復育中心", desc: "認識硨磲貝人工繁殖與復育。", map: "Taiwan ICDF Aquaculture Palau giant clam" },
    ],
  },
  {
    date: "2027-08-02",
    title: "原民部落人文踏查 II：原民部落文化",
    theme: "文化",
    summary: "參觀當地私人博物館；艾萊州文化之旅：百年男人會館、戰船、古老部落巡禮。",
    sdg: [11],
    img: "bai",
    spots: [
      { name: "帛琉私人博物館（Etpison Museum）", desc: "帛琉歷史、文化與自然展示。", map: "Etpison Museum Koror Palau" },
      { name: "艾萊州百年男人會館（Airai Bai）", desc: "帛琉現存最古老的傳統會所之一。進入前請遵守穿著與性別規範。", map: "Airai Bai Palau" },
    ],
  },
  {
    date: "2027-08-03",
    title: "原民部落人文踏查 III：永續產業",
    theme: "產業",
    summary: "參訪當地小農永續農場、永續餐廳，以及永續飯店 PALAU HOTEL。",
    sdg: [12],
    img: "farm",
    spots: [
      { name: "小農永續農場／永續餐廳", desc: "觀察在地食材與低碳飲食實踐。", map: "Koror Palau organic farm" },
      { name: "PALAU HOTEL", desc: "永續飯店經營參訪。", map: "Palau Hotel Koror" },
    ],
  },
  {
    date: "2027-08-04",
    title: "原民部落人文踏查 IV：觀光產業",
    theme: "陸域",
    summary: "巴貝大島天使大瀑布；帛琉私人博物館。",
    sdg: [15],
    img: "waterfall",
    spots: [
      { name: "天使大瀑布（Ngardmau Waterfall）", desc: "帛琉最大瀑布，步道需穿防滑鞋。", map: "Ngardmau Waterfall Palau" },
      { name: "帛琉私人博物館", desc: "延續文化觀察。", map: "Etpison Museum Koror Palau" },
    ],
  },
  {
    date: "2027-08-05",
    title: "原民部落人文踏查 V：產銷物流與市場經濟",
    theme: "產業",
    summary: "參訪當地魚市場；當地最大超市 Surangel's Supercenter-Airai 與第二大超市 WCTC。",
    sdg: [12],
    img: "market",
    spots: [
      { name: "當地魚市場", desc: "觀察漁獲產銷與 Bul 禁漁制度的影響。", map: "Koror fish market Palau" },
      { name: "Surangel's Supercenter-Airai", desc: "帛琉最大超級市場。", map: "Surangel's Supercenter Airai Palau" },
      { name: "WCTC Shopping Center", desc: "帛琉第二大超級市場。", map: "WCTC Shopping Center Koror Palau" },
    ],
  },
  {
    /* 行程修正：因颱風外圍環流、洛克群島船班停駛，與 8/10 對調 */
    date: "2027-08-06",
    notice: "因海況不佳，行程已調整",
    title: "永續生態田野調查",
    theme: "陸域",
    summary: "帛琉當地特有種鳥類與生態解析。",
    sdg: [15],
    img: "bird",
    spots: [
      { name: "鳥類生態觀察（地點依當天安排）", desc: "認識帛琉特有種鳥類與棲地保育。", map: "Palau bird watching" },
    ],
  },
  {
    date: "2027-08-07",
    title: "海域周邊人文生態體察 II",
    theme: "海洋＋陸域",
    summary: "石錢島海域探勘、無動力方舟、藍炭紅樹林之旅、當地戰爭遺跡考察、石錢島登島生態探索、社區訪談與質性補充。",
    sdg: [14, 15],
    img: "mangrove",
    spots: [
      { name: "石錢島海域", desc: "海域探勘與登島生態探索。", map: "帛琉 石錢島" },
      { name: "藍炭紅樹林", desc: "搭乘無動力方舟認識紅樹林的固碳功能。", map: "Palau mangrove" },
    ],
  },
  {
    date: "2027-08-08",
    title: "文創工藝與原民經濟分配體察",
    theme: "產業",
    summary: "ECO GLASS FACTORY 琉璃工廠：回收玻璃再製的文創工藝。",
    sdg: [12],
    img: "koror",
    spots: [
      { name: "ECO GLASS FACTORY 琉璃工廠", desc: "回收玻璃轉化為工藝品的循環經濟案例。", map: "Palau Eco Glass Factory" },
    ],
  },
  {
    date: "2027-08-09",
    title: "永續城市與政治制度體察",
    theme: "城市",
    summary: "泛太平洋度假村永續生態園區；臺灣大使館參訪。",
    sdg: [11],
    img: "resort",
    spots: [
      { name: "泛太平洋度假村（Palau Pacific Resort）", desc: "永續生態園區的建立。", map: "Palau Pacific Resort" },
      { name: "中華民國（臺灣）駐帛琉大使館", desc: "認識臺帛外交與合作。", map: "Embassy of the Republic of China (Taiwan) in Palau" },
    ],
  },
  {
    /* 行程修正：與 8/06 對調 */
    date: "2027-08-10",
    title: "海域周邊人文生態體察 I",
    theme: "海洋",
    summary: "洛克群島海域探勘；BUL 垂釣文化體驗。",
    sdg: [14],
    img: "reef",
    spots: [
      { name: "洛克群島海域", desc: "海域生態探勘。", map: "Rock Islands Southern Lagoon, Palau" },
      { name: "BUL 垂釣文化體驗", desc: "認識帛琉傳統禁漁制度與永續漁法。", map: "Koror Palau" },
    ],
  },
  {
    date: "2027-08-11",
    title: "田野綜整",
    theme: "教育",
    summary: "田野觀察、微訪談綜整、補充訪談。",
    sdg: [4],
    img: "koror",
    spots: [
      { name: "科羅（Koror）", desc: "整理田野筆記、補充訪談。", map: "Koror Palau" },
    ],
  },
  {
    date: "2027-08-12",
    title: "綜合座談與返程",
    theme: "返程日",
    summary: "帛琉永續 ESG 綜合座談會與回饋交流；自評量表後測；由帛琉機場搭機返回桃園國際機場。",
    sdg: [],
    img: "rock",
    spots: [
      { name: "帛琉國際機場", desc: "返程。", map: "Palau International Airport" },
      { name: "桃園國際機場", desc: "抵達、解散。", map: "Taoyuan International Airport" },
    ],
  },
];

/* SDG 名稱 */
const SDG_NAMES = {
  2: "零飢餓",
  4: "優質教育",
  11: "永續城市與社區",
  12: "責任消費與生產",
  14: "海洋生態",
  15: "陸域生態",
};

/* ---------- 圖片（來源與授權見 credits 區）---------- */
/* 由 IMAGES 統一管理，key 對應 ITINERARY.img */
const IMAGES = {};

/* ---------- 行前準備清單 ---------- */
const CHECKLIST = [
  {
    group: "證件與文件",
    items: [
      "護照（效期 6 個月以上）",
      "電子機票／行程單",
      "旅遊平安險與海外突發疾病證明",
      "錄取通知與計畫聯絡資訊",
      "護照影本＋大頭照 2 張（備用）",
    ],
  },
  {
    group: "環境友善（帛琉宣言）",
    items: [
      "珊瑚友善防曬乳（帛琉禁止含 oxybenzone 等成分的防曬品）",
      "防曬衣／水母衣",
      "環保水瓶",
      "環保餐具與購物袋",
    ],
  },
  {
    group: "衣物",
    items: [
      "泳衣與快乾毛巾",
      "參訪 Bai 會所與大使館的端莊服裝（過膝、有袖）",
      "防滑涼鞋／溯溪鞋（瀑布步道）",
      "帽子、太陽眼鏡",
      "薄外套（飛機、室內冷氣）",
      "雨衣／防水袋",
    ],
  },
  {
    group: "田野工具",
    items: [
      "永續路徑筆記本與筆",
      "相機／手機防水袋",
      "行動電源（隨身登機）",
      "英語田野破冰句型小抄",
    ],
  },
  {
    group: "健康",
    items: [
      "個人常備藥品",
      "暈船藥",
      "防蚊液",
      "OK 繃與簡易急救包",
    ],
  },
  {
    group: "通訊與金錢",
    items: [
      "網卡／eSIM",
      "美金現金（帛琉通用美元）",
      "可海外刷卡的信用卡",
      "插頭：帛琉與臺灣同為 A/B 型、120V，一般不需轉接頭",
    ],
  },
];

/* ---------- 使用注意 ---------- */
const CAUTIONS = [
  { title: "帛琉宣言 Palau Pledge", body: "入境時須在護照上簽署承諾：以生態友善、文化尊重的方式旅行，為子孫守護帛琉。" },
  { title: "防曬乳禁令", body: "帛琉禁止販售與使用含 oxybenzone、octinoxate 等對珊瑚有害成分的防曬品，請攜帶珊瑚友善配方或以衣物防曬。" },
  { title: "Bai 會所禮儀", body: "帛琉為母系社會；進入傳統會所前須詢問許可，穿著端莊，遵守性別規範。拜訪耆老、首領時請依導覽員指示行禮。" },
  { title: "拍照與訪談", body: "拍攝人像前先詢問同意。若居民婉拒或產生誤解，優雅道謝並退場，不強求。以平等、平視的視角記錄，拒絕獵奇。" },
  { title: "海洋活動", body: "不觸摸、踩踏珊瑚，不撿拾貝殼與生物；全程穿著救生衣並聽從船長、教練指示。尊重 Bul 傳統禁漁區。" },
  { title: "團隊與安全", body: "遵守共同公約，外出至少兩人同行並回報隊長；注意補水與防曬，身體不適立即告知領隊。" },
];

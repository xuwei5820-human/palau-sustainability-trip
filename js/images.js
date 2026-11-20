/* 圖片來源：Wikimedia Commons（皆為 CC 授權或公眾領域，依授權標示作者）
 * key 對應 data.js 中 ITINERARY[].img */
const W = "https://upload.wikimedia.org/wikipedia/commons/";
Object.assign(IMAGES, {
  rock: {
    src: W + "thumb/4/4b/Rock-Islands-Palau-1-2016-aerial-view-Luka-Peternel.jpg/1920px-Rock-Islands-Palau-1-2016-aerial-view-Luka-Peternel.jpg",
    alt: "洛克群島鳥瞰",
    author: "Luka Peternel", license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Rock-Islands-Palau-1-2016-aerial-view-Luka-Peternel.jpg",
  },
  clam: {
    src: W + "thumb/6/6f/Giant_clam_%28Tridacna_gigas%29_Michaelmas_Cay.jpg/1280px-Giant_clam_%28Tridacna_gigas%29_Michaelmas_Cay.jpg",
    alt: "硨磲貝（示意圖，攝於大堡礁）",
    author: "Charles J. Sharp", license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Giant_clam_(Tridacna_gigas)_Michaelmas_Cay.jpg",
  },
  bai: {
    src: W + "thumb/8/88/Airai_Bai.jpg/1280px-Airai_Bai.jpg",
    alt: "艾萊州男人會館 Airai Bai",
    author: "Ananari", license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Airai_Bai.jpg",
  },
  seventy: {
    src: W + "thumb/7/71/Seventy_Islands_%2829596700363%29.jpg/1280px-Seventy_Islands_%2829596700363%29.jpg",
    alt: "洛克群島・七十群島",
    author: "Tetsuji Sakakibara", license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Seventy_Islands_(29596700363).jpg",
  },
  waterfall: {
    src: W + "thumb/c/c7/Ngardmau_Waterfall_%2857621%29.jpg/1280px-Ngardmau_Waterfall_%2857621%29.jpg",
    alt: "巴貝大島天使大瀑布 Ngardmau Waterfall",
    author: "Mandrusian", license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Ngardmau_Waterfall_(57621).jpg",
  },
  mangrove: {
    src: W + "thumb/c/c2/Mangrove_-_panoramio_%285%29.jpg/1280px-Mangrove_-_panoramio_%285%29.jpg",
    alt: "帛琉紅樹林",
    author: "Babiesan", license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Mangrove_-_panoramio_(5).jpg",
  },
  reef: {
    src: W + "thumb/9/99/White_Tip_Reef_Shark_and_diver_on_Clarence%27s_Wall%2C_Palau_%2810059067425%29.jpg/1280px-White_Tip_Reef_Shark_and_diver_on_Clarence%27s_Wall%2C_Palau_%2810059067425%29.jpg",
    alt: "帛琉珊瑚礁與白鰭鯊",
    author: "Matt Kieffer", license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:White_Tip_Reef_Shark_and_diver_on_Clarence%27s_Wall,_Palau_(10059067425).jpg",
  },
  resort: {
    src: W + "thumb/2/2c/The_Palau_Pacific_Resort_-_panoramio_%282%29.jpg/1280px-The_Palau_Pacific_Resort_-_panoramio_%282%29.jpg",
    alt: "泛太平洋度假村",
    author: "yuichiro anazawa", license: "CC BY 3.0",
    page: "https://commons.wikimedia.org/wiki/File:The_Palau_Pacific_Resort_-_panoramio_(2).jpg",
  },
  koror: {
    src: W + "thumb/8/8b/Koror-palau-downtown20071219.jpg/1280px-Koror-palau-downtown20071219.jpg",
    alt: "科羅市區街景",
    author: "Peter R. Binter", license: "Public domain",
    page: "https://commons.wikimedia.org/wiki/File:Koror-palau-downtown20071219.jpg",
  },
  bird: {
    src: W + "thumb/3/38/Palau_fruit_dove_%28Ptilinopus_pelewensis%29_Rock_Islands.jpg/1280px-Palau_fruit_dove_%28Ptilinopus_pelewensis%29_Rock_Islands.jpg",
    alt: "帛琉特有種：帛琉果鳩",
    author: "Charles J. Sharp", license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Palau_fruit_dove_(Ptilinopus_pelewensis)_Rock_Islands.jpg",
  },
});
/* 尚無專屬照片的主題，暫用相近圖片 */
IMAGES.market = IMAGES.koror;
IMAGES.farm = IMAGES.resort;

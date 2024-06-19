const sinavlar = [
  {
    test_id: 1,
    type: "public",

    sinav_kodu: "BIL342",
    ders_adi: "Bilgisayar Ağları",
    test_adi: "Vize testi",
    hazirlayan: {
      tc: "12312312312",
      ad: "Deniz",
      soyad: "Taşkın",
      tel_no: "05151515142",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Aşağıdakilerin hangisi aşağıdadır?",
        cevaplar: ["cevap1", "cevap2", "cevap3", "cevap4", "cevap5"],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "Aşağı ne demektir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Bilmem ne kodunu yaz.",
        puan: 30,
      },
    ],
    sinav_suresi: 45,
  },
  {
    test_id: 2,
    type: "public",

    sinav_kodu: "BIL342",
    ders_adi: "Bilgisayar Ağları",
    test_adi: "Final testi",
    hazirlayan: {
      tc: "12312312312",
      ad: "Deniz",
      soyad: "Taşkın",
      tel_no: "05151515142",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Aşağıdakilerin hangisi aşağıdadır?",
        cevaplar: ["cevap1", "cevap2", "cevap3", "cevap4", "cevap5"],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "Aşağı ne demektir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Bilmem ne kodunu yaz.",
        puan: 30,
      },
    ],
    sinav_suresi: 45,
  },
  {
    test_id: 3,
    type: "public",
    sinav_kodu: "BIL343",
    ders_adi: "Veri Yapıları",
    test_adi: "Vize testi",
    hazirlayan: {
      tc: "23423423423",
      ad: "Ahmet",
      soyad: "Yılmaz",
      tel_no: "05252525252",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Hangisi bir veri yapısı değildir?",
        cevaplar: ["Dizi", "Ağaç", "Graf", "Yığın", "Fonksiyon"],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "Bağlı liste nedir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Bir yığın veri yapısı oluşturun.",
        puan: 30,
      },
    ],
    sinav_suresi: 50,
  },
  {
    test_id: 4,
    type: "public",
    sinav_kodu: "BIL344",
    ders_adi: "Algoritmalar",
    test_adi: "Vize testi",
    hazirlayan: {
      tc: "34534534534",
      ad: "Mehmet",
      soyad: "Öztürk",
      tel_no: "05353535353",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Hangisi algoritma değildir?",
        cevaplar: [
          "Böl ve Yönet",
          "Dinamik Programlama",
          "Açgözlü Algoritma",
          "Karar Ağacı",
          "Kriptografi",
        ],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "Algoritma analizi nedir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Quick Sort algoritmasını yazın.",
        puan: 30,
      },
    ],
    sinav_suresi: 60,
  },
  {
    test_id: 5,
    type: "public",
    sinav_kodu: "BIL345",
    test_adi: "Vize testi",
    ders_adi: "Veri Tabanı Sistemleri",
    hazirlayan: {
      tc: "45645645645",
      ad: "Ayşe",
      soyad: "Kara",
      tel_no: "05454545454",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Hangisi bir SQL komutu değildir?",
        cevaplar: ["SELECT", "DELETE", "UPDATE", "CREATE", "MERGE"],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "İlişkisel veri tabanı nedir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Bir SQL sorgusu yazın.",
        puan: 30,
      },
    ],
    sinav_suresi: 55,
  },
  {
    test_id: 6,
    type: "public",
    sinav_kodu: "BIL346",
    test_adi: "Vize testi",
    ders_adi: "Yapay Zeka",
    hazirlayan: {
      tc: "56756756756",
      ad: "Fatma",
      soyad: "Aydın",
      tel_no: "05555555555",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Hangisi bir yapay zeka tekniği değildir?",
        cevaplar: [
          "Makine Öğrenmesi",
          "Derin Öğrenme",
          "Karar Ağaçları",
          "Doğrusal Regresyon",
          "String Matching",
        ],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "Yapay zeka nedir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Basit bir makine öğrenmesi algoritması yazın.",
        puan: 30,
      },
    ],
    sinav_suresi: 70,
  },
  {
    test_id: 7,
    type: "public",
    sinav_kodu: "BIL347",
    test_adi: "Vize testi",
    ders_adi: "Bilgisayar Grafikleri",
    hazirlayan: {
      tc: "67867867867",
      ad: "Zeynep",
      soyad: "Demir",
      tel_no: "05656565656",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Hangisi bir grafik çizim yöntemi değildir?",
        cevaplar: [
          "Rasterization",
          "Ray Tracing",
          "Radiosity",
          "Backface Culling",
          "Polygon Clipping",
        ],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "Bilgisayar grafikleri nedir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Bir 3D grafik motoru oluşturun.",
        puan: 30,
      },
    ],
    sinav_suresi: 65,
  },
  {
    test_id: 8,
    type: "public",
    sinav_kodu: "BIL348",
    test_adi: "Vize testi",
    ders_adi: "Mobil Programlama",
    hazirlayan: {
      tc: "78978978978",
      ad: "Ali",
      soyad: "Çelik",
      tel_no: "05757575757",
    },
    sinav_sorulari: [
      {
        id: 1,
        type: "test",
        soru: "Hangisi bir mobil işletim sistemi değildir?",
        cevaplar: ["iOS", "Android", "Windows Phone", "Symbian", "UNIX"],
        puan: 10,
      },
      {
        id: 2,
        type: "klasik",
        soru: "Mobil programlama nedir?",
        puan: 20,
      },
      {
        id: 3,
        type: "kod",
        soru: "Basit bir mobil uygulama yazın.",
        puan: 30,
      },
    ],
    sinav_suresi: 40,
  },
];

const ogrenci = {
  ad: "anil",
  soyad: "karabulut",
  no: "1211602080",
  sinavlar: [
    {
      sinav_kodu: "BIL342",
      cozuldu: true,
      puan: 100, // cozulmediyse -1
    },
  ],
};

const ogretmen = {
  ad: "Deniz",
  soyad: "Taşkın",
  tc: "12312312312",
  sinav_ekle: () => {}, //silme guncelleme
  soru_ekle: () => {}, //silme guncelleme
};
const data = {
  sinavlar,
  ogrenci,
  ogretmen,
};

export default data;

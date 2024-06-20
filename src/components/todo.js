//Gruplara göre ders ekle
//Öğretmen Grup açsın
//Öğrenci gruba katılma isteği göndersin
//öğretmen kabul edince öğrenci testleri görebilsin
//sınav başlatılınca öğrencinin sınav ekranı büyüsün
//belki e-posta doğrulama yaparız
//backend ve veri yapılarını tammamla
//sınavı gönderdikten sonra oto puan hesapla
//öğretmen öğrencilerin testlerini inceleyebilsin
//breadcrumbs yerini düzelt
//backendi entegre et
//sol menü küçültülebilir olsun
//üst barlara da public ders ve testleri koyarım

// üst menüde Public testler ders adlarına göre sıralı bulunsun (Puan yok ve süre sınırı yok)
// sol menüde öğrencinin bulunduğu gruplar ve altında ise dersler bulunsun
// drawer içinde çözdüğü testler, gruplar(isim olarak ve üstüne tıklandığında öteki katılımcıları görür)
// drawer içinde çalışma süresi (bir iki database güncellemesi gerekebilir)
// drawer içinde çözdüğü teste tıkladığında test cevaplarıyla birlikte fakat değiştirelemeyecek şekilde görüntülensin
// öğrenci için başka bir şey yok
// kayıt olmadan devam eden birinde sağ üstte draver olarak misafir yazsın fakat drawer açılmayacak
// bu misafirin sol kısmında menüsü olmayacak ve sadece üst taraftaki public testleri görüntüleyecek
// öğretmen menüsü biraz daha farklı olacak çünkü öğrenci gruba katılma istekleri vs olacak bunu daha sonra düşüneceğim şimdilik
// misafir ve öğrenci kısmı bitmeli

// öğretmen menüsü de şu şekilde olsun:
// sol tarafta gruplar ve grupların altında hazırladığı testler olsun
// öğretmen farklı gruplara katılabilir fakat farklı grupların testlerini düzenleyemez
// kendi oluşturduğu grubun testini zaten kendi oluşturmuş olacağı için
// o testleri düzenleyebilir ve kimlerin o testleri çözdüğünü görebilir
// çözenlerin neleri işaretlediğini de görebilir
// yani sol kısımda gruplar menüsü her menü altında o gruptaki testler görünür. drawer içinde de grup oluşturma
// gruba öğrenci ekleme, grupları görüntüleme, gruplardaki öğrencileri görüntüleme ve sınav ekleme kısımlarını kurgulayacağım


import { addExam } from './api';

// Örnek veri
const examData = {
  ders_kodu: "BIL342",
  ders_adi: "Bilgisayar Ağları",
  test_adi: "Final Sınavı",
  sorular: [
    // Soruların detayları
  ],
  sinav_suresi: 60,
  grup_id: "6672a73c3ca25605e2cdcdfa"
};

// Kullanıcı bilgileri
const email = "kullanici@example.com";
const password = "kullanici_sifresi";

// Sınav ekleme işlemi
addExam(examData, email, password)
  .then(response => {
    console.log("Exam added:", response);
  })
  .catch(error => {
    console.error("Error adding exam:", error);
  });



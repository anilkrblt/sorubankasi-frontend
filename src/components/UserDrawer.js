import React, { useState } from "react";
import { Drawer, Button, Form, Input, List, message, Modal } from "antd";
import {
  updatePassword,
  updateUserProfile,
  deleteUser,
} from "../services/apiService";
const UserDrawer = ({ visible, onClose, user, onLogout, onProfileUpdate }) => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [previewExam, setPreviewExam] = useState(null); // Ön izleme yapılacak sınavı saklar

  const handlePasswordUpdate = async (values) => {
    console.log(values);
    try {
      await updatePassword(values.oldPassword, values.newPassword);
      message.success("Şifre başarıyla güncellendi.");
      setIsEditingPassword(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error("Şifre güncellenirken bir hata oluştu.");
    }
  };

  const handleProfileUpdate = async (values) => {
    try {
      const updatedUser = await updateUserProfile(values);
      message.success("Profil bilgileri başarıyla güncellendi.");
      onProfileUpdate(updatedUser);
      setIsEditingProfile(false);
      form.resetFields();
    } catch (error) {
      message.error("Profil güncellenirken bir hata oluştu.");
    }
  };

  const handleDeleteUser = async (values) => {
    // Öğrenciler için `values.user._id`, öğretmenler için `values._id` kullanılır
    const user_id = values.user?._id || values._id;

    console.log("Kullanıcı ID'si:", user_id);

    Modal.confirm({
      title: "Hesabınızı silmek istediğinizden emin misiniz?",
      content: "Bu işlem geri alınamaz.",
      onOk: async () => {
        try {
          await deleteUser(user_id);
          message.success("Hesap başarıyla silindi.");
          onLogout();
          onClose();
        } catch (error) {
          message.error("Hesap silinirken bir hata oluştu.");
        }
      },
    });
  };

  return (
    <Drawer
      title="Kullanıcı Profili"
      placement="right"
      onClose={onClose}
      open={visible}
      width={300}
    >
      <p>
        <strong>Kullanıcı Adı:</strong> {user.kullanici_adi}
      </p>
      <p>
        <strong>Rol:</strong> {user.role}
      </p>
      <p>
        <strong>E-posta:</strong> {user.email}
      </p>
      <p>
        <strong>Ad</strong> {user.ad}
      </p>

      <Button
        onClick={() => setIsEditingProfile(true)}
        style={{ marginTop: 16 }}
      >
        Profili Düzenle
      </Button>
      <Button
        onClick={() => setIsEditingPassword(true)}
        style={{ marginTop: 8 }}
      >
        Şifre Güncelle
      </Button>
      <Button
        onClick={() => handleDeleteUser(user)}
        style={{ marginTop: 8 }}
        danger
      >
        Hesabı Sil
      </Button>
      <Button onClick={onLogout} style={{ marginTop: 8 }} danger>
        Çıkış Yap
      </Button>

      {isEditingProfile && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleProfileUpdate}
          initialValues={{
            kullanici_adi: user.kullanici_adi,
            email: user.email,
            ad: user.ad,
            soyad: user.soyad,
          }}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="kullanici_adi"
            label="Kullanıcı Adı"
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı giriniz!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-posta"
            rules={[
              { required: true, message: "Lütfen e-posta adresinizi giriniz!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ad"
            label="Ad"
            rules={[{ required: true, message: "Lütfen adınızı giriniz!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="soyad"
            label="Soyad"
            rules={[{ required: true, message: "Lütfen soyadınızı giriniz!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
            <Button
              onClick={() => setIsEditingProfile(false)}
              style={{ marginLeft: 8 }}
            >
              İptal
            </Button>
          </Form.Item>
        </Form>
      )}

      {isEditingPassword && (
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordUpdate}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="oldPassword"
            label="Eski Şifre"
            rules={[
              { required: true, message: "Lütfen eski şifrenizi giriniz!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Yeni Şifre"
            rules={[
              { required: true, message: "Lütfen yeni şifrenizi giriniz!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
            <Button
              onClick={() => setIsEditingPassword(false)}
              style={{ marginLeft: 8 }}
            >
              İptal
            </Button>
          </Form.Item>
        </Form>
      )}

      {user.role === "student" && user.cozulen_sinavlar && (
        <>
          <h3 style={{ marginTop: 24 }}>Çözülen Sınavlar</h3>
          <List
            dataSource={user.cozulen_sinavlar}
            renderItem={(exam) => (
              <List.Item key={exam.ders_kodu + exam.sinav_adi}>
                <div>
                  <p>{`${exam.ders_kodu} - ${exam.sinav_adi}`}</p>
                  <Button onClick={() => setPreviewExam(exam)}>
                    Görüntüle
                  </Button>{" "}
                  {/* Tıklanınca sınavı setPreviewExam ile ayarla */}
                </div>
              </List.Item>
            )}
          />
          {previewExam && (
            <Modal
              title={`${previewExam.ders_kodu} - ${previewExam.sinav_adi}`}
              visible={true}
              onCancel={() => setPreviewExam(null)}
              footer={null}
            >
              <List
                dataSource={previewExam.sorular}
                renderItem={(question, index) => (
                  <List.Item key={question.soru_id}>
                    <h4>{question.soru_metni}</h4>
                    <p>
                      <strong>Cevabınız: </strong>
                      {previewExam.cevaplar[index] === undefined
                        ? ""
                        : previewExam.cevaplar[index].answer}
                    </p>
                  </List.Item>
                )}
              />
            </Modal>
          )}
        </>
      )}

      {user.role === "teacher" && user.hazirlanan_sinavlar && (
        <>
          <h3 style={{ marginTop: 24 }}>Hazırlanan Sınavlar</h3>
          <List
            dataSource={user.hazirlanan_sinavlar}
            renderItem={(exam) => (
              <List.Item key={exam._id}>
                <div>
                  <p>{`${exam.ders_kodu} - ${exam.test_adi}`}</p>
                  <Button onClick={() => setPreviewExam(exam)}>
                    Görüntüle
                  </Button>
                </div>
              </List.Item>
            )}
          />
          {previewExam && (
            <Modal
              title={`${previewExam.ders_kodu} - ${previewExam.test_adi}`}
              visible={true}
              onCancel={() => setPreviewExam(null)}
              footer={null}
            >
              <p>
                <strong>Sınav Süresi:</strong> {previewExam.sinav_suresi} dakika
              </p>
              <List
                dataSource={previewExam.sorular}
                renderItem={(question, index) => (
                  <List.Item key={question.soru_id}>
                    <h4>{question.soru_metni}</h4>
                    <p>
                      <strong>Soru Tipi:</strong> {question.soru_tipi}
                    </p>
                    {question.soru_tipi === "test" && (
                      <>
                        <p>
                          <strong>Şıklar:</strong>
                        </p>
                        <ul>
                          {question.cevaplar.map((cevap, idx) => (
                            <li key={idx}>{cevap}</li>
                          ))}
                        </ul>
                        <p>
                          <strong>Doğru Cevap:</strong> {question.dogru_cevap}
                        </p>
                      </>
                    )}
                    <p>
                      <strong>Puan:</strong> {question.puan}
                    </p>
                  </List.Item>
                )}
              />
            </Modal>
          )}
        </>
      )}
    </Drawer>
  );
};

export default UserDrawer;

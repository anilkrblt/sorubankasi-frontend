import React, { useEffect, useState } from "react";
import { Drawer, Button, Form, Input, List, message, Modal } from "antd";
import {
  updatePassword,
  updateUserProfile,
  deleteUser,
  fetchUserExams,
  updateStudentExamScore,
} from "../services/apiService";
import UserInfo from "./UserInfo";
import ExamPreview from "./ExamPreview";

const UserDrawer = ({ visible, onClose, user, onLogout, onProfileUpdate }) => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [previewExam, setPreviewExam] = useState(null);
  const [localUser, setLocalUser] = useState(user);
  const [allExam, setAllExam] = useState([]);
  const [solversModalVisible, setSolversModalVisible] = useState(false);
  const [currentSolvers, setCurrentSolvers] = useState([]);
  const [editingSolver, setEditingSolver] = useState(null);
  useEffect(() => {
    const getFullExams = async (examIds) => {
      try {
        const response = await fetchUserExams(examIds);
        console.log(response.data.exams);
        setAllExam(response.data.exams);
      } catch (error) {
        console.error("Sınavları çekerken bir hata oluştu:", error);
      }
    };

    if (user && user.hazirlanan_sinavlar) {
      getFullExams(user.hazirlanan_sinavlar);
    }
  }, []);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

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
      setLocalUser(updatedUser);
      onProfileUpdate(updatedUser);
      setIsEditingProfile(false);
    } catch (error) {
      message.error("Profil güncellenirken bir hata oluştu.");
    }
  };

  const handleDeleteUser = async (values) => {
    const user_id = values.user?._id || values._id;
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

  const handleSolversButtonClick = (solvers) => {
    setCurrentSolvers(solvers);
    setSolversModalVisible(true);
  };

  const handleSaveScores = async (solver) => {
    const totalScore = solver.cozum.sorular.reduce((total, question) => {
      return total + (parseInt(question.puan, 10) || 0);
    }, 0);

    try {
      await updateStudentExamScore(
        solver.ogrenci_no,
        solver.cozum.examId,
        totalScore
      );

      const updatedSolvers = currentSolvers.map((s) => {
        if (s.ogrenci_no === solver.ogrenci_no) {
          return {
            ...s,
            cozum: {
              ...s.cozum,
              puan: totalScore,
            },
          };
        }
        return s;
      });

      setCurrentSolvers(updatedSolvers);

      const updatedExams = allExam.map((exam) => {
        if (exam._id === solver.cozum.examId) {
          const updatedCozenler = exam.cozenler.map((cozen) => {
            if (cozen.ogrenci_no === solver.ogrenci_no) {
              return {
                ...cozen,
                cozum: {
                  ...cozen.cozum,
                  puan: totalScore,
                },
              };
            }
            return cozen;
          });
          return {
            ...exam,
            cozenler: updatedCozenler,
          };
        }
        return exam;
      });

      setAllExam(updatedExams);
      message.success(`${solver.ad} ${solver.soyad} puanları kaydedildi.`);
    } catch (error) {
      message.error("Puanlar kaydedilirken bir hata oluştu.");
    }
  };

  const handleSaveExam = (updatedExam) => {
    const updatedExams = allExam.map((exam) => {
      if (exam._id === updatedExam._id) {
        return updatedExam;
      }
      return exam;
    });

    setAllExam(updatedExams);
    setPreviewExam(updatedExam);
  };

  return (
    <Drawer
      title="Kullanıcı Profili"
      placement="right"
      onClose={onClose}
      open={visible}
      width={300}
      style= {
        {backgroundColor: "#F9F1F0"}
      }
    >
      <UserInfo user={localUser} />
      <hr />
      <div style={{ display: "flex", alignContent: "space-between" }}>
        <Button
          onClick={() => setIsEditingProfile(true)}
          style={{ marginTop: 16 }}
        >
          Profili Düzenle
        </Button>
        <Button
          onClick={() => setIsEditingPassword(true)}
          style={{ marginTop: 16 }}
        >
          Şifre Güncelle
        </Button>
      </div>

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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span>{`${exam.ders_kodu} - ${exam.sinav_adi}`}</span>
                  <Button
                    type="default"
                    onClick={() => setPreviewExam(exam)}
                    style={{ marginLeft: "auto" }}
                  >
                    Görüntüle
                  </Button>
                </div>
              </List.Item>
            )}
            style={{ margin: "0 auto", width: "90%" }} 
          />
          {previewExam && (
            <Modal
              title={`${previewExam.ders_kodu} - ${previewExam.sinav_adi}`}
              open={true}
              onCancel={() => setPreviewExam(null)}
              footer={null}
              width={800}
              bodyStyle={{ padding: "20px" }}
            >
              <div>
                <List
                  dataSource={previewExam.sorular}
                  renderItem={(question, index) => (
                    <List.Item
                      key={question.soru_id}
                      style={{
                        display: "block",
                        marginBottom: "20px",
                        padding: "15px",
                        border: "1px solid #e8e8e8",
                        borderRadius: "8px",
                        background: "#f9f9f9",
                      }}
                    >
                      <h4 style={{ marginBottom: "8px" }}>
                        {question.soru_metni}
                      </h4>
                      <p style={{ marginBottom: "8px" }}>
                        <strong>Cevabınız: </strong>
                        {previewExam.cevaplar[index] === undefined
                          ? "Cevaplanmamış"
                          : previewExam.cevaplar[index].answer}
                      </p>
                    </List.Item>
                  )}
                />
              </div>
            </Modal>
          )}
        </>
      )}

      {user.role === "teacher" && user.hazirlanan_sinavlar && (
        <>
          <h3 style={{ marginTop: 24 }}>Hazırlanan Sınavlar</h3>
          <List
            dataSource={allExam}
            renderItem={(exam) => (
              <List.Item key={exam._id}>
                <div>
                  <p>{`${exam.ders_kodu} - ${exam.test_adi}`}</p>
                  <Button onClick={() => setPreviewExam(exam)}>
                    Görüntüle
                  </Button>
                  <Button
                    onClick={() => handleSolversButtonClick(exam.cozenler)}
                    style={{ marginLeft: 8 }}
                  >
                    Çözenler
                  </Button>
                </div>
              </List.Item>
            )}
          />
          {previewExam && (
            <ExamPreview
              previewExam={previewExam}
              setPreviewExam={setPreviewExam}
              onSave={handleSaveExam}
            ></ExamPreview>
          )}
        </>
      )}

      <Modal
        title="Sınavı Çözen Öğrenciler"
        open={solversModalVisible}
        onCancel={() => setSolversModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={currentSolvers}
          renderItem={(solver) => (
            <List.Item key={solver.ogrenci_no}>
              <div>
                {editingSolver?.ogrenci_no === solver.ogrenci_no ? (
                  <>
                    <List
                      dataSource={solver.cozum.sorular}
                      renderItem={(question, index) => (
                        <List.Item
                          key={question.soru_id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <h4>{question.soru_metni}</h4>
                            <p>
                              <strong>Cevap:</strong>{" "}
                              {solver.cozum.cevaplar[index].answer}
                            </p>
                          </div>
                          <Form.Item label="Puan" style={{ marginBottom: 0 }}>
                            <Input
                              type="number"
                              defaultValue={question.puan}
                              onChange={(e) => {
                                const newSolvers = [...currentSolvers];
                                newSolvers.forEach((s) => {
                                  if (s.ogrenci_no === solver.ogrenci_no) {
                                    s.cozum.sorular[index].puan =
                                      e.target.value;
                                  }
                                });
                                setCurrentSolvers(newSolvers);
                              }}
                            />
                          </Form.Item>
                        </List.Item>
                      )}
                    />
                    <Button
                      type="primary"
                      onClick={() => {
                        handleSaveScores(solver);
                        setEditingSolver(null);
                      }}
                      style={{ marginTop: 16 }}
                    >
                      Kaydet
                    </Button>
                    <Button
                      onClick={() => setEditingSolver(null)}
                      style={{ marginTop: 16, marginLeft: 8 }}
                    >
                      İptal
                    </Button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>
                        {solver.ad} {solver.soyad}
                      </strong>{" "}
                      - {solver.ogrenci_no} - {solver.cozum.ders_kodu} -{" "}
                      {solver.cozum.sinav_adi} - Puan: {solver.cozum.puan}
                    </p>
                    <Button
                      onClick={() => setEditingSolver(solver)}
                      style={{ marginTop: 16 }}
                    >
                      Düzenle
                    </Button>
                  </>
                )}
              </div>
            </List.Item>
          )}
        />
      </Modal>
      <Button
        onClick={() => handleDeleteUser(user)}
        style={{
          marginTop: 8,
          width: "200px",
          marginLeft: "10px",
          background: "white",
          border: "1px solid red",
          color: "red",
        }}
        danger
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "red";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.color = "red";
        }}
      >
        Hesabı Sil
      </Button>
      <br />
      <Button
        onClick={onLogout}
        style={{
          marginTop: 8,
          width: "200px",
          marginLeft: "10px",
          background: "white",
          border: "1px solid red",
          color: "red",
        }}
        danger
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "red";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.color = "red";
        }}
      >
        Çıkış Yap
      </Button>
    </Drawer>
  );
};

export default UserDrawer;

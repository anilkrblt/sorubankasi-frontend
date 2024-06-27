import React, { useState } from "react";
import { Modal, List, Input, Form, Button, message } from "antd";
import { updateExam } from "../services/apiService";

const ExamPreviewModal = ({ previewExam, setPreviewExam, onSave }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const handleEditClick = () => {
    setEditingExam(previewExam);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (editingExam) {
      try {
        await updateExam(editingExam);
        message.success("Sınav başarıyla güncellendi.");
        setEditModalVisible(false);
        setPreviewExam(editingExam);
        onSave(editingExam); 
      } catch (error) {
        message.error("Sınav güncellenirken bir hata oluştu.");
      }
    }
  };

  const handleQuestionChange = (index, field, value) => {
    if (editingExam) {
      const updatedQuestions = [...editingExam.sorular];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      setEditingExam({ ...editingExam, sorular: updatedQuestions });
    }
  };

  if (!previewExam) {
    return null;
  }

  return (
    <>
      <Modal
        title={`${previewExam.ders_kodu} - ${previewExam.test_adi}`}
        open={true}
        onCancel={() => setPreviewExam(null)}
        footer={[
          <Button key="edit" type="primary" onClick={handleEditClick}>
            Sınavı Düzenle
          </Button>,
        ]}
        width={800} 
        bodyStyle={{ padding: "20px" }}
      >
        <div>
          <p>
            <strong>Sınav Süresi:</strong> {previewExam.sinav_suresi}{" "}
            dakika
          </p>
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
                <h4>
                  {index + 1}. {question.soru_metni}
                </h4>
                <p>
                  <strong>Soru Tipi:</strong> {question.soru_tipi}
                </p>
                {question.soru_tipi === "test" && (
                  <div style={{ marginLeft: "20px" }}>
                    <p>
                      <strong>Şıklar:</strong>
                    </p>
                    <ul style={{ paddingLeft: "20px" }}>
                      {question.cevaplar.map((cevap, idx) => (
                        <li
                          key={idx}
                          style={{
                            color:
                              question.dogru_cevap === cevap ? "green" : "inherit",
                            fontWeight:
                              question.dogru_cevap === cevap ? "bold" : "normal",
                          }}
                        >
                          {cevap}
                        </li>
                      ))}
                    </ul>
                    <p>
                      <strong>Doğru Cevap:</strong> {question.dogru_cevap}
                    </p>
                  </div>
                )}
                <p>
                  <strong>Puan:</strong> {question.puan}
                </p>
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {editingExam && (
        <Modal
          title="Sınavı Düzenle"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={[
            <Button key="save" type="primary" onClick={handleSaveEdit}>
              Kaydet
            </Button>,
          ]}
          width={800} 
          bodyStyle={{ padding: "20px" }} 
        >
          <div>
            <Form layout="vertical">
              <Form.Item label="Sınav Süresi">
                <Input
                  type="number"
                  value={editingExam.sinav_suresi}
                  onChange={(e) =>
                    setEditingExam({ ...editingExam, sinav_suresi: e.target.value })
                  }
                />
              </Form.Item>
              <List
                dataSource={editingExam.sorular}
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
                    <Form.Item label={`Soru ${index + 1}`}>
                      <Input
                        value={question.soru_metni}
                        onChange={(e) =>
                          handleQuestionChange(index, "soru_metni", e.target.value)
                        }
                      />
                    </Form.Item>
                    {question.soru_tipi === "test" && (
                      <>
                        <Form.Item label="Şıklar">
                          {question.cevaplar.map((cevap, idx) => (
                            <Input
                              key={idx}
                              value={cevap}
                              onChange={(e) => {
                                const updatedCevaplar = [...question.cevaplar];
                                updatedCevaplar[idx] = e.target.value;
                                handleQuestionChange(index, "cevaplar", updatedCevaplar);
                              }}
                              style={{ marginBottom: "10px" }}
                            />
                          ))}
                        </Form.Item>
                        <Form.Item label="Doğru Cevap">
                          <Input
                            value={question.dogru_cevap}
                            onChange={(e) =>
                              handleQuestionChange(index, "dogru_cevap", e.target.value)
                            }
                          />
                        </Form.Item>
                      </>
                    )}
                    <Form.Item label="Puan">
                      <Input
                        type="number"
                        value={question.puan}
                        onChange={(e) =>
                          handleQuestionChange(index, "puan", e.target.value)
                        }
                      />
                    </Form.Item>
                  </List.Item>
                )}
              />
            </Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ExamPreviewModal;

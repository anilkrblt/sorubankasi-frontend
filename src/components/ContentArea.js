import React, { useState } from "react";
import { Button, Layout, message, List, Slider } from "antd";
import Questions from "./Questions";
import { submitExam } from "../services/apiService";

const { Content } = Layout;

const ContentArea = ({
  selectedQuestions,
  examTitle,
  examId,
  user,
  isExamInProgress,
  onExamStart,
  onExamFinish,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 dakika varsayılan süre
  const [intervalId, setIntervalId] = useState(null);

  const handleStartExam = () => {
    onExamStart(true);
    if (user?.role !== "teacher") {
      const id = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            message.info("Sınav süresi doldu.");
            onExamFinish();
            return 0;
          }
          return prevTime - 1;
        });
      }, 60000);
      setIntervalId(id);
    }
  };

  const handleFinishExam = async (answers) => {
    if (!user) {
      message.error("Giriş yapmadan sınavı gönderemezsiniz.");
      return;
    }

    clearInterval(intervalId);
    try {
      await submitExam(examId, answers);
      message.success("Sınav başarıyla gönderildi.");
      onExamFinish();
    } catch (error) {
      message.error("Sınav gönderilirken bir hata oluştu.");
    }
  };

  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: "white",
        borderRadius: 8,
      }}
    >
      {examId ? (
        <>
          {!isExamInProgress ? (
            <div>
              <h2>{examTitle}</h2>
              <p>
                {user?.role === "teacher"
                  ? "Sınavı Görüntülemek İçin Tıklayınız"
                  : "Sınava Başlamak İçin Tıklayınız"}
              </p>
              {user?.role === "teacher" ? (
                <Button onClick={handleStartExam}>Görüntüle</Button>
              ) : (
                <Button onClick={handleStartExam}>Başla</Button>
              )}
            </div>
          ) : (
            <div>
              <h2>{examTitle}</h2>
              {user?.role === "teacher" ? (
                <>
                  <List
                    dataSource={selectedQuestions}
                    renderItem={(question, index) => (
                      <List.Item
                        key={index}
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
                                      question.dogru_cevap === cevap
                                        ? "green"
                                        : "inherit",
                                    fontWeight:
                                      question.dogru_cevap === cevap
                                        ? "bold"
                                        : "normal",
                                  }}
                                >
                                  {cevap}
                                </li>
                              ))}
                            </ul>
                            <p>
                              <strong>Doğru Cevap:</strong>{" "}
                              {question.dogru_cevap}
                            </p>
                          </div>
                        )}
                        <p>
                          <strong>Puan:</strong> {question.puan}
                        </p>
                      </List.Item>
                    )}
                  />
                  <Button onClick={onExamFinish} style={{ marginTop: 16 }}>
                    Kapat
                  </Button>
                </>
              ) : (
                <div>
                  <Slider
                    value={timeRemaining}
                    max={60}
                    tipFormatter={(value) => `${value} dakika`}
                    style={{ marginBottom: 24 }}
                  />
                  <Questions
                    questions={selectedQuestions}
                    onSubmit={handleFinishExam}
                  />
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        "Soru Bankasına Hoş Geldiniz"
      )}
    </Content>
  );
};

export default ContentArea;

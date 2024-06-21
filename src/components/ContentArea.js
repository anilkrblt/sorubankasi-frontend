import React, { useState, useEffect } from "react";
import { Button, Layout, message, Slider } from "antd";
import Questions from "./Questions";
import { submitExam } from "../services/apiService";

const { Content } = Layout;

const ContentArea = ({ selectedQuestions, examTitle, examId, user, isExamInProgress, onExamStart, onExamFinish }) => {
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 dakika varsayılan süre
  const [intervalId, setIntervalId] = useState(null);

  const handleStartExam = () => {
    onExamStart(true);
    const id = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id);
          message.info("Sınav süresi doldu.");
          onExamFinish(); // Sınav süresi dolduğunda sınavı kapat
          return 0;
        }
        return prevTime - 1;
      });
    }, 60000); // Dakika başına bir kez güncelle (60000 ms)
    setIntervalId(id);
  };

  const handleFinishExam = async (answers) => {
    if (!user) {
      message.error("Giriş yapmadan sınavı gönderemezsiniz.");
      return;
    }

    clearInterval(intervalId);
    try {
      await submitExam(examId, answers); // `examId`'yi doğrudan buradan gönderiyoruz.
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
      {!isExamInProgress ? (
        <div>
          <h2>{examTitle}</h2>
          <p>Sınavı Görüntülemek İçin Tıklayınız</p>
          <Button onClick={handleStartExam}>Başla</Button>
        </div>
      ) : (
        <div>
          <h2>{examTitle}</h2>
          <Slider
            value={timeRemaining}
            max={60}
            tipFormatter={(value) => `${value} dakika`}
            style={{ marginBottom: 24 }}
          />
          <Questions questions={selectedQuestions} onSubmit={handleFinishExam} />
        </div>
      )}
    </Content>
  );
};

export default ContentArea;

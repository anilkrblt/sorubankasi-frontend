import React, { useState } from "react";
import { Form, Input, Button, List, Radio } from "antd";

const Questions = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <Form onFinish={handleSubmit}>
      <List
        itemLayout="vertical"
        dataSource={questions}
        renderItem={(question) => (
          <List.Item key={question._id}>
            <h3>{question.soru_metni}</h3>
            {question.soru_tipi === "test" && (
              <Form.Item>
                <Radio.Group
                  value={answers[question._id]}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                >
                  {question.cevaplar.map((cevap, index) => (
                    <Radio key={index} value={cevap}>
                      {cevap}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            )}
            {question.soru_tipi === "klasik" && (
              <Form.Item>
                <Input.TextArea
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  placeholder="Cevabınızı buraya giriniz"
                />
              </Form.Item>
            )}
            {question.soru_tipi === "kod" && (
              <Form.Item>
                <Input.TextArea
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  placeholder="Kodunuzu buraya yazınız"
                />
              </Form.Item>
            )}
          </List.Item>
        )}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sınavı Gönder
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Questions;

import React, { useState } from "react";
import { Button, Layout } from "antd";
import Questions from "../components/Questions";

const { Content } = Layout;

const ContentArea = ({ selectedQuestions }) => {
  const [open, setIsOpen] = useState(true);
  function clickHandler() {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: "white",
          borderRadius: 8,
        }}
      >
        {open && (
          <div>
            <p>Sınavı Görüntülemek İçin Tıklayınız</p>
            <Button onClick={clickHandler}>Başla</Button>
          </div>
        )}
        {!open && <Questions questions={selectedQuestions} />}
      </Content>
    </>
  );
};

export default ContentArea;

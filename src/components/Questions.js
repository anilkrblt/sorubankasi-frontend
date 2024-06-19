import React from "react";
import { List, Card, Typography, Radio, Input, Slider, Button } from "antd";
import {
  CodeOutlined,
  BookOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

const Questions = ({ questions }) => {
  const renderIcon = (type) => {
    switch (type) {
      case "test":
        return <QuestionCircleOutlined />;
      case "kod":
        return <CodeOutlined />;
      case "klasik":
        return <BookOutlined />;
      default:
        return null;
    }
  };
  const temp = ["a-)", "b-)", "c-)", "d-)", "e-)"];
  const renderContent = (item) => {
    switch (item.type) {
      case "test":
        return (
          <Radio.Group>
            {item.options.map((option, index) => (
              <Radio key={index} value={option}>
                {temp[index]} {option}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "kod":
        return <TextArea rows={4} placeholder="Kodunuzu buraya yazın..." />;
      case "klasik":
        return <TextArea rows={4} placeholder="Cevabınızı buraya yazın..." />;
      default:
        return null;
    }
  };

  return (
    <>
      <Slider value={100}></Slider>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={questions}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <>
                  <span>{renderIcon(item.type)}</span>
                  <span> {item.content}</span>
                </>
              }
            >
              {renderContent(item)}
            </Card>
          </List.Item>
        )}
      />
      <Button>Gönder</Button>
    </>
  );
};

export default Questions;

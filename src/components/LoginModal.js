import React from "react";
import { Modal, Form, Input, Button } from "antd";

const LoginModal = ({ isVisible, handleOk, handleCancel, onFinish }) => {
  return (
    <Modal
      title="Giriş Yap"
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish} 
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Lütfen geçerli bir e-posta giriniz!" }]}
        >
          <Input placeholder="E-posta" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
        >
          <Input.Password placeholder="Şifre" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;

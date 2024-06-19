import React from "react";
import { Modal, Form, Input, Button } from "antd";

const LoginModal = ({
  isVisible,
  handleOk,
  handleCancel,
  onFinish,
  onFinishFailed,
}) => {
  function onSubmit(e){
    e.preventDefault()
    console.log(e.target.value)

  }
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
        onFinishFailed={onFinishFailed}
        onSubmitCapture={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Lütfen geçerli bir kullanıcı adı giriniz!" }]}
        >
          <Input placeholder="Kullanıcı Adı/E-posta" />
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

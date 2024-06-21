import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { registerUser } from "../services/apiService";

const RegisterModal = ({
  isVisible,
  handleOk,
  handleCancel,
  onFinish,
  onFinishFailed,
}) => {
  const [userRole, setUserRole] = useState("student"); // Varsayılan rol olarak 'student' seçili

  const onRoleChange = value => {
    setUserRole(value); // Kullanıcının seçtiği rolü güncelle
  };

  return (
    <Modal
      title="Kaydol"
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="register"
        initialValues={{
          remember: true,
          role: "student" // İlk değer olarak öğrenci seçili
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Lütfen kullanıcı adınızı giriniz!" }]}
        >
          <Input placeholder="Kullanıcı Adı" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
        >
          <Input.Password placeholder="Şifre" />
        </Form.Item>
        <Form.Item name="firstName">
          <Input placeholder="Ad" />
        </Form.Item>
        <Form.Item name="lastName">
          <Input placeholder="Soyad" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "Bu e-posta geçerli mi?" },
            { required: true, message: "Lütfen geçerli bir e-posta adresi giriniz!" }
          ]}
        >
          <Input placeholder="E-posta" />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Lütfen bir rol seçiniz!" }]}
        >
          <Select onChange={onRoleChange} placeholder="Rol Seçiniz">
            <Select.Option value="student">Öğrenci</Select.Option>
            <Select.Option value="teacher">Öğretmen</Select.Option>
          </Select>
        </Form.Item>

        {userRole === "student" && (
          <Form.Item
            name="studentNumber"
            rules={[{ required: true, message: "Lütfen öğrenci numaranızı giriniz!" }]}
          >
            <Input placeholder="Öğrenci Numarası" />
          </Form.Item>
        )}

        {userRole === "teacher" && (
          <Form.Item
            name="tel_no"
            rules={[{ required: true, message: "Lütfen telefon numaranızı giriniz!" }]}
          >
            <Input placeholder="Telefon Numarası" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Onayla
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;

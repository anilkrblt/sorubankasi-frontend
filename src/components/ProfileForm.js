import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const ProfileForm = () => {
  const [showForm, setShowForm] = useState(false);
  function clickHandler() {
    setShowForm((prev) => !prev);
  }
  function onSubmit(obj){

  }
  return (
    <>
      {!showForm && (
        <Button type="primary" onClick={clickHandler}>
          Profili Düzenle
        </Button>
      )}
      <Form layout="vertical" onSubmitCapture={onSubmit}>
        {showForm && (
          <>
            <Form.Item label="Ad" name="ad">
              <Input placeholder="Adınızı giriniz" />
            </Form.Item>
            <Form.Item label="Soyad" name="soyad">
              <Input placeholder="Soyadınızı giriniz" />
            </Form.Item>
            <Form.Item label="İletişim No" name="tel">
              <Input placeholder="İletişim numaranızı giriniz" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={clickHandler}>Profil Güncelle</Button>
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

export default ProfileForm;

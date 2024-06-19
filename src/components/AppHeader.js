import React, { useState } from "react";
import { Layout, Menu, Button, notification } from "antd";
import UserAvatar from "./UserAvatar";
import UserDrawer from "./UserDrawer";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { registerUser, login } from "../services/apiService";
const { Header } = Layout;

const AppHeader = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({}); // "student" or "teacher"
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleLoginOk = () => {
    setIsLoginModalVisible(false);
    setIsLogin(true);
  };

  const handleLoginCancel = () => {
    setIsLoginModalVisible(false);
  };

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleRegisterOk = () => {
    setIsRegisterModalVisible(false);
  };

  const handleRegisterCancel = () => {
    setIsRegisterModalVisible(false);
  };

  const onRegisterFinish = async (values) => {
    try {
      await registerUser(values);
      notification.success({
        message: "Kayıt Başarılı",
        description: "Kullanıcı başarıyla kaydedildi.",
      });

      setIsRegisterModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Kayıt Başarısız",
        description: error.response.data.message,
      });
    }
  };
  const onLoginFinish = async (values) => {
    try {
      const userData = await login(values);
      console.log("Login success:", userData);
      setUser(userData);
      setIsAuthenticated(true);

      notification.success({
        message: "Giriş Başarılı",
        description: "Başarıyla giriş yaptınız.",
      });
      setIsLoginModalVisible(false);
      setIsLogin(true);
    } catch (error) {
      notification.error({
        message: "Giriş Başarısız",
        description: error.response
          ? error.response.data.message
          : "Giriş yapılamadı",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
        {isLogin && isAuthenticated && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <UserDrawer user={user} login={setIsLogin} />
          </div>
        )}
        {!isLogin && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button type="primary" onClick={showLoginModal}>
              Giriş Yap
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={showRegisterModal}>
              Kayıt Ol
            </Button>
          </div>
        )}
      </Header>
      {!isLogin && (
        <>
          <LoginModal
            isVisible={isLoginModalVisible}
            handleOk={handleLoginOk}
            handleCancel={handleLoginCancel}
            onFinish={onLoginFinish}
            onFinishFailed={onFinishFailed}
          />
          <RegisterModal
            isVisible={isRegisterModalVisible}
            handleOk={handleRegisterOk}
            handleCancel={handleRegisterCancel}
            onFinish={onRegisterFinish}
            onFinishFailed={onFinishFailed}
          />
        </>
      )}
    </>
  );
};

export default AppHeader;

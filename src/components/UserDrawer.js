import React, { useState } from "react";
import { Button, Drawer, Avatar } from "antd";
import ProfileForm from "./ProfileForm";
import StudentContent from "./StudentContent";
import TeacherContent from "./TeacherContent";
import UserAvatar from "./UserAvatar";
import data from "../dummy_content";

const UserDrawer = ({ user, login }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    // gelecek...
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const logOut = () => {
    login(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        {user === "teacher" ? "Teacher" : "Student"}
      </Button>
      <Button onClick={logOut}> Çıkış Yap</Button>

      <Drawer
        title="Kullanıcı Menüsü"
        placement="right"
        onClose={onClose}
        open={open}
        width={400}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <UserAvatar></UserAvatar>
          <p style={{ marginTop: 16 }}>İsim Soyisim</p>
          <p>iletisim@eposta.com</p>
        </div>

        <ProfileForm />
        {user === "teacher" ? <TeacherContent /> : <StudentContent />}
      </Drawer>
    </>
  );
};

export default UserDrawer;

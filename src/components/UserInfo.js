// UserInfo.js
import React from 'react';

const UserInfo = ({ user }) => (
  <>
    <p>
      <strong>Kullanıcı Adı:</strong> {user.kullanici_adi}
    </p>
    <p>
      <strong>Rol:</strong> {user.role}
    </p>
    <p>
      <strong>E-posta:</strong> {user.email}
    </p>
    <p>
      <strong>Ad:</strong> {user.ad}
    </p>
  </>
);

export default UserInfo;

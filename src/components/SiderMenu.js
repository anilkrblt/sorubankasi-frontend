import React from "react";
import { Menu, Layout } from "antd";
import { BookOutlined, LaptopOutlined, UserOutlined } from "@ant-design/icons";
import data from "../dummy_content";

const { Sider } = Layout;
const sinavlar = data.sinavlar;

const menuItems = [];
sinavlar.forEach((sinav) => {
  const newItem = {
    key: sinav.sinav_kodu,
    icon: <BookOutlined />,
    label: `${sinav.ders_adi}`,
    children: sinavlar
      .filter((s) => {
        return s.sinav_kodu === sinav.sinav_kodu;
      })
      .map((item) => {
        return {
          key: `${item.sinav_kodu}-${item.test_id}`,
          icon: <LaptopOutlined />,
          label: item.test_adi,
        };
      }),
  };
  let exists = menuItems.some((item) => item.key === newItem.key);
  if (!exists) {
    menuItems.push(newItem);
  }
});

const SiderMenu = ({ onMenuClick }) => {
  return (
    <Sider
      width={200}
      style={{
        background: "white",
      }}
    >
      <Menu
        mode="inline"
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={menuItems}
        onClick={onMenuClick}
      />
    </Sider>
  );
};

export default SiderMenu;

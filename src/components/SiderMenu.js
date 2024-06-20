import React from "react";
import { Menu, Layout } from "antd";
import { BookOutlined, LaptopOutlined } from "@ant-design/icons";
const data = []
const { Sider } = Layout;
const sinavlar = data.sinavlar;

const menuItems = [];


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

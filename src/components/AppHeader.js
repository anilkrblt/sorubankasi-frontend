import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const { Header } = Layout;

const dummyData = {
  BIL342: {
    dersAdi: "Bilgisayar Ağları",
    sinavlar: ["Vize Testi", "Final Testi"],
  },
  BIL343: {
    dersAdi: "Veri Yapıları",
    sinavlar: ["Vize Testi", "Final Testi"],
  },
  BIL344: {
    dersAdi: "Algoritmalar",
    sinavlar: ["Vize Testi"],
  },
};

const dummyGroups = ["Grup 1", "Grup 2", "Grup 3"];

const AppHeader = () => {
  const [current, setCurrent] = useState('BIL342');

  const handleClick = e => {
    setCurrent(e.key);
  };

  const generateMenuItems = () => {
    return Object.keys(dummyData).map(key => {
      const ders = dummyData[key];
      return (
        <Menu.Item key={key}>
          <Dropdown
            overlay={
              <Menu>
                {ders.sinavlar.map((sinav, index) => (
                  <Menu.Item key={`${key}-${index}`}>{sinav}</Menu.Item>
                ))}
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text">
              {ders.dersAdi} <DownOutlined />
            </Button>
          </Dropdown>
        </Menu.Item>
      );
    });
  };

  const generateGroupMenuItems = () => {
    return dummyGroups.map((group, index) => (
      <Menu.Item key={`group-${index}`}>{group}</Menu.Item>
    ));
  };

  return (
    <Header className="header">
      <div className="logo">Soru Bankası</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        onClick={handleClick}
      >
        <Menu.SubMenu key="groups" title="Gruplar">
          {generateGroupMenuItems()}
        </Menu.SubMenu>
        {generateMenuItems()}
      </Menu>
    </Header>
  );
};

export default AppHeader;

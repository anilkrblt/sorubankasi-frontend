import React, { useState, useEffect } from 'react';
import { DesktopOutlined, TeamOutlined, DownOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Button, Space, theme } from 'antd';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import { fetchPublicData } from './services/apiService';
import './App.css';

const { Header, Content, Sider, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [publicGroups, setPublicGroups] = useState([]);
  const [publicExams, setPublicExams] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    // Fetch public groups and exams on mount
    const fetchData = async () => {
      try {
        const data = await fetchPublicData();
        console.log('Fetched public data:', data);
        setPublicGroups(data.publicGroups);
        setPublicExams(data.publicExams);
      } catch (error) {
        console.error('Error fetching public data:', error);
      }
    };

    fetchData();
  }, []);

  const generateMenuItems = () => {
    const groupedExams = publicExams.reduce((acc, exam) => {
      if (!acc[exam.ders_kodu]) {
        acc[exam.ders_kodu] = {
          dersAdi: exam.ders_adi,
          sinavlar: [],
        };
      }
      acc[exam.ders_kodu].sinavlar.push(exam.test_adi);
      return acc;
    }, {});

    return Object.keys(groupedExams).map((key) => {
      const ders = groupedExams[key];
      return (
        <Dropdown
          key={key}
          overlay={
            <Menu>
              {ders.sinavlar.map((sinav, index) => (
                <Menu.Item key={`${key}-${index}`}>{sinav}</Menu.Item>
              ))}
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" style={{ color: '#fff', marginRight: '10px' }}>
            {ders.dersAdi} <DownOutlined />
          </Button>
        </Dropdown>
      );
    });
  };

  const generateGroupItems = () => {
    return publicGroups.map((group, index) =>
      getItem(group.grup_adi, `group-${index}`, <TeamOutlined />)
    );
  };

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#001529',
        }}
      >
        <div className="logo" style={{ color: '#fff', marginRight: '40px' }}>Soru Bankası</div>
        <Space size="large" style={{ flex: 1 }}>
          {generateMenuItems()}
        </Space>
        <Space size="middle">
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => setLoginModalVisible(true)}
          >
            Giriş Yap
          </Button>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setRegisterModalVisible(true)}
          >
            Kayıt Ol
          </Button>
        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={generateGroupItems()}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            İçerik burada gösterilecek
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      <RegisterModal
        isVisible={isRegisterModalVisible}
        handleCancel={() => setRegisterModalVisible(false)}
        handleOk={() => setRegisterModalVisible(false)}
      />
      <LoginModal
        isVisible={isLoginModalVisible}
        handleCancel={() => setLoginModalVisible(false)}
        handleOk={() => setLoginModalVisible(false)}
      />
    </Layout>
  );
};

export default App;

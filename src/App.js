import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  TeamOutlined,
  DownOutlined,
  UserAddOutlined,
  LoginOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Dropdown,
  Button,
  Space,
  theme,
  message,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import UserDrawer from "./components/UserDrawer";
import ContentArea from "./components/ContentArea";
import {
  fetchPublicData,
  createExam,
  login,
  logout,
  registerUser,
  createGroup,
} from "./services/apiService";
import "./App.css";

const { Header, Sider, Footer } = Layout;
const { Option } = Select;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [userDrawerVisible, setUserDrawerVisible] = useState(false);
  const [publicGroups, setPublicGroups] = useState([]);
  const [publicExams, setPublicExams] = useState([]);
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedExamTitle, setSelectedExamTitle] = useState("");
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isExamInProgress, setIsExamInProgress] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isExamModalVisible, setIsExamModalVisible] = useState(false);
  const [examForm] = Form.useForm();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPublicData();
        setPublicGroups(data.publicGroups);
        setPublicExams(data.publicExams);
      } catch (error) {
        console.error("Veriler gelirken bir hata oluştu!:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (values) => {
    try {
      const response = await login(values);
      console.log(response.user);
      setUser(response.user);
      console.log(response);
      setUserGroups(response.user.groups);
      localStorage.setItem("userId", response.user._id);
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
      message.success("Login Giriş başarılı!");
      setLoginModalVisible(false);
    } catch (error) {
      message.error("Giriş yapılamadı.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setUserGroups([]);
      setIsExamInProgress(false);
      message.success("Logout successful");
    } catch (error) {
      message.error("Logout failed.");
    }
  };

  const handleExamSelection = (exam) => {
    if (isExamInProgress) {
      message.warning(
        "Devam eden bir sınavınız var. Lütfen önce onu tamamlayın."
      );
      return;
    }
    setSelectedQuestions(exam.sorular);
    setSelectedExamTitle(`${exam.ders_adi} - ${exam.test_adi}`);
    setSelectedExamId(exam._id);
    setSelectedCourse(exam.ders_kodu);
  };

  const generateMenuItems = () => {
    const groupedExams = publicExams.reduce((acc, exam) => {
      if (!acc[exam.ders_kodu]) {
        acc[exam.ders_kodu] = {
          dersAdi: exam.ders_adi,
          sinavlar: [],
        };
      }
      acc[exam.ders_kodu].sinavlar.push(exam);
      return acc;
    }, {});

    return Object.keys(groupedExams).map((key) => {
      const ders = groupedExams[key];
      const isSelected = selectedCourse === key;
      return (
        <Dropdown
          key={key}
          overlay={
            <Menu>
              {ders.sinavlar.map((sinav, index) => (
                <Menu.Item
                  key={`${key}-${index}`}
                  onClick={() => handleExamSelection(sinav)}
                >
                  {sinav.test_adi}
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            type="text"
            style={{
              color: "#fff",
              marginRight: "10px",
              backgroundColor: isSelected ? "#0050b3" : "transparent",
            }}
          >
            {ders.dersAdi} <DownOutlined />
          </Button>
        </Dropdown>
      );
    });
  };

  const addExamsToGroups = (groups, exams) => {
    return groups.map((group) => {
      const groupExams = exams.filter((exam) =>
        group.sinavlar.includes(exam._id)
      );
      const groupWithExams = {
        ...group,
        children: groupExams.map((exam) =>
          getItem(exam.test_adi, exam._id, <DesktopOutlined />, null)
        ),
      };
      return groupWithExams;
    });
  };

  const handleMenuClick = ({ key }) => {
    if (isExamInProgress) {
      message.warning(
        "Devam eden bir sınavınız var. Lütfen önce onu tamamlayın."
      );
      return;
    }

    const exam = publicExams.find((exam) => exam._id === key);
    if (exam) {
      handleExamSelection(exam);
    }
  };

  const generatePublicGroupItems = () => {
    const groupsWithExams = addExamsToGroups(publicGroups, publicExams);
    return groupsWithExams.map((group, index) =>
      getItem(
        group.grup_adi,
        `public-group-${index}`,
        <TeamOutlined />,
        group.children
      )
    );
  };

  const handleRegister = async (values) => {
    try {
      await registerUser(values);
      message.success("Kayıt başarılı. Lütfen giriş yapın.");
      setRegisterModalVisible(false);
    } catch (error) {
      message.error("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  const generateUserGroupItems = () => {
    const groupsWithExams = addExamsToGroups(userGroups, publicExams);
    return groupsWithExams.map((group, index) =>
      getItem(
        group.grup_adi,
        `user-group-${index}`,
        <TeamOutlined />,
        group.children
      )
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

  const handleGroupCreation = async (values) => {
    try {
      const response = await createGroup({
        grup_adi: values.groupName,
        sinavlar: values.exams,
        uyeler: values.students.map((student) => ({
          ogrenci_no: student,
        })),
        olusturan_id: user._id,
        type: values.groupType,
      });

      setUserGroups((prev) => [...prev, response.group]);

      message.success("Grup başarıyla oluşturuldu.");
      setIsGroupModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Grup oluşturulurken bir hata oluştu.");
    }
  };

  const handleExamCreation = async (values) => {
    const examData = {
      type: values.testType,
      ders_kodu: values.courseCode,
      ders_adi: values.courseName,
      test_adi: values.testName,
      sorular: values.questions.map((question) => ({
        soru_tipi: question.type,
        soru_metni: question.text,
        cevaplar: question.answers ? question.answers : [],
        dogru_cevap: question.correctAnswer ? question.correctAnswer : "",
        puan: question.points,
      })),
      sinav_suresi: values.duration,
      grup_id:
        values.groupId && values.groupId.length > 0 ? values.groupId[0] : null,
      hazirlayan_id: user._id,
    };

    try {
      const response = await createExam(examData);
      setPublicExams((prev) => [...prev, response.exam]);

      message.success("Sınav başarıyla oluşturuldu.");
      setIsExamModalVisible(false);
      examForm.resetFields();
    } catch (error) {
      message.error("Sınav oluşturulurken bir hata oluştu.");
    }
  };

  const onProfileUpdate = async (updatedUser) => {
    setUser(updatedUser);
    setUserDrawerVisible(false);
  };
  return (
    <Layout style={{ minHeight: "100vh"}}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#001529",
        }}
      >
        <div className="logo" style={{ color: "#fff", marginRight: "60px" }}>
        <strong>Soru Bankası</strong> 
        </div>

        <Space size="large" style={{ flex: 1 }}>
          {generateMenuItems()}
        </Space>
        <Space size="middle">
          {user ? (
            <>
              {user.role === "teacher" && (
                <>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setIsGroupModalVisible(true)}
                    style={{ marginRight: 10 }}
                  >
                    Grup Ekle
                  </Button>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setIsExamModalVisible(true)}
                    style={{ marginRight: 10 }}
                  >
                    Sınav Ekle
                  </Button>
                </>
              )}
              <Dropdown overlay={<></>} trigger={["click"]}>
                <Button
                  type="text"
                  style={{ color: "#fff" }}
                  onClick={() => setUserDrawerVisible(true)}
                >
                  {user.kullanici_adi} <UserOutlined />
                </Button>
              </Dropdown>
              <UserDrawer
                setUserGroups
                visible={userDrawerVisible}
                onClose={() => setUserDrawerVisible(false)}
                user={user}
                onLogout={handleLogout}
                onProfileUpdate={onProfileUpdate}
              />
            </>
          ) : (
            <>
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
            </>
          )}
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
            onClick={handleMenuClick}
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "general-groups",
                icon: <TeamOutlined />,
                label: "Genel Gruplar",
                children: generatePublicGroupItems(),
              },
              {
                key: "user-groups",
                icon: <TeamOutlined />,
                label: "Özel Gruplar",
                children: generateUserGroupItems(),
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <ContentArea
            selectedQuestions={selectedQuestions}
            examTitle={selectedExamTitle}
            examId={selectedExamId}
            user={user}
            isExamInProgress={isExamInProgress}
            onExamStart={setIsExamInProgress}
            onExamFinish={() => setIsExamInProgress(false)}
          />
          <Footer style={{ textAlign: "center" }}>
            Soru Bank ©{new Date().getFullYear()} Created by Anıl Karabulut
          </Footer>
        </Layout>
      </Layout>
      <RegisterModal
        isVisible={isRegisterModalVisible}
        handleCancel={() => setRegisterModalVisible(false)}
        handleOk={() => setRegisterModalVisible(false)}
        onFinish={handleRegister}
      />
      <LoginModal
        isVisible={isLoginModalVisible}
        handleCancel={() => setLoginModalVisible(false)}
        handleOk={() => setLoginModalVisible(false)}
        onFinish={handleLogin}
      />
      {/* Grup Ekleme */}
      <Modal
        title="Yeni Grup Ekle"
        open={isGroupModalVisible}
        onCancel={() => setIsGroupModalVisible(false)}
        onOk={() => form.submit()}
        okText="Ekle"
        cancelText="İptal"
      >
        <Form form={form} onFinish={handleGroupCreation} layout="vertical">
          <Form.Item
            name="groupName"
            label="Grup Adı"
            rules={[{ required: true, message: "Grup adını giriniz." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="groupType"
            label="Grup Türü"
            rules={[{ required: true, message: "Grup türünü seçiniz." }]}
          >
            <Select placeholder="Grup türünü seçiniz.">
              <Option value="private">Özel</Option>
              <Option value="public">Genel</Option>
            </Select>
          </Form.Item>
          <Form.Item name="exams" label="Sınavlar">
            <Select
              mode="multiple"
              placeholder="Gruba eklemek istediğiniz sınavları seçin."
            >
              {publicExams.map((exam) => (
                <Option key={exam._id} value={exam._id}>
                  {exam.ders_adi} - {exam.test_adi}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="students">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div
                    key={key}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "studentNumber"]}
                      fieldKey={[fieldKey, "studentNumber"]}
                      label="Öğrenci Numarası"
                      rules={[
                        {
                          required: true,
                          message: "Öğrenci numarasını giriniz.",
                        },
                      ]}
                      style={{ flex: 1 }}
                    >
                      <Input
                        placeholder="Öğrenci numarasını giriniz"
                        style={{ marginRight: 8 }}
                      />
                    </Form.Item>
                    <Button danger type="link" onClick={() => remove(name)}>
                      Kaldır
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    Öğrenci Ekle
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
      {/* Sınav ekleme */}
      <Modal
        title="Yeni Sınav Ekle"
        visible={isExamModalVisible}
        onCancel={() => setIsExamModalVisible(false)}
        onOk={() => examForm.submit()}
        okText="Ekle"
        cancelText="İptal"
      >
        <Form form={examForm} onFinish={handleExamCreation} layout="vertical">
          <Form.Item
            name="courseCode"
            label="Ders Kodu"
            rules={[{ required: true, message: "Ders kodunu giriniz." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="courseName"
            label="Ders Adı"
            rules={[{ required: true, message: "Ders adını giriniz." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="testName"
            label="Test Adı"
            rules={[{ required: true, message: "Test adını giriniz." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Sınav Süresi (dakika)"
            rules={[{ required: true, message: "Sınav süresini giriniz." }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="testType"
            label="Test Türü"
            rules={[{ required: true, message: "Test türünü seçiniz." }]}
          >
            <Select placeholder="Test türünü seçiniz.">
              <Option value="public">Açık</Option>
              <Option value="private">Özel</Option>
            </Select>
          </Form.Item>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Form.Item
                      {...field}
                      name={[field.name, "type"]}
                      label={`Soru ${index + 1} Türü`}
                      rules={[
                        { required: true, message: "Soru türünü seçiniz." },
                      ]}
                    >
                      <Select placeholder="Soru türünü seçiniz.">
                        <Option value="test">Test</Option>
                        <Option value="klasik">Klasik</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "text"]}
                      label={`Soru ${index + 1} Metni`}
                      rules={[
                        { required: true, message: "Soru metnini giriniz." },
                      ]}
                    >
                      <Input.TextArea placeholder="Soru metnini giriniz" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "points"]}
                      label={`Soru ${index + 1} Puan`}
                      rules={[
                        { required: true, message: "Soru puanını giriniz." },
                      ]}
                    >
                      <Input type="number" placeholder="Soru puanını giriniz" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "answers"]}
                      label={`Soru ${index + 1} Cevaplar (Test tipi için)`}
                      rules={
                        field.fieldKey % 2 === 0
                          ? []
                          : [{ required: true, message: "Cevapları giriniz." }]
                      }
                    >
                      <Select
                        mode="tags"
                        placeholder="Cevapları giriniz (yalnızca test soruları için)"
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "correctAnswer"]}
                      label={`Soru ${index + 1} Doğru Cevap (Test tipi için)`}
                      rules={
                        field.fieldKey % 2 === 0
                          ? []
                          : [
                              {
                                required: true,
                                message: "Doğru cevabı giriniz.",
                              },
                            ]
                      }
                    >
                      <Input placeholder="Doğru cevabı giriniz (yalnızca test soruları için)" />
                    </Form.Item>
                    <Button
                      danger
                      type="link"
                      onClick={() => remove(field.name)}
                    >
                      Kaldır
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    Soru Ekle
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;

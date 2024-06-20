import React, { useState } from "react";
import { Layout } from "antd";
import AppHeader from "../components/AppHeader";
import SiderMenu from "../components/SiderMenu";
import Breadcrumbs from "../components/Breadcrumbs";
import ContentArea from "../components/ContentArea";

const data = [];

const sinavlar = data.sinavlar;

const MainLayout = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleMenuClick = ({ key }) => {
    const test_id = key.split("-")[1];
    const selectedSinav = sinavlar.find((s) => s.test_id === +test_id);
    const questions = selectedSinav.sinav_sorulari.map((s, index) => ({
      title: `${index + 1}. soru   ${s.puan} puan`,
      content: s.soru,
      type: s.type,
      options: s.cevaplar || [],
    }));
    setSelectedQuestions(questions);
  };

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <SiderMenu onMenuClick={handleMenuClick} />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumbs />
          <ContentArea selectedQuestions={selectedQuestions} />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

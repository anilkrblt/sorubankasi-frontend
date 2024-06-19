import React from "react";
import { Breadcrumb } from "antd";

const Breadcrumbs = () => {
  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      <Breadcrumb.Item>Ders Adı</Breadcrumb.Item>
      <Breadcrumb.Item>Sınav Adı</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;

import React, { useState } from "react";
import { Avatar, Button } from "antd";

const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const UserAvatar = () => {
  
  const [color, setColor] = useState(ColorList[0]);

  return (
    <>
      <Avatar
        style={{
          backgroundColor: color,
          verticalAlign: "middle",
        }}
        size="large"
      ></Avatar>
    </>
  );
};
export default UserAvatar;

import React from "react";
import "./login.css";
import bg from "../../assets/images/loginBg.jpg";
import phone from "../../assets/images/Phone.png";
import { Image, Form, Input, Button, Radio } from "antd";
import { PhoneOutlined, LockOutlined } from "@ant-design/icons";

function Login() {
  return (
    <div className="loginPage">
      <Image src={bg} className="loginPage__bgImage" />
      <div className="loginPage__formContainer">
        <Form className="loginPage__form">
          <span className="loginPage__inputSpan">
            <PhoneOutlined style={{ fontSize: "20px", color: "#2e418c" }} />{" "}
            <Input placeholder="Phone Number" className="loginPage__input" />
          </span>
          <span className="loginPage__inputSpan">
            <LockOutlined style={{ fontSize: "20px", color: "#2e418c" }} />{" "}
            <Input placeholder="Password" className="loginPage__input" />
          </span>

          <Button className="loginPage__button">Login</Button>
          <Radio className="loginPage__radio"> Remember</Radio>
        </Form>
      </div>
    </div>
  );
}

export default Login;

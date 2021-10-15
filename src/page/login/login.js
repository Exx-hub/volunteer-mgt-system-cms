import React from "react";
import "./login.css";
import bg from "../../assets/images/loginBg.jpg";
import phone from "../../assets/images/Phone.png";
import { Image, Form, Input, Button } from "antd";

function Login() {
  return (
    <div className="loginPage">
      <Image src={bg} className="loginPage__bgImage" />
      <div className="loginPage__formContainer">
        <Form className="loginPage__form">
          <Input />
          <Input />
          <Button>CLICK ME</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;

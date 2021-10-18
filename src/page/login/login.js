import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import bg from "../../assets/images/loginBg.jpg";
import phone from "../../assets/images/Phone.png";
import { Image, Form, Input, Button, Radio, Spin } from "antd";
import {
  PhoneOutlined,
  LockOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onFinish = () => {
    setIsLoading(true);

    // LOGIN API CALL HERE

    setTimeout(() => {
      setIsLoading(false);
      // alert("login clicked");
      console.log("mobile:", mobile);
      console.log("password", password);

      setMobile("");
      setPassword("");
    }, 2000);
  };

  return (
    <div className="loginPage">
      <Image src={bg} className="loginPage__bgImage" />
      <div className="loginPage__formContainer">
        <Form onFinish={onFinish} className="loginPage__form">
          <span className="loginPage__inputSpan">
            <PhoneOutlined style={{ fontSize: "20px", color: "#2e418c" }} />{" "}
            <Input
              placeholder="Phone Number"
              className="loginPage__input"
              type="number"
              ref={inputRef}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </span>
          <span className="loginPage__inputSpan">
            <LockOutlined style={{ fontSize: "20px", color: "#2e418c" }} />{" "}
            <Input
              type="password"
              placeholder="Password"
              className="loginPage__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>

          <Button
            htmlType="submit"
            disabled={isLoading}
            className={
              isLoading ? "loginPage__button disabled" : "loginPage__button"
            }
          >
            {isLoading && (
              <div className="loginPage__button--spinner">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "lightgray" }}
                      spin
                    />
                  }
                />
              </div>
            )}
            Login
          </Button>
          <Radio className="loginPage__radio"> Remember</Radio>
        </Form>
      </div>
    </div>
  );
}

export default Login;

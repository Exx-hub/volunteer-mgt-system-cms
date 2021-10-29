import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import bg from "../../assets/images/loginBg.jpg";
import { Image, Form, Input, Button, Spin, Checkbox } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import Admin from "../../service/Admin";
import { UserProfile } from "../../utility";
import Alert from "react-s-alert";
import { config } from "../../config";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const history = useHistory();

  const onFinish = () => {
    setIsLoading(true);

    Admin.login(username, password)
      .then((e) => {
        const { data } = e.data;
        console.log("FRESH FROM LOGIN FETCH:", e.data);
        setIsLoading(false);

        if (data) {
          UserProfile.setCredential({
            user: data.username,
            token: data.token,
          });
          // if (Number((data.user && data.user.status) || "0") === 0) {
          //   notification["error"]({
          //     message: "Disabled Account",
          //     description: "Unable to access your account",
          //   });
          //   UserProfile.logout(User);
          // }
          history.push("/home");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
        Alert.warning("Incorrect Username/Password", {
          position: "top-right",
          effect: "slide",
          timeout: 3000,
        });
      });
  };

  return (
    <div className="loginPage">
      <Image src={bg} className="loginPage__bgImage" />
      <div className="loginPage__formContainer">
        <Form onFinish={onFinish} className="loginPage__form">
          <span className="loginPage__inputSpan">
            <UserOutlined style={{ fontSize: "20px", color: "#2e418c" }} />{" "}
            <Input
              placeholder="Username"
              className="loginPage__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              isLoading || username === "" || password === ""
                ? "loginPage__button disabled"
                : "loginPage__button"
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
          <Checkbox
            onChange={() => setChecked(!checked)}
            className="loginPage__radio"
          >
            {" "}
            Remember
          </Checkbox>
        </Form>

        <div className="version-column">
          <span className="version">
            {config.version.environment} v{config.version.build}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

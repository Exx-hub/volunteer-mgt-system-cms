import React, { useEffect, useState } from "react";
import "./home.css";
import "../../assets/images/sidebar.jpg";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { UserProfile as User } from "../../utility";

import { Layout, Menu } from "antd";

import Users from "../user";
import Regional from "../regional";
import Bulletin from "../bulletin";
import About from "../about";
import StatusReport from "../statusReport";
import RegionalNews from "../regionalNews";
import PromptModal from "../../components/PromptModal";

const { Content, Sider } = Layout;

function Home() {
  const [logoutVisible, setLogoutVisible] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const [active, setActive] = useState("");

  useEffect(() => {
    if (location.pathname === "/home/users") setActive("users");
    if (location.pathname === "/home/regional") setActive("regional");
    if (location.pathname === "/home/bulletin") setActive("bulletin");
    if (location.pathname === "/home/about") setActive("about");
  }, [location.pathname]);

  const logout = () => {
    history.push("/");

    // clear credentials then logout

    User.clearData();

    // open modal to confirm before logging out
  };

  const openModal = () => {
    setLogoutVisible(true);
  };

  const closeModal = () => {
    setLogoutVisible(false);
  };

  const okModal = () => {
    setLogoutVisible(false);
    logout();
  };

  return (
    <Layout className="homePage">
      <Sider width={280} className="homePage__sider">
        <Menu className="homePage__sider--menu" mode="inline">
          <Menu.Item
            key="1"
            className={active === "users" ? "menu__item active" : "menu__item"}
            onClick={() => history.push("/home/users")}
          >
            Users
          </Menu.Item>
          <Menu.Item
            key="2"
            className={
              active === "regional" ? "menu__item active" : "menu__item"
            }
            onClick={() => history.push("/home/regional")}
          >
            Regional Management
          </Menu.Item>
          <Menu.Item
            key="3"
            className={
              active === "bulletin" ? "menu__item active" : "menu__item"
            }
            onClick={() => history.push("/home/bulletin")}
          >
            Bulletin Management
          </Menu.Item>
          <Menu.Item
            key="4"
            className={active === "about" ? "menu__item active" : "menu__item"}
            onClick={() => history.push("/home/about")}
          >
            About
          </Menu.Item>

          <Menu.Item key="5" className="menu__item" onClick={openModal}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="content">
          <Switch>
            <Route path="/home/users">
              <Users />
            </Route>
            <Route path="/home/regional">
              <Regional />
            </Route>
            <Route path="/home/status">
              <StatusReport />
            </Route>
            <Route path="/home/news">
              <RegionalNews />
            </Route>
            <Route path="/home/bulletin">
              <Bulletin />
            </Route>
            <Route path="/home/about">
              <About />
            </Route>

            <Redirect from="/home" to="/home/users" />
          </Switch>
        </Content>
      </Layout>

      <PromptModal
        visible={logoutVisible}
        closeModal={closeModal}
        contentLabel="Logout modal"
        headerTitle="Confirm Logout"
        confirmMessage="Are you sure you want to logout?"
        buttonText="Confirm"
        onOk={okModal}
      />
    </Layout>
  );
}

export default Home;

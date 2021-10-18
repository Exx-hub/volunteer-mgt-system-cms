import React from "react";
import "./home.css";
import "../../assets/images/sidebar.png";
import SideBar from "../../components/SideBar";
import { Switch, Route } from "react-router-dom";

import { Layout, Menu } from "antd";

import Users from "../user";
import Regional from "../regional";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {
  return (
    <Layout className="homePage">
      <Sider width={280} className="homePage__sider">
        <Menu className="homePage__sider--menu" mode="inline">
          <Menu.Item className="menu__item">Users</Menu.Item>
          <Menu.Item className="menu__item">Regional Management</Menu.Item>
          <Menu.Item className="menu__item">Bulletin Management</Menu.Item>
          <Menu.Item className="menu__item">About</Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ background: "coral" }}>
        <Content style={{ background: "blue" }}>
          <Switch>
            <Route path="/home/users">
              <Users />
            </Route>
            <Route path="/home/regional">
              <Regional />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;

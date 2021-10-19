import { Layout, Row, Col, Divider, Table, Button, Input } from "antd";
import React from "react";
import SideBar from "../../components/SideBar";
import "./users.css";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;

const tableSource = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    fixed: "left",
    align: "center",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    align: "center",
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    align: "center",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
  {
    title: "Municipality",
    dataIndex: "municipality",
    key: "municipality",
    align: "center",
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
    align: "center",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "birthday,",
    align: "center",
  },
  {
    title: "Password",
    key: "password",
    align: "center",
    render: () => {},
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: () => {},
  },
];

function Users() {
  return (
    <Layout className="usersPage__container">
      <Content className="usersPage__main">
        <Row>
          <Col className="usersPage__title">USER LIST</Col>
        </Row>
        <div className="usersPage__divider" />
        <Row className="usersPage__utils">
          <Button className="usersPage__utils--button">Add New User +</Button>
          <span className="usersPage__utils--search">
            <SearchOutlined style={{ fontSize: "24px", color: "gray" }} />
            <Input className="search--input" placeholder="Search User Here" />
          </span>
        </Row>
        {/* <div>
          <Table
            // loading={this.state.fetching}
            scroll={{ x: true }}
            rowKey={(e) => e.key}
            pagination={false}
            columns={tableSource}
            // dataSource={}
            className="usersPage__table"
          />
        </div> */}
      </Content>
    </Layout>
  );
}

export default Users;

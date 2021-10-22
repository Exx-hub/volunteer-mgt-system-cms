import { Layout, Row, Col, Table, Button, Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import "./users.css";
import { SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { pModalStyles, customStyles, sampleUserData } from "./utils";

const { Content } = Layout;

function Users() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [passwordModalVisibile, setPasswordModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [modalInput, setModalInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmInput, setConfirmInput] = useState("");

  // parses data when data is available
  useEffect(() => {
    // when component renders, call api to get users, then parse data into records array
    // to display in table
    // getAllUsers....

    // call this function when data is retrieved from backend api
    parseTableData();
  }, []);

  // hard coded data --- but this data needs to be retrieved from backend
  const [data, setData] = useState(sampleUserData);

  // initial data table -- starts empty, gets data when parsed
  const [records, setRecords] = useState([]);

  // parses data from backend
  const parseTableData = () => {
    const record = data.map((e, i) => {
      return {
        key: i,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        mobileNumber: e.number,
        address: e.address,
        municipality: e.municipality,
        region: e.region,
        birthday: e.birthday,
      };
    });
    setRecords(record);
  };

  const openPModal = () => {
    setPasswordModalVisible(true);
  };

  const closePModal = () => {
    setPasswordModalVisible(false);
  };

  const okPModal = () => {
    setPasswordModalVisible(false);
    alert("Submit generate new password");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const okModal = () => {
    setIsOpen(false);
    alert("call api to add user");
  };

  const onChange = (e) => {
    setModalInput({ ...modalInput, [e.target.name]: e.target.value });
  };

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
      render: (user) => (
        <Button
          style={{
            backgroundColor: "#3061c9",
            border: "none",
            color: "white",
            padding: 4,
            borderRadius: "5px",
            cursor: modalIsOpen ? "not-allowed" : "pointer",
          }}
          disabled={modalIsOpen}
          onClick={() => setPasswordModalVisible(true)}
        >
          Generate
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (user) => {
        return (
          // <select disabled={modalIsOpen || passwordModalVisibile}>
          //   <option value="" disabled selected hidden>
          //     Action
          //   </option>
          //   <option>EDIT</option>
          //   <option>DELETE</option>
          // </select>
          <>
            <Button>EDIT</Button>
            <Button>DELETE</Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Layout className="usersPage__container">
        <Content className="usersPage__main">
          <Row>
            <Col className="usersPage__title">USER LIST</Col>
          </Row>
          <div className="usersPage__divider" />
          <Row className="usersPage__utils">
            <Button
              disabled={passwordModalVisibile}
              onClick={openModal}
              className={
                passwordModalVisibile
                  ? "usersPage__utils--button disableButton"
                  : "usersPage__utils--button"
              }
            >
              Add New User +
            </Button>
            <span className="usersPage__utils--search">
              <SearchOutlined style={{ fontSize: "24px", color: "gray" }} />
              <Input
                className="search--input"
                placeholder="Search User Here"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </span>
          </Row>
          <div>
            <Table
              // loading={this.state.fetching}
              // scroll={{ x: true }}
              rowKey={(e) => e.key}
              pagination={false}
              columns={tableSource}
              dataSource={records}
              className="usersPage__table"
            />
          </div>
        </Content>

        {/* GENERATE PASSWORD MODAL  */}
        <Modal
          isOpen={passwordModalVisibile}
          onRequestClose={closePModal}
          style={pModalStyles}
          contentLabel="Password Modal"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="password-modal-header">
              <h2>Generate New Password</h2>{" "}
              <h2 className="password-modal-close-icon" onClick={closePModal}>
                X
              </h2>
            </div>
            <Form className="password-modal-form">
              <Form.Item>
                <h5>Password</h5>
                <Input
                  className="password-modal-input"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <h5>Confirm Password</h5>
                <Input
                  className="password-modal-input"
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                />
              </Form.Item>
            </Form>

            <Button onClick={okPModal} className="password-modal-button">
              Submit
            </Button>
          </div>
        </Modal>

        {/* ADD USER MODAL  */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "#f8bc29",
            }}
          >
            <div className="add-user-modal-header">
              <h2>User Details</h2>{" "}
              <h2 onClick={closeModal} className="add-user-modal-close-icon">
                X
              </h2>
            </div>
            <Form className="add-user-modal-form">
              <div className="top-inputs">
                <Form.Item>
                  <h5>First Name:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="firstName"
                    value={modalInput.firstName}
                    onChange={onChange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Last Name:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="lastName"
                    value={modalInput.lastName}
                    onChange={onChange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Email Address:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="email"
                    value={modalInput.email}
                    onChange={onChange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Phone Number:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="number"
                    value={modalInput.number}
                    onChange={onChange}
                    type="number"
                  />
                </Form.Item>
              </div>
              <div className="bottom-inputs">
                <Form.Item>
                  <h5>Address:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="address"
                    value={modalInput.address}
                    onChange={onChange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Birthday:</h5>
                  <Input className="add-user-modal-input" />
                </Form.Item>
                <Form.Item>
                  <h5>Region:</h5>
                  <Input className="add-user-modal-input" />
                </Form.Item>
                <Form.Item>
                  <h5>Municipality:</h5>
                  <Input className="add-user-modal-input" />
                </Form.Item>
              </div>
            </Form>
            <div style={{ padding: ".5rem 1rem" }}>
              <Button onClick={okModal} className="add-user-modal-button">
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </Layout>
    </>
  );
}

export default Users;

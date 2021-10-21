import {
  Layout,
  Row,
  Col,
  Divider,
  Table,
  Button,
  Input,
  Form,
  Select,
  AutoComplete,
} from "antd";
import React, { useEffect, useState } from "react";
import "./users.css";
import { SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";

const { Content } = Layout;
const { Option } = Select;

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
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      border: "none",
      "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      width: "1000px",
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [modalInput, setModalInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
  });

  // parses data when data is available
  useEffect(() => {
    // when component renders, call api to get users, then parse data into records array
    // to display in table
    // getAllUsers....

    // call this function when data is retrieved from backend api
    parseTableData();
  }, []);

  // hard coded data --- but this data needs to be retrieved from backend
  const [data, setData] = useState([
    {
      firstName: "Alvin",
      lastName: "Acosta",
      email: "aa@gmail.com",
      number: "09164209977",
      address: "21 Falcon St.",
    },
    {
      firstName: "Alvin",
      lastName: "Acosta",
      email: "aa@gmail.com",
      number: "09164209977",
      address: "21 Falcon St.",
    },
    {
      firstName: "Alvin",
      lastName: "Acosta",
      email: "aa@gmail.com",
      number: "09164209977",
      address: "21 Falcon St.",
    },
  ]);

  // initial data table -- starts empty, gets data when parsed
  const [records, setRecord] = useState([]);

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
    setRecord(record);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    // alert("modal opened");
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

  return (
    <>
      <Layout className="usersPage__container">
        <Content className="usersPage__main">
          <Row>
            <Col className="usersPage__title">USER LIST</Col>
          </Row>
          <div className="usersPage__divider" />
          <Row className="usersPage__utils">
            <Button onClick={openModal} className="usersPage__utils--button">
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

        {/* ADD USER MODAL  */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName="overlayClassname"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f8bc29",
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

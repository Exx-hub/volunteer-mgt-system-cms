import { Layout, Row, Col, Table, Button, Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import "./users.css";
import { SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import moment from "moment-timezone";

import {
  pModalStyles,
  customStyles,
  editModalStyles,
  getRegion,
} from "./utils";
import AppUser from "../../service/AppUser";
import Region from "../../service/Region";

const { Content } = Layout;

function Users() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [passwordModalVisibile, setPasswordModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [modalInput, setModalInput] = useState({
    firstName: "",
    lastName: "",
    // email: "",
    mobileNo: "",
    address: "",
    birthDate: "",
    gender: "",
    regionId: "",
    municipalityId: "",
    password: "",
  });
  const [editUserInput, setEditUserInput] = useState({
    firstName: "",
    lastName: "",
    // email: "",
    mobileNo: "",
    address: "",
    birthDate: "",
    gender: "",
    regionId: "",
    municipalityId: "",
    password: "",
  });

  console.log(editUserInput);

  const [passwordInput, setPasswordInput] = useState("");
  const [confirmInput, setConfirmInput] = useState("");

  const [regions, setRegions] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  // console.log(selectedRegion);

  // GETS USER LIST AND REGIONLIST
  useEffect(() => {
    AppUser.getAllAppUsers().then((e) => {
      const { data } = e.data;
      // console.log(data);

      setData(data);
    });

    Region.getRegionList().then((e) => {
      const { data } = e.data;
      // console.log(data);
      setRegions(data);
    });
  }, []);

  // SETS MUNICIPALITIES DEPENDING ON REGION SELECTED
  useEffect(() => {
    if (selectedRegion) {
      Region.getMunicipalityByRegionId(selectedRegion).then((e) => {
        const { data } = e.data;
        console.log("MUNI:", data);
        setMunicipalities(data);
      });
    }
  }, [selectedRegion]);

  // PARSES RECORDS
  useEffect(() => {
    if (data.length > 0 || searchInput === "") {
      parseTableData();
    }
  }, [data, searchInput]);

  // FILTER TABLE DATA WHEN SEARCH IS CLICKED
  const doSearch = (text) => {
    const filtered = records.filter((record) => {
      return record.fullName.includes(text);
    });

    setRecords(filtered);
  };

  // SETS REGION FOR GETTING MUNICIPALITIES FOR EDIT USER
  const handleSelect = (regionId) => {
    setModalInput({ ...modalInput, regionId });
    setSelectedRegion(regionId);
  };

  // SETS REGION FOR GETTING MUNICIPALITIES FOR EDIT USER
  const handleEditSelect = (regionId) => {
    setEditUserInput({ ...editUserInput, regionId });
    setSelectedRegion(regionId);
  };

  // parses data from backend
  const parseTableData = () => {
    const record = data.map((e, i) => {
      console.log(e);
      return {
        key: i,
        // fullName: e.fullName,
        firstName: e.firstName,
        lastName: e.lastName,
        password: e.password,
        gender: e.gender,
        // email: e.email,
        mobileNumber: e.mobileNo,
        address: e.address,
        municipality: "Quezon City",
        region: "NCR",
        birthday: "Oct 26,2001",
        municipalityId: e.municipalityId,
        regionId: e.regionId,
        // birthday: moment.tz(e.birthDate).format("MMM DD, YYYY"),
        id: e._id,
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

  // ADD USER WHEN MODAL IS SUBMITTED
  const okModal = () => {
    setIsOpen(false);

    console.log(modalInput);

    // call add user api here
    AppUser.addAppUser(
      modalInput.firstName,
      modalInput.lastName,
      // modalInput.email,
      modalInput.mobileNo,
      modalInput.address,
      modalInput.birthDate,
      modalInput.regionId,
      modalInput.municipalityId,
      modalInput.gender,
      modalInput.password
    ).then((e) => {
      const { data } = e.data;
      console.log(data);
      setModalInput({
        firstName: "",
        lastName: "",
        // email: "",
        mobileNo: "",
        address: "",
        birthDate: "",
        gender: "",
        regionId: "",
        municipalityId: "",
        password: "",
      });
      window.location.reload(); // replace with success prompt
    });
  };

  // DELETE USER
  const deleteUser = (id) => {
    AppUser.deleteAppUser(id).then((e) => {
      const { data } = e.data;
      console.log(data);
      window.location.reload(); // replace with success prompt
    });
  };

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  // UPDATE USER WHEN MODAL SUBMITTED
  const okEditModal = () => {
    setEditModalVisible(false);

    AppUser.updateAppUser(
      editUserInput.id,
      editUserInput.firstName,
      editUserInput.lastName,
      // editUserInput.email,
      editUserInput.mobileNo,
      editUserInput.address,
      editUserInput.birthDate,
      editUserInput.regionId,
      editUserInput.municipalityId,
      editUserInput.gender,
      editUserInput.password
    ).then((e) => {
      const { data } = e.data;
      console.log(data);
      setEditUserInput({
        firstName: "",
        lastName: "",
        // email: "",
        mobileNo: "",
        address: "",
        birthDate: "",
        gender: "",
        regionId: "",
        municipalityId: "",
        password: "",
      });
      window.location.reload(); // replace with success prompt
    });
  };

  // SETS VALUES OF CLICKED USER TO EDIT
  const handleUserEdit = (user) => {
    setEditUserInput({
      ...editUserInput,
      firstName: user.firstName,
      lastName: user.lastName,
      // email: "",
      mobileNo: user.mobileNumber,
      address: user.address,
      birthDate: user.birthday,
      gender: user.gender,
      // regionId: user.regionId,
      // regionId: "",
      // municipalityId: user.municipalityId,
      password: "",
      id: user.id,
    });

    openEditModal();
    console.log(user);
  };

  // ONCHANGE INPUT FOR ADD USER MODAL
  const onChange = (e) => {
    setModalInput({ ...modalInput, [e.target.name]: e.target.value });
  };

  // ONCHANGE INPUT FOR EDIT USER MODAL
  const editOnchange = (e) => {
    setEditUserInput({ ...editUserInput, [e.target.name]: e.target.value });
  };

  // TABLE DATA
  const tableSource = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      fixed: "left",
      align: "center",
      // width: 150,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      fixed: "left",
      align: "center",
      // width: 150,
    },
    // {
    //   title: "Email Address",
    //   dataIndex: "email",
    //   key: "email",
    //   align: "center",
    // },
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
      width: 200,
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
    // {
    //   title: "Password",
    //   key: "password",
    //   align: "center",
    //   render: (e, user) => (
    //     <Button
    //       style={{
    //         backgroundColor: "#3061c9",
    //         border: "none",
    //         color: "white",
    //         padding: 4,
    //         borderRadius: "5px",
    //         cursor: modalIsOpen ? "not-allowed" : "pointer",
    //       }}
    //       disabled={modalIsOpen}
    //       onClick={openPModal}
    //     >
    //       Generate
    //     </Button>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 180,
      render: (e, user) => {
        return (
          <div style={{ minWidth: "130px" }}>
            <Button
              onClick={() => handleUserEdit(user)}
              className="userEditBtn"
            >
              EDIT
            </Button>
            <Button onClick={() => deleteUser(user.id)} className="userDelBtn">
              DELETE
            </Button>
          </div>
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
              <SearchOutlined
                onClick={() => doSearch(searchInput)}
                style={{ fontSize: "24px", color: "gray" }}
              />
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
          ariaHideApp={false}
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
          contentLabel="Add User Modal"
          ariaHideApp={false}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
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
                {/* <Form.Item>
                  <h5>Email Address:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="email"
                    value={modalInput.email}
                    onChange={onChange}
                  />
                </Form.Item> */}
                <Form.Item>
                  <h5>Phone Number:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="mobileNo"
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
                  <Input
                    className="add-user-modal-input"
                    name="birthDate"
                    value={modalInput.birthDate}
                    onChange={onChange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Password:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="password"
                    value={modalInput.password}
                    onChange={onChange}
                  />
                </Form.Item>
              </div>
              <div className="bottom-inputs">
                <Form.Item>
                  <h5>Gender:</h5>
                  <select
                    value={modalInput.gender}
                    onChange={(e) =>
                      setModalInput({
                        ...modalInput,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="" selected disabled hidden>
                      Choose Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Form.Item>

                <Form.Item>
                  <h5>Region:</h5>
                  <select
                    value={modalInput.region}
                    onChange={(e) => handleSelect(e.target.value)}
                  >
                    <option value="" selected disabled hidden>
                      Choose Region
                    </option>
                    {regions.map((e, i) => (
                      <option key={i} value={e._id}>
                        {e.region}
                      </option>
                    ))}
                  </select>
                </Form.Item>
                <Form.Item>
                  <h5>Municipality:</h5>

                  <select
                    value={modalInput.municipality}
                    onChange={(e) =>
                      setModalInput({
                        ...modalInput,
                        municipalityId: e.target.value,
                      })
                    }
                  >
                    <option value="" selected disabled hidden>
                      Choose Municipality
                    </option>
                    {municipalities.map((e, i) => (
                      <option key={i} value={e._id}>
                        {e.municipality}
                      </option>
                    ))}
                  </select>
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

        {/* EDIT USER MODAL  */}
        <Modal
          isOpen={editModalVisible}
          onRequestClose={closeEditModal}
          style={editModalStyles}
          contentLabel="Add User Modal"
          ariaHideApp={false}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="add-user-modal-header">
              <h2>Update User</h2>{" "}
              <h2
                onClick={closeEditModal}
                className="add-user-modal-close-icon"
              >
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
                    value={editUserInput.firstName}
                    onChange={editOnchange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Last Name:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="lastName"
                    value={editUserInput.lastName}
                    onChange={editOnchange}
                  />
                </Form.Item>
                {/* <Form.Item>
                  <h5>Email Address:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="email"
                    value={modalInput.email}
                    onChange={onChange}
                  />
                </Form.Item> */}
                <Form.Item>
                  <h5>Phone Number:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="mobileNo"
                    value={editUserInput.mobileNo}
                    onChange={editOnchange}
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
                    value={editUserInput.address}
                    onChange={editOnchange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Birthday:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="birthDate"
                    value={editUserInput.birthDate}
                    onChange={editOnchange}
                  />
                </Form.Item>
                <Form.Item>
                  <h5>Password:</h5>
                  <Input
                    className="add-user-modal-input"
                    name="password"
                    placeholder="type new password"
                    value={editUserInput.password}
                    onChange={editOnchange}
                  />
                </Form.Item>
              </div>
              <div className="bottom-inputs">
                <Form.Item>
                  <h5>Gender:</h5>
                  <select
                    value={editUserInput.gender}
                    onChange={(e) =>
                      setEditUserInput({
                        ...editUserInput,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="" selected disabled hidden>
                      Choose Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Form.Item>

                <Form.Item>
                  <h5>Region:</h5>
                  <select
                    value={editUserInput.region}
                    onChange={(e) => handleEditSelect(e.target.value)}
                  >
                    <option value="" selected disabled hidden>
                      Choose Region
                    </option>
                    {regions.map((e, i) => (
                      <option key={i} value={e._id}>
                        {e.region}
                      </option>
                    ))}
                  </select>
                </Form.Item>
                <Form.Item>
                  <h5>Municipality:</h5>

                  <select
                    value={editUserInput.municipality}
                    onChange={(e) =>
                      setEditUserInput({
                        ...editUserInput,
                        municipalityId: e.target.value,
                      })
                    }
                  >
                    <option value="" selected disabled hidden>
                      Choose Municipality
                    </option>
                    {municipalities.map((e, i) => (
                      <option key={i} value={e._id}>
                        {e.municipality}
                      </option>
                    ))}
                  </select>
                </Form.Item>
              </div>
            </Form>
            <div style={{ padding: ".5rem 1rem" }}>
              <Button onClick={okEditModal} className="add-user-modal-button">
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

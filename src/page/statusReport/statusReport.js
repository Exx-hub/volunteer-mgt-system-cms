import React, { useEffect, useState } from "react";
import "./statusReport.css";
import { sampleUserData, modalStyles } from "./utils";

import { Layout, Row, Col, Button, Table, Form, Input, Dropdown } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Modal from "react-modal";

const { Content } = Layout;

function StatusReport() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(sampleUserData);
  const [records, setRecords] = useState([]);

  console.log(records);

  // HARD CODED WAY OF GETTING REGION THEN MUNICIPALITY
  const [selectedRegion, setSelectedRegion] = useState(null);
  console.log(selectedRegion);

  const [municipalities, setMunicipalities] = useState([]);
  console.log(municipalities);

  const handleSelect = (region) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    if (selectedRegion) {
      setMunicipalities(getMunicipalities(selectedRegion));
    }
  }, [selectedRegion]);

  // this is the backend api to get municipality depending on regions
  // service.getMunicipalities(region) to get municipalities of a region to
  // populate municipality select...get an array of municipalities
  const getMunicipalities = (e) => {
    if (e === "NCR") {
      return ["QC", "PASIG", "MANILA"];
    } else if (e === "CAT") {
      return ["BICOL", "NAGA", "CARAMOAN"];
    }
  };

  useEffect(() => {
    parseTableData();
  }, []);

  const parseTableData = () => {
    const record = data.map((e, i) => {
      //   console.log(e);
      return {
        key: i,
        region: e.region,
        municipalities: e.municipalities,
      };
    });
    setRecords(record);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const okModal = () => {
    setIsOpen(false);
    alert("call api to add region");
  };

  const tableSource = [
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      fixed: "left",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "left",
      align: "center",
      width: "50%",
      render: (e, record) => {
        // console.log(record);
        // console.log(record.key);
        // when button click pass key then modal display
        // municipalities using key
        return (
          <>
            <Button className="detailsButton">Details</Button>
            <Button className="editButton">Edit</Button>
            <Button className="deleteButton">Delete</Button>
          </>
        );
      },
    },
  ];

  return (
    <Layout className="statusPage__container">
      <Content className="statusPage__main">
        <Row className="statusPage__titleRow">
          <LeftOutlined className="back-icon" />
          <Col className="statusPage__title">STATUS REPORT</Col>
        </Row>
        <div className="statusPage__divider" />

        <Row>
          <Button onClick={openModal} className="statusPage__button">
            Add New Region & Municipality +
          </Button>
        </Row>
        <div>
          <Table
            rowKey={(e) => e.key}
            pagination={false}
            columns={tableSource}
            dataSource={records}
            className="region__table"
          />
        </div>
      </Content>

      {/* ADD REGION MODAL  */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Add Region Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="region-modal-header">
            <h2>Add New Region & Municipality</h2>{" "}
            <h2 className="region-modal-close-icon" onClick={closeModal}>
              X
            </h2>
          </div>

          <Form className="region-modal-form">
            <Form.Item>
              <h5>Region:</h5>
              <select onChange={(e) => handleSelect(e.target.value)}>
                {records.map((e, i) => (
                  <option value={e.region}>{e.region}</option>
                ))}
              </select>
            </Form.Item>
            <Form.Item>
              <h5>Municipality:</h5>
              <select>
                {municipalities.map((e, i) => (
                  <option>{e}</option>
                ))}
              </select>
            </Form.Item>
          </Form>
          <Button onClick={okModal} className="region-modal-button">
            Submit
          </Button>
        </div>
      </Modal>
    </Layout>
  );
}

export default StatusReport;

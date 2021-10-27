import React, { useEffect, useState } from "react";
import "./statusReport.css";
import { viewMuniModalStyles, modalStyles } from "./utils";

import { Layout, Row, Col, Button, Table, Form, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import Region from "../../service/Region";

const { Content } = Layout;

function StatusReport() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewMuniModalVisible, setViewMuniModalVisible] = useState(false);
  const [addMuniInput, setAddMuniInput] = useState({
    regionId: "",
    municipality: "",
  });

  // console.log(addMuniInput);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  // console.log(records);

  const [selectedRegion, setSelectedRegion] = useState(null);

  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]);
  console.log(selectedMunicipalities);

  // const handleSelect = (region) => {
  //   setSelectedRegion(region);
  // };

  useEffect(() => {
    Region.getRegionList().then((e) => {
      const { data } = e.data;
      // console.log(data);
      setData(data);
    });
  }, []);

  // PARSES RECORDS
  useEffect(() => {
    if (data.length > 0) {
      parseTableData();
    }
  }, [data]);

  const parseTableData = () => {
    const record = data.map((e, i) => {
      // console.log(e);
      return {
        key: i,
        id: e._id,
        region: e.region,
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
    console.log(addMuniInput);

    setAddMuniInput({
      regionId: "",
      municipality: "",
    });
  };

  const openViewModal = () => {
    setViewMuniModalVisible(true);
  };

  const closeViewModal = () => {
    setViewMuniModalVisible(false);
  };

  const getMunicipalitiesByRegionId = (id, name) => {
    // console.log(name);

    setSelectedRegion(name);

    Region.getMunicipalityByRegionId(id).then((e) => {
      const { data } = e.data;
      // console.log(data);

      setSelectedMunicipalities(data);
    });

    openViewModal(true);
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
        // or use selected region also
        return (
          <>
            <Button
              onClick={() =>
                getMunicipalitiesByRegionId(record.id, record.region)
              }
              className="detailsButton"
            >
              Details
            </Button>
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
          <LeftOutlined
            onClick={() => window.history.back()}
            className="back-icon"
          />
          <Col className="statusPage__title">STATUS REPORT</Col>
        </Row>
        <div className="statusPage__divider" />

        <Row>
          <Button onClick={openModal} className="statusPage__button">
            Add New Municipality +
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

      {/* ADD Municipality MODAL  */}
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Add Muni Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="region-modal-header">
            <h2>Add Municipality</h2>{" "}
            <h2 className="region-modal-close-icon" onClick={closeModal}>
              X
            </h2>
          </div>

          <Form className="region-modal-form">
            <Form.Item className="region-select-formItem">
              <h5>Region:</h5>
              <select
                value={addMuniInput.region}
                onChange={(e) =>
                  setAddMuniInput({
                    ...addMuniInput,
                    regionId: e.target.value,
                  })
                }
              >
                <option value="" selected disabled hidden>
                  Choose Region
                </option>
                {records.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.region}
                  </option>
                ))}
              </select>
            </Form.Item>
            <Form.Item>
              <h5>Municipality:</h5>
              <Input
                className="region-modal-input"
                value={addMuniInput.municipality}
                onChange={(e) =>
                  setAddMuniInput({
                    ...addMuniInput,
                    municipality: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
          <Button onClick={okModal} className="region-modal-button">
            Submit
          </Button>
        </div>
      </Modal>

      {/* MUNICIPALITY LIST MODAL  */}
      <Modal
        ariaHideApp={false}
        isOpen={viewMuniModalVisible}
        onRequestClose={closeViewModal}
        style={viewMuniModalStyles}
        contentLabel="Municipality List Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="muniList-modal-header">
            <h2>{selectedRegion}</h2>{" "}
            <h2 onClick={closeViewModal} className="muniList-modal-close-icon">
              X
            </h2>
          </div>
          <div>
            {selectedMunicipalities.map((e, i) => (
              <p className="muni-p" key={i}>
                {e.municipality}
              </p>
            ))}
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default StatusReport;

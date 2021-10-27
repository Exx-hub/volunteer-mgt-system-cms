import React, { useEffect, useState } from "react";
import "./regionalNews.css";
import { Layout, Row, Col, Button, Table, Form, Input } from "antd";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import {
  sampleUserData,
  sampleRegionData,
  addModalStyles,
  viewModalStyles,
} from "./utils";

const { Content } = Layout;
const { TextArea } = Input;

function RegionalNews() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [addNewsInput, setAddNewsInput] = useState({
    region: "",
    municipality: "",
    title: "",
    description: "",
  });

  // parses data when data is available
  useEffect(() => {
    // when component renders, call api to get users, then parse data into records array
    // to display in table
    // getAllUsers....

    // call this function when data is retrieved from backend api
    parseTableData();

    // get regions and municipalities from backend? now from hardcoded utils only
    setRegions(sampleRegionData);
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
        region: e.region,
        municipality: e.municipality,
        title: e.title,
        description: e.description,
      };
    });
    setRecords(record);
  };

  const [regions, setRegions] = useState([]);

  // HARD CODED WAY OF GETTING REGION THEN MUNICIPALITY
  const [selectedRegion, setSelectedRegion] = useState(null);

  const [municipalities, setMunicipalities] = useState([]);

  const handleSelect = (region) => {
    setAddNewsInput({ ...addNewsInput, region });
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const okModal = () => {
    //clear fields and state
    setAddNewsInput({
      region: "",
      municipality: "",
      title: "",
      description: "",
    });
    setIsOpen(false);
    // send values to backend to ADD news
    console.log("FROM ADD NEWS MODAL:", addNewsInput);
  };

  const openViewModal = () => {
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const handleModalChange = (e) => {
    setAddNewsInput({ ...addNewsInput, [e.target.name]: e.target.value });
  };

  const tableSource = [
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      fixed: "left",
      align: "center",
      width: 100,
    },
    {
      title: "Municipality",
      dataIndex: "municipality",
      key: "municipality",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },

    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 250,
      render: (e, newsItem) => (
        <>
          <Button className="editBtn">EDIT</Button>
          <Button className="deleteBtn">DELETE</Button>
          <Button onClick={openViewModal} className="viewBtn">
            VIEW
          </Button>
        </>
      ),
    },
  ];
  return (
    <Layout className="regionalNews__container">
      <Content className="regionalNews__main">
        <Row className="regionalNews__titleRow">
          <LeftOutlined
            onClick={() => window.history.back()}
            className="back__icon"
          />
          <Col className="regionalNews__title">REGIONAL NEWS</Col>
        </Row>
        <div className="regionalNews__divider" />

        <Row className="regionalNews__utils">
          <Button onClick={openModal} className="regionalNews__button">
            Add Regional News +
          </Button>
          <span className="regionalNews__utils--search">
            <SearchOutlined style={{ fontSize: "24px", color: "gray" }} />
            <Input
              className="search--input"
              placeholder="Search News"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </span>
        </Row>
        <div>
          <Table
            rowKey={(e) => e.key}
            pagination={false}
            columns={tableSource}
            dataSource={records}
            className="regionalNews__table"
          />
        </div>
      </Content>

      {/* ADD NEWS MODAL  */}
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={addModalStyles}
        contentLabel="Edit News Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="addNews-modal-header">
            <h2>News Details</h2>{" "}
            <h2 className="addNews-modal-close-icon" onClick={closeModal}>
              X
            </h2>
          </div>

          <Form className="addNews-modal-form">
            <div>
              <Form.Item>
                <h5>Region:</h5>
                <select
                  value={addNewsInput.region}
                  onChange={(e) => handleSelect(e.target.value)}
                >
                  <option value="" selected disabled hidden>
                    Choose Region
                  </option>
                  {regions.map((e, i) => (
                    <option value={e.region}>{e.region}</option>
                  ))}
                </select>
              </Form.Item>
              <Form.Item>
                <h5>Municipality:</h5>
                <select
                  value={addNewsInput.municipality}
                  onChange={(e) =>
                    setAddNewsInput({
                      ...addNewsInput,
                      municipality: e.target.value,
                    })
                  }
                >
                  <option value="" selected disabled hidden>
                    Choose Municipality
                  </option>
                  {municipalities.map((e, i) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
              </Form.Item>
            </div>

            <Form.Item>
              <h5>Title:</h5>
              <Input
                name="title"
                value={addNewsInput.title}
                onChange={(e) => handleModalChange(e)}
              />
            </Form.Item>

            <Form.Item>
              <h5>Description:</h5>
              <TextArea
                rows={4}
                name="description"
                value={addNewsInput.description}
                onChange={(e) => handleModalChange(e)}
              />
            </Form.Item>
          </Form>
          <Button onClick={okModal} className="addNews-modal-button">
            Submit
          </Button>
        </div>
      </Modal>

      {/* VIEW NEWS MODAL  */}
      <Modal
        ariaHideApp={false}
        isOpen={viewModalOpen}
        onRequestClose={closeViewModal}
        style={viewModalStyles}
        contentLabel="View News Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="region-modal-header">
            <h2>PREVIEW</h2>{" "}
            <h2 className="region-modal-close-icon" onClick={closeViewModal}>
              X
            </h2>
          </div>
          <div>
            <div>COVID PAWALA NA NGA BA</div>
            <div>
              Dolore nostrud incididunt anim labore sunt sint. Enim consequat
              cillum laboris ut dolore laborum in. Est exercitation ullamco sit
              ullamco ullamco sit duis. Commodo cillum dolore id pariatur qui
              consequat ut exercitation cupidatat ipsum ullamco.
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default RegionalNews;

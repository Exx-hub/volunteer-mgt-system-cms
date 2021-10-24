import React, { useEffect, useState } from "react";
import "./bulletin.css";
import { Layout, Row, Col, Button, Table, Form, Input } from "antd";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import {
  sampleUserData,
  sampleRegionData,
  announcementModalStyles,
  viewAnnouncementModalStyles,
} from "./utils";

const { Content } = Layout;
const { TextArea } = Input;

function Bulletin() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [addModalInput, setAddModalInput] = useState({
    title: "",
    category: "",
    region: "",
    municipality: "",
    description: "",
  });

  console.log(addModalInput);

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
        title: e.title,
        description: e.description,
        category: e.category,
      };
    });
    setRecords(record);
  };

  const [regions, setRegions] = useState([]);

  // HARD CODED WAY OF GETTING REGION THEN MUNICIPALITY
  const [selectedRegion, setSelectedRegion] = useState(null);

  const [municipalities, setMunicipalities] = useState([]);

  const handleModalInputChange = (e) => {
    setAddModalInput({ ...addModalInput, [e.target.name]: e.target.value });
  };

  const handleSelect = (region) => {
    setAddModalInput({ ...addModalInput, region });
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
    setAddModalInput({
      title: "",
      category: "",
      region: "",
      municipality: "",
      description: "",
    });
    setIsOpen(false);
    // send values to backend to ADD news
    console.log("FROM ADD MODAL:", addModalInput);
  };

  const openViewModal = () => {
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const okViewModal = () => {
    setViewModalOpen(false);
    alert("call api to add region");
  };

  const tableSource = [
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 250,
      render: (e, newsItem) => (
        <>
          <Button className="bulletin__editBtn">EDIT</Button>
          <Button className="bulletin__deleteBtn">DELETE</Button>
          <Button onClick={openViewModal} className="bulletin__viewBtn">
            VIEW
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout className="bulletin__container">
      <Content className="bulletin__main">
        <Row className="bulletin__titleRow">
          <LeftOutlined
            onClick={() => window.history.back()}
            className="back__icon"
          />
          <Col className="bulletin__title">BULLETIN MANAGEMENT</Col>
        </Row>
        <div className="bulletin__divider" />

        <Row className="bulletin__utils">
          <Button onClick={openModal} className="bulletin__button">
            Add Announcement for Events & Campaign +
          </Button>
          <span className="bulletin__utils--search">
            <SearchOutlined style={{ fontSize: "24px", color: "gray" }} />
            <Input
              className="bulletin__search--input"
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
            className="bulletin__table"
          />
        </div>
      </Content>

      {/* ADD ANNOUNCEMENT MODAL  */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={announcementModalStyles}
        contentLabel="Add Announcement Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="addAnnouncement-modal-header">
            <h2>Add Announcement</h2>{" "}
            <h2
              className="addAnnouncement-modal-close-icon"
              onClick={closeModal}
            >
              X
            </h2>
          </div>

          <Form className="addAnnouncement-modal-form">
            <div className="form-div">
              <Form.Item>
                <h5>Title:</h5>
                <Input
                  name="title"
                  value={addModalInput.title}
                  onChange={(e) => handleModalInputChange(e)}
                />
              </Form.Item>
              <Form.Item>
                <h5>Category:</h5>
                <select
                  value={addModalInput.category}
                  onChange={(e) =>
                    setAddModalInput({
                      ...addModalInput,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="" selected disabled hidden>
                    Choose Category
                  </option>
                  <option value="nationwide">Nationwide</option>
                  <option value="regional">Regional</option>
                </select>
              </Form.Item>
            </div>

            <div className="form-div">
              <Form.Item>
                <h5>Region:</h5>
                <select
                  value={addModalInput.region}
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
                  value={addModalInput.municipality}
                  onChange={(e) =>
                    setAddModalInput({
                      ...addModalInput,
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

            <Form.Item className="textarea-div">
              <h5>Description:</h5>
              <TextArea
                rows={4}
                name="description"
                value={addModalInput.description}
                onChange={(e) => handleModalInputChange(e)}
              />
            </Form.Item>
          </Form>
          <Button onClick={okModal} className="addAnnouncement-modal-button">
            Submit
          </Button>
        </div>
      </Modal>

      {/* VIEW ANNOUNCEMENT MODAL  */}
      <Modal
        isOpen={viewModalOpen}
        onRequestClose={closeViewModal}
        style={viewAnnouncementModalStyles}
        contentLabel="View Announcement Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="addAnnouncement-modal-header">
            <h2>PREVIEW</h2>{" "}
            <h2
              className="addAnnouncement-modal-close-icon"
              onClick={closeViewModal}
            >
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

export default Bulletin;

import React, { useEffect, useState } from "react";
import "./regionalNews.css";
import { Layout, Row, Col, Button, Table, Form, Input } from "antd";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { addModalStyles, viewModalStyles, editModalStyles } from "./utils";
import News from "../../service/News";
import Region from "../../service/Region";

const { Content } = Layout;
const { TextArea } = Input;

function RegionalNews() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [addNewsInput, setAddNewsInput] = useState({
    regionId: "",
    municipalityId: "",
    headline: "",
    description: "",
  });

  // console.log(addNewsInput);

  const [municipalities, setMunicipalities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [regions, setRegions] = useState([]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editNewsInput, setEditNewsInput] = useState({
    regionId: "",
    municipalityId: "",
    headline: "",
    description: "",
  });

  // console.log("EDIT NEWS INPUT:", editNewsInput);

  // console.log(selectedRegion);

  // GET NEWS LIST WHEN COMPONENT MOUNTS
  useEffect(() => {
    News.getAllNews().then((e) => {
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

  useEffect(() => {
    if (data.length > 0) {
      parseTableData();
    }
  }, [data]);

  // parses data saved in DATA state
  const parseTableData = () => {
    const record = data.map((e, i) => {
      // console.log(e);
      return {
        key: i,
        id: e._id,
        region: e.region,
        regionId: e.regionId,
        municipality: e.municipality,
        municipalityId: e.municipalityId,
        headline: e.headline,
        description: e.description,
      };
    });
    setRecords(record);
  };

  const handleSelect = (regionId) => {
    setAddNewsInput({ ...addNewsInput, regionId });
    setSelectedRegion(regionId);
  };

  // SETS REGION FOR GETTING MUNICIPALITIES FOR EDIT USER
  const handleEditSelect = (regionId) => {
    setEditNewsInput({ ...editNewsInput, regionId });
    setSelectedRegion(regionId);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // ADD NEWS WHEN MODAL IS SUBMITTED
  const okModal = () => {
    setIsOpen(false);
    console.log("FROM ADD NEWS MODAL:", addNewsInput);

    News.addNews(
      addNewsInput.headline,
      addNewsInput.description,
      addNewsInput.regionId,
      addNewsInput.municipalityId
    ).then((e) => {
      const { data } = e.data;
      console.log(data);

      //clear fields and state
      setAddNewsInput({
        regionId: "",
        municipality: "",
        headline: "",
        description: "",
      });

      window.location.reload(); // replace with success prompt
    });
  };

  const [preview, setPreview] = useState({
    headline: "",
    description: "",
  });

  const openViewModal = (item) => {
    setViewModalOpen(true);

    console.log(item);

    setPreview({
      headline: item.headline,
      description: item.description,
    });
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setPreview({
      headline: "",
      description: "",
    });
  };

  const handleModalChange = (e) => {
    setAddNewsInput({ ...addNewsInput, [e.target.name]: e.target.value });
  };

  const handleEditModalChange = (e) => {
    setEditNewsInput({ ...editNewsInput, [e.target.name]: e.target.value });
  };

  const handleDeleteNews = (id) => {
    console.log(id);

    News.deleteNews(id).then((e) => {
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

  // UPDATE NEWS WHEN MODAL SUBMITTED
  const okEditModal = () => {
    setEditModalVisible(false);
    console.log("OK EDIT");
    News.updateNews(
      editNewsInput.id,
      editNewsInput.headline,
      editNewsInput.description,
      editNewsInput.regionId,
      editNewsInput.municipalityId
    ).then((e) => {
      const { data } = e.data;
      console.log(data);

      //clear fields and state
      setAddNewsInput({
        regionId: "",
        municipality: "",
        headline: "",
        description: "",
      });

      window.location.reload(); // replace with success prompt
    });
  };

  // SETS VALUES OF CLICKED NEWS TO EDIT
  const handleNewsEdit = (newsItem) => {
    setEditNewsInput({
      ...editNewsInput,
      // regionId: newsItem.region,
      // municipalityId: user.municipalityId,
      headline: newsItem.headline,
      description: newsItem.description,
      id: newsItem.id,
    });
    openEditModal();
    console.log(newsItem);
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
      title: "Headline",
      dataIndex: "headline",
      key: "headline",
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
          <Button onClick={() => handleNewsEdit(newsItem)} className="editBtn">
            EDIT
          </Button>
          <Button
            onClick={() => handleDeleteNews(newsItem.id)}
            className="deleteBtn"
          >
            DELETE
          </Button>
          <Button onClick={() => openViewModal(newsItem)} className="viewBtn">
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
        contentLabel="Add News Modal"
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
                  value={addNewsInput.regionId}
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
                  value={addNewsInput.municipalityId}
                  onChange={(e) =>
                    setAddNewsInput({
                      ...addNewsInput,
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

            <Form.Item>
              <h5>Headline:</h5>
              <Input
                name="headline"
                value={addNewsInput.headline}
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

      {/* EDIT NEWS MODAL  */}
      <Modal
        ariaHideApp={false}
        isOpen={editModalVisible}
        onRequestClose={closeEditModal}
        style={editModalStyles}
        contentLabel="Edit News Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="addNews-modal-header">
            <h2>Edit News</h2>{" "}
            <h2 className="addNews-modal-close-icon" onClick={closeEditModal}>
              X
            </h2>
          </div>

          <Form className="addNews-modal-form">
            <div>
              <Form.Item>
                <h5>Region:</h5>
                <select
                  value={editNewsInput.regionId}
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
                  value={editNewsInput.municipalityId}
                  onChange={(e) =>
                    setEditNewsInput({
                      ...editNewsInput,
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

            <Form.Item>
              <h5>Headline:</h5>
              <Input
                name="headline"
                value={editNewsInput.headline}
                onChange={(e) => handleEditModalChange(e)}
              />
            </Form.Item>

            <Form.Item>
              <h5>Description:</h5>
              <TextArea
                rows={4}
                name="description"
                value={editNewsInput.description}
                onChange={(e) => handleEditModalChange(e)}
              />
            </Form.Item>
          </Form>
          <Button onClick={okEditModal} className="addNews-modal-button">
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
          <div className="viewNews-modal-header">
            <h2>PREVIEW</h2>{" "}
            <h2 className="viewNews-modal-close-icon" onClick={closeViewModal}>
              X
            </h2>
          </div>
          <div className="viewNews-modal-body">
            <div className="viewNews-modal-headline">{preview.headline}</div>
            <div className="viewNews-modal-desc">{preview.description}</div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default RegionalNews;

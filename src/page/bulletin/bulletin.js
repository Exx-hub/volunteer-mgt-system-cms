import React, { useEffect, useState } from "react";
import "./bulletin.css";
import { Layout, Row, Col, Button, Table, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import {
  announcementModalStyles,
  viewAnnouncementModalStyles,
  editAnnouncementModalStyles,
} from "./utils";
import BulletinService from "../../service/Bulletin";
import Region from "../../service/Region";
import Alert from "react-s-alert";

const { Content } = Layout;
const { TextArea } = Input;

function Bulletin() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [addModalInput, setAddModalInput] = useState({
    title: "",
    category: "",
    regionId: "",
    description: "",
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editModalInput, setEditModalInput] = useState({
    title: "",
    category: "",
    regionId: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [regions, setRegions] = useState([]);
  const [preview, setPreview] = useState({
    title: "",
    description: "",
  });

  console.log(editModalInput);

  console.log(addModalInput);

  // parses data when data is available
  useEffect(() => {
    BulletinService.getAllBulletin().then((e) => {
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

  // PARSES RECORDS
  useEffect(() => {
    if (data.length > 0 || searchInput === "") {
      parseTableData();
    }
  }, [data, searchInput]);

  // parses data from backend
  const parseTableData = () => {
    const record = data.map((e, i) => {
      // console.log(e);
      return {
        key: i,
        id: e._id,
        regionId: e.regionId,
        title: e.title,
        description: e.description,
        category: e.isRegional === 0 ? "Nationwide" : "Regional",
      };
    });
    setRecords(record);
  };

  // FILTER TABLE DATA WHEN SEARCH IS CLICKED
  const doSearch = (text) => {
    const filtered = records.filter((record) => {
      return (
        record.title.toLowerCase().includes(text) ||
        record.title.toUpperCase().includes(text)
      );
    });

    setRecords(filtered);
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      doSearch(searchInput);
    }
  };

  const handleModalInputChange = (e) => {
    setAddModalInput({ ...addModalInput, [e.target.name]: e.target.value });
  };

  const handleEditModalInputChange = (e) => {
    setEditModalInput({ ...editModalInput, [e.target.name]: e.target.value });
  };

  const handleSelect = (regionId) => {
    setAddModalInput({ ...addModalInput, regionId });
    // setSelectedRegion(regionId);
  };

  const handleEditSelect = (regionId) => {
    setEditModalInput({ ...editModalInput, regionId });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);

    setAddModalInput({
      title: "",
      category: "",
      region: "",
      description: "",
    });
  };

  // ADD BULLETIN
  const okModal = () => {
    setIsOpen(false);

    console.log("FROM ADD MODAL:", addModalInput);

    BulletinService.addBulletin(
      addModalInput.title,
      addModalInput.description,
      addModalInput.category,
      addModalInput.regionId
    ).then((e) => {
      const { data } = e.data;
      console.log(data);

      setAddModalInput({
        title: "",
        category: "",
        region: "",
        description: "",
      });

      Alert.success("Successfully added bulletin", {
        position: "top-right",
        effect: "slide",
        timeout: 3000,
      });

      BulletinService.getAllBulletin().then((e) => {
        const { data } = e.data;
        // console.log(data);
        setData(data);
      });
    });
  };

  // DELETE BULLETIN
  const deleteBulletinById = (id) => {
    BulletinService.deleteBulletin(id).then((e) => {
      const { data } = e.data;

      Alert.success("Successfully deleted bulletin", {
        position: "top-right",
        effect: "slide",
        timeout: 3000,
      });

      BulletinService.getAllBulletin().then((e) => {
        const { data } = e.data;
        // console.log(data);
        setData(data);
      });
    });
  };

  const openViewModal = (item) => {
    setViewModalOpen(true);

    setPreview({
      title: item.title,
      description: item.description,
    });
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  // SETS VALUES OF CLICKED ITEM TO EDIT
  const handleItemEdit = (item) => {
    setEditModalInput({
      ...editModalInput,
      title: item.title,
      description: item.description,
      category: "",
      regionId: "",
      id: item.id,
    });

    openEditModal();
    console.log(item);
  };

  // UPDATE BULLETIN
  const okEditModal = () => {
    setEditModalVisible(false);
    console.log(editModalInput);

    BulletinService.updateBulletin(
      editModalInput.id,
      editModalInput.title,
      editModalInput.description,
      editModalInput.category,
      editModalInput.regionId
    ).then((e) => {
      const { data } = e.data;

      console.log(data);

      setEditModalInput({
        title: "",
        category: "",
        regionId: "",
        description: "",
      });

      Alert.success("Successfully updated bulletin", {
        position: "top-right",
        effect: "slide",
        timeout: 3000,
      });

      BulletinService.getAllBulletin().then((e) => {
        const { data } = e.data;
        // console.log(data);
        setData(data);
      });
    });
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
      render: (e, bulletinItem) => (
        <>
          <Button
            onClick={() => handleItemEdit(bulletinItem)}
            className="bulletin__editBtn"
          >
            EDIT
          </Button>
          <Button
            onClick={() => deleteBulletinById(bulletinItem.id)}
            className="bulletin__deleteBtn"
          >
            DELETE
          </Button>
          <Button
            onClick={() => openViewModal(bulletinItem)}
            className="bulletin__viewBtn"
          >
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
          <Col className="bulletin__title">BULLETIN MANAGEMENT</Col>
        </Row>
        <div className="bulletin__divider" />

        <Row className="bulletin__utils">
          <Button onClick={openModal} className="bulletin__button">
            Add Announcement for Events & Campaign +
          </Button>
          <span className="bulletin__utils--search">
            <SearchOutlined
              onClick={() => doSearch(searchInput)}
              style={{ fontSize: "24px", color: "gray" }}
            />
            <Input
              className="bulletin__search--input"
              placeholder="Search By Title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => handleKeypress(e)}
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
        ariaHideApp={false}
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
              <Form.Item>
                <h5>Region:</h5>
                <select
                  disabled={
                    addModalInput.category === "nationwide" ||
                    !addModalInput.category
                  }
                  value={addModalInput.regionId}
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
            </div>

            <Form.Item className="textarea-div">
              <h5>Description:</h5>
              <TextArea
                rows={10}
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
        ariaHideApp={false}
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
          <div className="viewBulletin-modal-header">
            <h2>PREVIEW</h2>{" "}
            <h2
              className="viewBulletin-modal-close-icon"
              onClick={closeViewModal}
            >
              X
            </h2>
          </div>
          <div>
            <div className="viewBulletin-modal-body">
              <div className="viewBulletin-modal-headline">{preview.title}</div>
              <div className="viewBulletin-modal-desc">
                {preview.description}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* EDIT ANNOUNCEMENT MODAL */}
      <Modal
        ariaHideApp={false}
        isOpen={editModalVisible}
        onRequestClose={closeEditModal}
        style={editAnnouncementModalStyles}
        contentLabel="Edit Announcement Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="addAnnouncement-modal-header">
            <h2>Edit Announcement</h2>{" "}
            <h2
              className="addAnnouncement-modal-close-icon"
              onClick={closeEditModal}
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
                  value={editModalInput.title}
                  onChange={(e) => handleEditModalInputChange(e)}
                />
              </Form.Item>
              <Form.Item>
                <h5>Category:</h5>
                <select
                  value={editModalInput.category}
                  onChange={(e) =>
                    setEditModalInput({
                      ...editModalInput,
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
              <Form.Item>
                <h5>Region:</h5>
                <select
                  disabled={
                    editModalInput.category === "nationwide" ||
                    !editModalInput.category
                  }
                  value={editModalInput.regionId}
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
            </div>

            <Form.Item className="textarea-div">
              <h5>Description:</h5>
              <TextArea
                rows={10}
                name="description"
                value={editModalInput.description}
                onChange={(e) => handleEditModalInputChange(e)}
              />
            </Form.Item>
          </Form>
          <Button
            onClick={okEditModal}
            className="addAnnouncement-modal-button"
          >
            Submit
          </Button>
        </div>
      </Modal>
    </Layout>
  );
}

export default Bulletin;

import React, { useEffect, useState } from "react";
import "./about.css";
import { Layout, Row, Col, Button, Table, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { addAboutTextStyles, aboutDescription } from "./utils";

const { Content } = Layout;
const { TextArea } = Input;

function About() {
  const [aboutText, setAboutText] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [textareaInput, setTextAreaInput] = useState("");

  useEffect(() => {
    // get description from backend here api call
    setAboutText(aboutDescription);
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const okModal = () => {
    setTextAreaInput("");
    setIsOpen(false);
    // send values to backend to ADD news
    console.log("FROM MODAL:", textareaInput);
  };
  return (
    <Layout className="about__container">
      <Content className="about__main">
        <Row className="about__titleRow">
          <Col className="about__title">BONG BONG MARCOS</Col>
        </Row>
        <div className="about__divider" />

        <div className="about__templateContainer">
          <div className="about__template">
            <Button className="about__button" onClick={openModal}>
              {" "}
              <EditOutlined
                style={{ fontSize: "20px", marginRight: "8px" }}
              />{" "}
              Add New Text
            </Button>
            <p className="about__text">{aboutText}</p>
          </div>
        </div>
      </Content>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={addAboutTextStyles}
        contentLabel="Add Announcement Modal"
      >
        <div
          className="modal__div"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="addAboutText-modal-header">
            <h2>Add New Text</h2>{" "}
            <h2 className="addAboutText-modal-close-icon" onClick={closeModal}>
              X
            </h2>
          </div>

          <Form className="addAboutText-modal-form">
            <Form.Item className="textarea-div">
              <h5>Text:</h5>
              <TextArea
                rows={10}
                name="text"
                allowClear
                value={textareaInput}
                onChange={(e) => setTextAreaInput(e.target.value)}
              />
            </Form.Item>
          </Form>

          <Button onClick={okModal} className="addAboutText-modal-button">
            Submit
          </Button>
        </div>
      </Modal>
    </Layout>
  );
}

export default About;

import React, { useEffect, useState } from "react";
import "./about.css";
import { Layout, Row, Col, Button, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { addAboutTextStyles } from "./utils";
import AboutService from "../../service/About";
import Alert from "react-s-alert";

const { Content } = Layout;
const { TextArea } = Input;

function About() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [textareaInput, setTextAreaInput] = useState("");
  const [data, setData] = useState([]);
  const [aboutDetails, setAboutDetails] = useState([]);

  const aboutDeets = aboutDetails[0];

  console.log(aboutDeets);

  useEffect(() => {
    AboutService.getAboutInfo().then((e) => {
      const { data } = e.data;

      setData(data);
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      parseData();
    }
  }, [data]);

  const parseData = () => {
    const record = data.map((e, i) => {
      return {
        key: i,
        id: e._id,
        text: e.details,
      };
    });

    setAboutDetails(record);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const okModal = () => {
    setIsOpen(false);
    console.log("FROM MODAL:", textareaInput);

    AboutService.updateAboutInfo(aboutDeets.id, textareaInput).then((e) => {
      const { data } = e;
      console.log(data);

      setTextAreaInput("");

      Alert.success("Successfully updated About", {
        position: "top-right",
        effect: "slide",
        timeout: 3000,
      });

      AboutService.getAboutInfo().then((e) => {
        const { data } = e.data;
        console.log(data);

        setData(data);
      });
    });
  };

  const truncateString = (text) => {
    if (text.length > 450) {
      return text.slice(0, 450) + "....";
    }

    return text;
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
              Update Text
            </Button>
            {aboutDetails.length > 0 && (
              <p className="about__text">{truncateString(aboutDeets.text)}</p>
            )}
          </div>
        </div>
      </Content>

      <Modal
        ariaHideApp={false}
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
                // maxLength={150}
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

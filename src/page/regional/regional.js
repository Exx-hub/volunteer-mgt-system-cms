import React from "react";
import "./regional.css";

import statusCropped from "../../assets/images/statusCropped.png";
import regionalCropped from "../../assets/images/regionalCropped.png";

import { Layout, Row, Col, Image } from "antd";
import { useHistory } from "react-router";
const { Content } = Layout;

function Regional() {
  const history = useHistory();
  return (
    <Layout className="regional__container">
      <Content className="regional__main">
        <Row>
          <Col className="regional__title">REGIONAL MANAGEMENT</Col>
        </Row>
        <div className="regional__divider" />

        <div className="regional__imageButtons--container">
          <Image
            onClick={() => history.push("/home/status")}
            src={statusCropped}
            alt=""
          />
          <Image
            onClick={() => history.push("/home/news")}
            src={regionalCropped}
            alt=""
          />
        </div>
      </Content>
    </Layout>
  );
}

export default Regional;

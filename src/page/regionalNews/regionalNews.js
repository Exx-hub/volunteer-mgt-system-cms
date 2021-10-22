import React, { useEffect, useState } from "react";
import "./regionalNews.css";
import { Layout, Row, Col, Button, Table, Form, Input } from "antd";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import Modal from "react-modal";

const { Content } = Layout;

function RegionalNews() {
  const [modalIsOpen, setIsOpen] = useState(false);
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
      render: (e, newsItem) => (
        <>
          <Button>EDIT</Button>
          <Button>DELETE</Button>
          <Button>VIEW</Button>
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
              // value={searchInput}
              // onChange={(e) => setSearchInput(e.target.value)}
            />
          </span>
        </Row>
        <div>
          <Table
            rowKey={(e) => e.key}
            pagination={false}
            columns={tableSource}
            // dataSource={records}
            className="regionalNews__table"
          />
        </div>
      </Content>
    </Layout>
  );
}

export default RegionalNews;

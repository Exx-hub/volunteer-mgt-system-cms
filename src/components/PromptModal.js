import React from "react";
import Modal from "react-modal";
import { Button } from "antd";
import "./promptModal.css";

const modalStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    width: "500px",
    borderRadius: "12px",
    // minWidth: "900px",
  },
};

function PromptModal(props) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.visible}
      onRequestClose={props.closeModal}
      style={modalStyles}
      contentLabel={props.contentLabel}
    >
      <div
        className="modal-div"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="modal-header">
          <h2>{props.headerTitle}</h2>{" "}
          <h2 className="modal-close-icon" onClick={props.closeModal}>
            X
          </h2>
        </div>

        <div className="modal-message-div">
          <p className="modal-message">{props.confirmMessage}</p>
        </div>
        <div className="modal-button-div">
          <Button className="modal-okBtn" onClick={props.onOk}>
            {props.buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default PromptModal;

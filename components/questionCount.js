import React from "react";
import {useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {isMobile} from "react-device-detect";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import Modal from "react-bootstrap/Modal";

function QuestionCount(props) {
  const [show, setShow] = useState(false);
  const [displayUnsure] = useState(props.display);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <h2 className="questionCount">
      <span>{props.counter + 1}</span>/<span>{props.total}</span>
      {!isMobile && (
        <span className="col-sm-12 text-right" style={{marginLeft: "14rem"}}>
          <button
            type="button"
            onClick={handleShow}
            className="btn btn-warning"
            style={{
              color: "white",
              fontSize: "14px",
              backgroundColor: "#18A0FB",
              borderWidth: 0,
              marginBottom: 2,
              marginTop: 0,
            }}
          >
            Keyboard Shortcuts
          </button>
        </span>
      )}
      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize: "16px", fontWeight: "bold"}}>
            Keyboard Shortcuts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{height: "150px", overflowY: "auto", color: "gray", padding: "22px"}}
        >
          <Button className="yes actionButton" style={{width: "120px"}}>
            Yes
          </Button>
          <Button
            style={{
              width: "50px",
              backgroundColor: "gray",
              border: 0,
              marginLeft: "60px",
            }}
          >
            <ArrowUpwardRoundedIcon />
          </Button>
          <br />
          <br />
          <Button className="no actionButton" style={{width: "120px"}}>
            No
          </Button>
          <Button
            style={{
              width: "50px",
              backgroundColor: "gray",
              border: 0,
              marginLeft: "60px",
            }}
          >
            <ArrowDownwardRoundedIcon />
          </Button>
          <br />
          <br />
          {displayUnsure && (
            <>
              <Button className="maybe actionButton" style={{width: "120px"}}>
                Unsure
              </Button>
              <Button
                style={{
                  width: "50px",
                  backgroundColor: "gray",
                  border: 0,
                  marginLeft: "60px",
                }}
              >
                <ArrowBackRoundedIcon />
              </Button>
              <br />
              <br />
            </>
          )}
          <Button className="actionButton" style={{width: "120px"}}>
            Next
          </Button>
          <Button
            style={{
              width: "50px",
              backgroundColor: "gray",
              border: 0,
              marginLeft: "60px",
            }}
          >
            <ArrowForwardRoundedIcon />
          </Button>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </h2>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default QuestionCount;

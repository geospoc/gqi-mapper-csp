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
        <>
          <button
            type="button"
            onClick={handleShow}
            className="btn btn-warning float-right"
            style={{
              color: "white",
              fontSize: "14px",
              backgroundColor: "#18A0FB",
              borderWidth: 0,
            }}
          >
            Keyboard Shortcuts
          </button>
          <Modal size="sm" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{fontSize: "16px", fontWeight: "bold"}}>
                Keyboard Shortcuts
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color: "gray", padding: "22px"}}>
              <Button
                className="yes actionButton"
                variant="outline-primary"
                style={{width: "120px"}}
              >
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
              <Button
                className="no actionButton"
                variant="outline-primary"
                style={{width: "120px"}}
              >
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
                  <Button
                    className="maybe actionButton"
                    variant="outline-primary"
                    style={{width: "120px"}}
                  >
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
              <Button
                className="actionButton"
                variant="outline-primary"
                style={{width: "120px"}}
              >
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
              <Button
                variant="primary"
                onClick={handleClose}
                style={{margin: 0, padding: 8}}
              >
                Okay
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </h2>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default QuestionCount;

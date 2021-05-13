import React, {useState} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import Modal from "react-bootstrap/Modal";
import {Row, Col, Button} from "react-bootstrap";
import ProgressBar from "./progressBar";
import QuestionCount from "./questionCount";
import Layout from "./layout";
import CountryNameLabel from "./countryNameLabel";

const MapComponent = dynamic(import("./mapComponent"), {
  ssr: false,
});

const countryCodes = require("../data/countries.json");

export default function Quiz(props) {
  const [next, setNext] = useState(false);
  const [yes] = useState("outline-primary");
  const [no] = useState("outline-primary");
  const [maybe] = useState("outline-primary");
  const [result, setResult] = useState(false);
  const [answer, setAnswer] = useState({answer: "", answerClass: "answerHidden"});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeys);

    // cleanup this component
    return () => {
      document.removeEventListener("keydown", handleKeys);
    };
  }, []);

  function getClassNameMaintainingFirstElement(e, replacement) {
    let firstClassName = e.classList[0];
    return `${firstClassName} ${replacement}`;
  }

  function handleClick(e, value) {
    let buttons = document.getElementsByClassName("actionButton");
    for (let button of buttons) {
      button.className = getClassNameMaintainingFirstElement(
        button,
        "actionButton btn btn-outline-primary"
      );
    }
    e.target.className = getClassNameMaintainingFirstElement(
      e.target,
      "actionButton btn btn-primary"
    );
    let resultValue = {school_id: props.question.school_id, answer: value};
    props.onAnswerSelected(resultValue);
    setResult(resultValue);
    setNext(true);
  }

  function handleNext() {
    let buttons = document.getElementsByClassName("actionButton");
    for (let button of buttons) {
      button.className = getClassNameMaintainingFirstElement(
        button,
        "actionButton btn btn-outline-primary"
      );
    }
    setNext(false);
    setAnswer({answer: "", answerClass: "answerHidden"});
    props.onNextSelected();
  }

  function handleKeys(e) {
    e.keyCode == "38" && document.querySelectorAll(".btn-outline-primary")[0].click();
    e.keyCode == "40" && document.querySelectorAll(".btn-outline-primary")[1].click();
    e.keyCode == "37" && document.querySelector("#unsureButton").click();
    e.keyCode == "39" && document.querySelector("#nextButton").click();
  }

  const answerClass = "answer " + answer.answerClass;
  const countryName = countryCodes[props.question.country_code];
  return (
    <Layout myClass="quiz">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-right">
            <button
              type="button"
              onClick={handleShow}
              className="btn btn-warning"
              style={{
                color: "white",
                fontSize: "14px",
                backgroundColor: "#18A0FB",
                borderWidth: 0,
                marginTop: 3,
              }}
            >
              Keyboard Shortcuts
            </button>
          </div>
        </div>
      </div>

      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize: "16px", fontWeight: "bold"}}>
            Keyboard Shortcuts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{height: "150px", overflowY: "auto", color: "gray", padding: "22px"}}
        >
          <Button
            className="yes actionButton"
            style={{width: "120px"}}
            variant={yes}
            disabled={next}
          >
            Yes
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <Button style={{width: "50px", backgroundColor: "gray", border: 0}}>
            <ArrowUpwardRoundedIcon />
          </Button>
          <br />
          <br />
          <Button
            className="no actionButton"
            style={{width: "120px"}}
            variant={yes}
            disabled={next}
          >
            No
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <Button style={{width: "50px", backgroundColor: "gray", border: 0}}>
            <ArrowDownwardRoundedIcon />
          </Button>
          <br />
          <br />
          <Button
            className="maybe actionButton"
            style={{width: "120px"}}
            variant={yes}
            disabled={next}
          >
            Unsure
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <Button style={{width: "50px", backgroundColor: "gray", border: 0}}>
            <ArrowBackRoundedIcon />
          </Button>
          <br />
          <br />
          <Button
            className="actionButton"
            style={{width: "120px"}}
            variant={yes}
            disabled={next}
          >
            Next
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <Button style={{width: "50px", backgroundColor: "gray", border: 0}}>
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

      <main>
        <QuestionCount counter={props.counter} total={props.questionTotal} />
        <p>Does this location look like a school?</p>

        <div className="row no-gutters align-items-center mapdiv">
          <MapComponent lat={props.question.lat} lon={props.question.lon} />
          <CountryNameLabel countryName={countryName} />
          <div className={answerClass}>{answer["answer"]}</div>
        </div>
        <div>
          <Row className="pt-3 pl-0">
            <Col xs={4} className="pr-1">
              <Button
                className="yes actionButton"
                variant={yes}
                disabled={next}
                onClick={(e) => handleClick(e, "yes")}
              >
                Yes
              </Button>
            </Col>
            <Col xs={4} className="pl-2 pr-2">
              <Button
                className="no actionButton"
                variant={no}
                disabled={next}
                onClick={(e) => handleClick(e, "no")}
              >
                No
              </Button>
            </Col>
            <Col xs={4} className="pl-1">
              <Button
                className="maybe actionButton"
                variant={maybe}
                disabled={next}
                id="unsureButton"
                onClick={(e) => handleClick(e, "maybe")}
              >
                Unsure
              </Button>
            </Col>
          </Row>
        </div>
      </main>

      <footer className="mt-auto next-section">
        {next ? (
          <div className="pb-2">
            <ProgressBar
              label="Yes"
              chosen={result.answer == "yes"}
              answer={result.answer}
              value={
                ((props.locationResults.yes_count + (result.answer == "yes" ? 1 : 0)) /
                  (props.locationResults.total_count + 1)) *
                100
              }
            />
            <ProgressBar
              label="No"
              chosen={result.answer == "no"}
              answer={result.answer}
              value={
                ((props.locationResults.no_count + (result.answer == "no" ? 1 : 0)) /
                  (props.locationResults.total_count + 1)) *
                100
              }
            />
            <ProgressBar
              label="Unsure"
              chosen={result.answer == "maybe"}
              answer={result.answer}
              value={
                ((props.locationResults.maybe_count +
                  (result.answer == "maybe" ? 1 : 0)) /
                  (props.locationResults.total_count + 1)) *
                100
              }
            />
          </div>
        ) : (
          ""
        )}
        <Button variant="primary" onClick={handleNext} disabled={!next} id="nextButton">
          <span>
            NEXT
            <img className="white" src="/white.svg" />
          </span>
        </Button>
      </footer>
    </Layout>
  );
}

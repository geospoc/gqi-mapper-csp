import React, {useState} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
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
    e.keyCode == "38" && document.querySelector("#yesButton").click();
    e.keyCode == "40" && document.querySelector("#noButton").click();
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

      <main>
        <QuestionCount
          counter={props.counter}
          total={props.questionTotal}
          display={true}
        />
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
                id="yesButton"
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
                id="noButton"
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

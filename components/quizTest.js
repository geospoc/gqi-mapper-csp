import React, {useState} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {Row, Col, Button} from "react-bootstrap";

import QuestionCount from "./questionCount";
import Layout from "./layout";
import CountryNameLabel from "./countryNameLabel";

const countryCodes = require("../data/countries.json");

const MapComponent = dynamic(import("./mapComponent"), {
  ssr: false,
});

export default function QuizTest(props) {
  const [next, setNext] = useState(false);
  const [yes, setYes] = useState("outline-primary");
  const [yesClass, setYesClass] = useState("yes testButton");
  const [no, setNo] = useState("outline-primary");
  const [noClass, setNoClass] = useState("no testButton");
  const [result, setResult] = useState(false);
  const [answer, setAnswer] = useState({answer: "", answerClass: "answerHidden"});

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeys);

    // cleanup this component
    return () => {
      document.removeEventListener("keydown", handleKeys);
    };
  }, []);

  function handleClick(e, value) {
    if (value === props.question.answer) {
      if (value === true) {
        setYes("success");
        setYesClass("testButton btn-success");
        setAnswer({answer: "Correct answer", answerClass: "answerCorrect"});
      } else {
        setNo("success");
        setNoClass("testButton btn-success");
        setAnswer({answer: "Correct answer", answerClass: "answerCorrect"});
      }
      setResult(true);
    } else {
      if (value === true) {
        setYes("danger");
        setYesClass("testButton btn-danger");
        setAnswer({answer: "Incorrect answer", answerClass: "answerIncorrect"});
      } else {
        setNo("danger");
        setNoClass("testButton btn-danger");
        setAnswer({answer: "Incorrect answer", answerClass: "answerIncorrect"});
      }
      setResult(false);
    }
    setNext(true);
  }

  function handleNext() {
    setNext(false);
    setYes("outline-primary");
    setYesClass("yes testButton");
    setNo("outline-primary");
    setNoClass("no testButton");
    setAnswer({answer: "", answerClass: "answerHidden"});
    props.onAnswerSelected(result);
  }

  function handleKeys(e) {
    e.keyCode == "38" && document.querySelector("#yesButton").click();
    e.keyCode == "40" && document.querySelector("#noButton").click();
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
          display={false}
        />
        <p>Does this look like a school location?</p>

        <div className="row no-gutters align-items-center mapdiv">
          <MapComponent lat={props.question.lat} lon={props.question.lon} />
          <CountryNameLabel countryName={countryName} />
          <div className={answerClass}>{answer["answer"]}</div>
        </div>

        <div>
          <Row className="pt-3 pl-1 pr-1">
            <Col xs={{size: 4, offset: 1}} className="ml-1 pr-0">
              <Button
                variant={yes}
                className={yesClass}
                id="yesButton"
                onClick={(e) => handleClick(e, true)}
                disabled={next}
              >
                Yes
              </Button>{" "}
            </Col>
            <Col xs={{size: 4, offset: 2}} className="mr-1 pl-0">
              <Button
                variant={no}
                className={noClass}
                id="noButton"
                onClick={(e) => handleClick(e, false)}
                disabled={next}
              >
                No
              </Button>{" "}
            </Col>
          </Row>
        </div>
      </main>

      <footer className="mt-auto next-section">
        <Button variant="primary" onClick={handleNext} disabled={!next} id="nextButton">
          <span>
            NEXT
            <img className="white" src="/white.svg" />
          </span>
        </Button>{" "}
      </footer>
    </Layout>
  );
}

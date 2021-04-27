import React, {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderComponent from "./headerComponent";
import {Container, Col, Row, Button} from "react-bootstrap";

import Layout from "./layout";

export default function StartTest(props) {
  const [height, setHeight] = useState(85);

  function calculateHeight() {
    let topElement = document.getElementById("testskills");
    let bottomElement = document.getElementById("tagschools");
    if (topElement && bottomElement) {
      let topRect = topElement.getBoundingClientRect();
      let bottomRect = bottomElement.getBoundingClientRect();
      setHeight(bottomRect.top - topRect.top);
    }
  }

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <Layout myClass="intro">
      <Head>
        <title>Project Connect</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
          rel="stylesheet"
        />
      </Head>

      <HeaderComponent inverse={false} />

      <div className="start-test big-button">
        <h1>
          Well done!
          <br />
          You got {props.correctAnswers}/{props.totalQuestions} school locations correct
        </h1>
        <Container>
          <Row>
            <Col xs={3}>
              <svg height="350" width="30" style={{paddingTop: "1.5em"}}>
                <circle
                  cx="15"
                  cy="25"
                  r="10"
                  stroke="#8bd432"
                  strokeWidth="3"
                  fill="#8bd432"
                />
                <text
                  x="15"
                  y="25"
                  textAnchor="middle"
                  stroke="white"
                  strokeWidth="2px"
                  dy=".3em"
                >
                  &#10003;
                </text>
                <line
                  x1="15"
                  y1="35"
                  x2="15"
                  y2={55 + height}
                  stroke="#8bd432"
                  strokeWidth="3"
                />
                <circle
                  cx="15"
                  cy={45 + height}
                  r="10"
                  stroke="#c5c5c5"
                  strokeWidth="3"
                  fill="white"
                />
              </svg>
            </Col>
            <Col xs={9}>
              <Row>
                <p>Test map skills</p>
              </Row>
              <Row>&nbsp;</Row>
              <Row>
                <p>Tag schools</p>
                <p style={{fontSize: "1.1em"}}>
                  Identify 10 schools for Project Connect and contribute to our data set
                  of school locations around the world.
                </p>
              </Row>
            </Col>
          </Row>
        </Container>

        <Link href="/mapping" passHref>
          <Button variant="primary">Start Tagging</Button>
        </Link>
        <div>
          <div style={{paddingTop: "1em"}}>
            Want to improve your mapping skills?
            <br />
            <Link href="/tips">
              <a>View school mapping tips</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

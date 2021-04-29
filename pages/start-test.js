import React, {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import {Container, Col, Row, Button} from "react-bootstrap";

import Layout from "../components/layout";
import HeaderComponent from "../components/headerComponent";

export default function StartTest() {
  const [height, setHeight] = useState(165);

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

      <HeaderComponent inverse={true} />

      <div className="start-test big-button">
        <h2>Let&apos;s start with testing your school mapping skills</h2>
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
                <line
                  x1="15"
                  y1="35"
                  x2="15"
                  y2={35 + height}
                  stroke="#c5c5c5"
                  strokeWidth="3"
                />
                <line x1="15" y1="35" x2="15" y2="55" stroke="#8bd432" strokeWidth="3" />
                <circle
                  cx="15"
                  cy={25 + height}
                  r="10"
                  stroke="#c5c5c5"
                  strokeWidth="3"
                  fill="white"
                />
              </svg>
            </Col>
            <Col xs={9}>
              <Row>
                <p id="testskills">Test map skills</p>
                <p style={{fontSize: "1.2em", paddingTop: 0}}>
                  Play a short game to understand how schools look on a map and how to
                  differentiate them from other buildings.
                </p>
              </Row>
              <Row>&nbsp;</Row>
              <Row>
                <p id="tagschools">Tag schools</p>
              </Row>
            </Col>
          </Row>
        </Container>

        <Link href="/test" passHref>
          <Button variant="primary" href="/test">
            Start
          </Button>
        </Link>
        <div>
          <div className="blueText" style={{paddingTop: "1em"}}>
            Have you done this before?{" "}
            <Link href="/mapping">
              <a>Skip the test</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

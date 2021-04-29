import React from "react";
import Head from "next/head";
import Layout from "./layout";
import HeaderComponent from "./headerComponent";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const Container = styled.div`
  .outerMessage {
    text-align: center;
  }

  .innerMessage {
    border-radius: 25px;
    border: 0.5px solid #808080;
    padding: 20px;
    text-align: left;
  }

  .fact {
    color: #2779ff;
    font-size: 1.5em;
  }

  p {
    font-size: 1em;
  }
`;

export default function Result(props) {
  return (
    <Container>
      <Layout className="result">
        <Head>
          <title>Project Connect</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
            rel="stylesheet"
          />
        </Head>

        <HeaderComponent inverse={false} />

        <div className="result big-button">
          <div className="outerMessage">
            <img src="Congratulations.svg" alt="Congratulations" />
            <h2>Congratulations!</h2>
            <p>You just mapped {props.gameStats.mapped_count} schools</p>
          </div>
          <div className="innerMessage">
            <p className="fact" style={{paddingTop: ".5em"}}>
              You have mapped {props.userStats.mapped_count} locations in total.
            </p>
            <p className="fact">
              <hr />
            </p>
            <p className="fact" style={{paddingTop: ".5em"}}>
              <strong>
                {props.taggedAllLocations ? (
                  <div>
                    <p style={{textAlign: "center"}}>
                      🏆&nbsp;&nbsp;You are a mapping champion! 🗺{" "}
                    </p>
                    You have mapped all of our potential school locations. We will add
                    more shortly, so come back soon.
                  </div>
                ) : (
                  props.fact
                )}
              </strong>
            </p>
            {props.taggedAllLocations ? (
              <Button
                variant="primary"
                href="https://projectconnect.world"
                target="_blank"
                rel="noopener"
              >
                Visit Project Connect
              </Button>
            ) : (
              <div>
                <p>
                  Help us connect more children to opportunity by mapping more schools
                </p>
                <Button variant="primary" href="/mapping">
                  Map More Schools
                </Button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Container>
  );
}

Result.propTypes = {};

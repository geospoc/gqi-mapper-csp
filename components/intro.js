import React, {useContext, useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {useSession} from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import Layout from "./layout";
import HeaderComponent from "./headerComponent";
import FooterComponent from "./footerComponent";
import {
  Accordion,
  AccordionContext,
  Button,
  useAccordionToggle,
  Card,
} from "react-bootstrap";

function ContextAwareToggle({children, eventKey, callback}) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Card.Header
      style={{fontWeight: isCurrentEventKey ? 700 : 400}}
      onClick={decoratedOnClick}
    >
      {children}
      <img
        src="/blue.svg"
        style={{float: "right", transform: isCurrentEventKey ? "rotate(-180deg)" : null}}
      />
    </Card.Header>
  );
}

export default function Intro() {
  const [linkLocation, setLinkLocation] = useState("/tips");
  const [cookies] = useCookies(["uuid"]);
  const [session] = useSession();

  useEffect(() => {
    const getUserStats = async () => {
      const result = await fetch(`/api/getUserStats/${user_id}`);
      const response = await result.json();
      if (response) {
        setLinkLocation("/mapping");
      }
    };

    const user_id = session ? session.user.id : cookies.uuid ? cookies.uuid : null;
    if (user_id) {
      getUserStats();
    }
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

      <div className="main">
        <h1>Welcome to Project Connect mapping game</h1>
        <p>With just one minute you can help us map 5 schools.</p>
      </div>

      <div className="next-section">
        <Link href={linkLocation} passHref>
          <Button variant="primary">
            <span>
              Start Mapping Schools
              <img className="white" src="/white.svg" />
            </span>
          </Button>
        </Link>
      </div>

      <div>
        <p style={{textAlign: "center", paddingTop: "2.5em"}}>
          <b>Frequently asked questions</b>
          <br />
          <img src="/blue.svg" />
        </p>
        <Accordion>
          <Card>
            <ContextAwareToggle eventKey="0">Why does mapping matter?</ContextAwareToggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                There are approximately 6 million schools in the world, but nobody knows
                where all of them are. We want to use the power of crowdsourcing to map
                and validate the location of these schools. For more information on the
                mission of Project Connect, visit&nbsp;
                <Link href="https://projectconnect.world" passHref>
                  <a target="_blank" rel="noopener">
                    our website
                  </a>
                </Link>
                .
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle eventKey="1">
              How can a school be identified on a map?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                Despite their varied structures, many schools have features that can help
                you identify a building as a school, whether it is the shape of the
                building, a group of buildings with the same colored roof, or nearby sport
                courts or playgrounds. See&nbsp;
                <Link href="/tips" passHref>
                  <a>examples of schools on a map</a>
                </Link>
                , learn to identify the most common set of features and hone in your
                school mapping skills!
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle eventKey="2">
              What do you do with my answers?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                UNICEF partners with country governments to obtain the coordinates of
                locations that might be schools or might not. Right now, players like you
                are helping us determine whether these locations are indeed schools. We
                have other tools to help us do this (e.g. ML models, apps where teachers
                and students around the world can send us geolocations of their schools,
                and more). Once enough players have helped us figure out which locations
                are schools, we can start enhancing our methods so we can determine
                whether any location, not just locations sent to us, is a school.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle eventKey="3">
              Where does the school location data come from?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                The main sources of data for the game are country governments. Project
                Connect works very closely with governments to gather existing data from
                different local stakeholders. The accuracy of the data we receive varies
                from country to country and it is very time consuming for an individual to
                manually validate all the locations one by one. That’s why the game will
                help us crowdsource the task – and eventually have automated machine
                learning models do the validation.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle eventKey="4">
              What is done with the yes/no/unsure ratings?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                Right now, we are gathering data to determine what is the yes/no ratio we
                need for the same location to reach some confidence level that the
                location contains a school, and the same to reach some confidence level
                that the location does not contain a school. We are using a dataset that
                has been manually validated by a trained team of &quot;data mappers&quot;
                as ground truth for this initial validation and for determining the yes/no
                thresholds. The more users play the game and the more answers we have, the
                better we’ll be able to define these thresholds. On the other hand, no
                single person will have the power to validate a school alone.
                <br />
                <br />
                The ratings will be used in the following ways:
                <ol>
                  <li>
                    for locations that are rated with a high number of &quot;NO&quot;,
                    this information will be sent to the government (our main source of
                    data) and we’ll work with them to correct the geolocation tagging of
                    the corresponding schools
                  </li>
                  <li>
                    locations that are rated with high number of &quot;NO&quot; and
                    &quot;YES&quot; will be used to train our ML algorithms.
                  </li>
                  <li>
                    for locations that are rated with high number of &quot;UNSURE&quot;,
                    we will consider that satellite imagery is not sufficient to determine
                    that the location contains a school or not and they won’t be used to
                    train our ML algorithms.
                  </li>
                </ol>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle eventKey="5">
              What will I receive for my contribution?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="5">
              <Card.Body>
                For now, only the greatest reward of supporting the Project Connect
                mission. In future development, we plan to build leaderboards and a reward
                system that is integrated with other Digital Public Goods.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>

      <FooterComponent />
    </Layout>
  );
}

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
  const [linkLocationSchools, setLinkLocationSchools] = useState("/tips/schools");
  const [linkLocationHospitals, setLinkLocationHospitals] = useState("/tips/hospitals");
  const [cookies] = useCookies(["uuid"]);
  const [session] = useSession();

  useEffect(() => {
    const getUserStats = async () => {
      const resultSchools = await fetch(`/api/getUserStats/${user_id}?type=schools`);
      const resultHospitals = await fetch(`/api/getUserStats/${user_id}?type=hospitals`);
      const responseSchools = await resultSchools.json();
      const responseHospitals = await resultHospitals.json();
      if (responseSchools && responseSchools.mapped_count > 0) {
        setLinkLocationSchools("/mapping/schools");
      }
      if (responseHospitals && responseHospitals.mapped_count > 0) {
        setLinkLocationHospitals("/mapping/hospitals");
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
        <Link href={linkLocationSchools} passHref>
          <Button variant="primary">
            <span>
              Start Mapping Schools
              <img className="white" src="/white.svg" />
            </span>
          </Button>
        </Link>
      </div>
      <div className="next-section">
        <Link href={linkLocationHospitals} passHref>
          <Button variant="primary">
            <span>
              Start Mapping Hospitals
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
                and validate the location of schools and hospitals. For more information
                on the mission of Project Connect, visit&nbsp;
                <Link href="https://gqi-mapper-dashboard-prod.geospoc.com" passHref>
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
              How can a school/hospital be identified on a map?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                Despite their varied structures, many schools and hospitals have features
                that can help you identify a building as a school/hospital, whether it is
                the shape of the building, a group of buildings with the same coloured
                roof, or nearby sport courts or playgrounds.See&nbsp;
                <Link href="/tips/schools.js" passHref>
                  <a>examples of schools on a map</a>
                </Link>{" "}
                and
                <Link href="/tips/hospitals.js" passHref>
                  <a>examples of hospitals on a map</a>
                </Link>
                , learn to identify the most common set of features and hone in your
                school and hospital mapping skills!
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle eventKey="2">
              What do you do with my answers?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                Right now, players like you are helping us determine whether these
                locations are indeed schools or hospitals. Once enough players have helped
                us figure out which locations are schools/hospitals, we can start
                enhancing our methods so we can determine whether any location, not just
                locations sent to us, is a school or hospital.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle eventKey="3">
              Where does the school and hospital location data come from?
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                The accuracy of the data we receive varies from country to country and it
                is very time consuming for an individual to manually validate all the
                locations one by one. That’s why the game will help us crowdsource the
                task – and eventually have automated machine learning models do the
                validation.
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
                location contains a school/hospital, and the same to reach some confidence
                level that the location does not contain a school/hospital. We are using a
                dataset that has been manually validated by a trained team of &quot;data
                mappers&quot; as ground truth for this initial validation and for
                determining the yes/no thresholds. The more users play the game and the
                more answers we have, the better we’ll be able to define these thresholds.
                On the other hand, no single person will have the power to validate a
                school /hospital alone.
                <br />
                <br />
                The ratings will be used in the following ways:
                <ol>
                  <li>
                    For locations that are rated with a high number of &quot;NO&quot;,
                    this information will be used to correct the geolocation tagging of
                    the corresponding schools or hospitals
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
                mission.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>

      <FooterComponent />
    </Layout>
  );
}

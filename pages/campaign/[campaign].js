import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import HeaderComponent from "../../components/headerComponent";
import {Container, Col, Row, ProgressBar, Table} from "react-bootstrap";
import {CAMPAIGNS} from "../../constants";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function campaign() {
  const router = useRouter();
  const [campaign, setCampaign] = useState(null);
  const [stats, setStats] = useState({taggings: 0, users: 0, schools: 0});
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchData(campaign) {
      const result = await fetch(`/api/getCampaignStats/${campaign}`);
      const leaders = await fetch(`/api/summaryUsers?campaign=${campaign}&names=1`);
      setStats(await result.json());
      setLeaderboard(await leaders.json());
    }

    if (router.query.campaign) {
      if (router.query.campaign in CAMPAIGNS) {
        setCampaign(router.query.campaign);
        fetchData(router.query.campaign);
      } else {
        router.push("/404");
      }
    }
  }, [router.query]);

  return (
    <>
      {campaign ? (
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

          <div className="tips">
            <h1>{CAMPAIGNS[campaign].name} Campaign</h1>
          </div>

          <Container fluid>
            <Row>
              <Col>
                <h4>Locations Mapped</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={7} style={{paddingTop: "0.5em"}}>
                <ProgressBar
                  now={(stats.taggings / CAMPAIGNS[campaign].taggings) * 100}
                />
              </Col>
              <Col className="text-right">
                <h4>
                  <span style={{color: "#007bff"}}>
                    {numberWithCommas(stats.taggings)}
                  </span>
                  &nbsp;/&nbsp;{numberWithCommas(CAMPAIGNS[campaign].taggings)}
                </h4>
              </Col>
            </Row>
            <Row>
              <p>&nbsp;</p>
            </Row>
            <Row>
              <Col>
                <h4>Users Registered</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={7} style={{paddingTop: "0.5em"}}>
                <ProgressBar now={(stats.users / CAMPAIGNS[campaign].users) * 100} />
              </Col>
              <Col className="text-right">
                <h4>
                  <span style={{color: "#007bff"}}>{numberWithCommas(stats.users)}</span>
                  &nbsp;/&nbsp;{numberWithCommas(CAMPAIGNS[campaign].users)}
                </h4>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-5">
                <h3>Leaderboard</h3>
              </Col>
            </Row>
            <Row>
              <Table striped>
                <thead>
                  <tr>
                    <th>User</th>
                    <th className="text-right">Locations</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.length ? (
                    leaderboard.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name ? item.name : "Anonymous"}</td>
                        <td className="text-right">{item.count}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center p-5">
                        No mapping activity to display yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Row>
          </Container>
        </Layout>
      ) : null}
    </>
  );
}

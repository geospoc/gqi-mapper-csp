import React, {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import Link from "next/link";
import {signOut, useSession} from "next-auth/client";
import {Image, Button, Form, Row, Col} from "react-bootstrap";

import Layout from "../components/layout";
import HeaderComponent from "../components/headerComponent";
import FooterComponent from "../components/footerComponent";

const UserView = ({user, signout}) => {
  const [team, setTeam] = useState(null);
  const [userStats, setUserStats] = useState({mapped_count: 0});
  const [facts, setFacts] = useState({});
  const [checkVisible, setCheckVisible] = useState("iconInvisible");

  useEffect(() => {
    const getUserTeam = async () => {
      const result = await fetch(`/api/getUserTeam/${user.id}`);
      const response = await result.json();
      setTeam(response.team);
    };

    const getUserStats = async () => {
      const result = await fetch(`/api/getUserStats/${user.id}`);
      const response = await result.json();
      setUserStats(response);
    };

    const getFact = async () => {
      const result = await fetch(`/api/getFact/${user.id}?page=profile`);
      const response = await result.json();
      setFacts(response);
    };

    getUserTeam();
    getUserStats();
    getFact();
  }, []);

  async function updateTeam(uuid, team) {
    await fetch("/api/updateUserTeam", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        uuid: uuid,
        team: team,
      }),
    });
  }

  async function handleChange(event) {
    setCheckVisible("iconVisible");
    await updateTeam(user.id, event.target.value);
    setCheckVisible("iconFadeOut");
  }

  return (
    <div className="user-view">
      <div className="profile-card-container">
        <div className="profile-info">
          <Image className="profile-picture" src={user.image} roundedCircle />
          <div className="profile-name">{user.name}</div>
        </div>
        <Form>
          <Form.Group as={Row} noGutters={true} controlId="formPlaintextPassword">
            <Form.Label column xs={2}>
              Team:
            </Form.Label>
            {team ? (
              <Col xs={8}>
                <Form.Control
                  as="select"
                  onChange={handleChange.bind(this)}
                  defaultValue={team}
                >
                  <option value="0">None</option>
                  <option>Mapbox</option>
                  <option>UNICEF</option>
                </Form.Control>
              </Col>
            ) : null}
            <Col xs={1} className="pl-2">
              <img
                src="/icons/greentick.svg"
                width="20"
                style={{paddingTop: ".4em", textAlign: "left"}}
                className={checkVisible}
              />
            </Col>
          </Form.Group>
        </Form>

        <div className="profile-signout-container">
          <button onClick={signout} className="profile-signout">
            Sign out
            <img src="caret-red.svg" className="dropdown-caret" />
          </button>
        </div>
      </div>

      <div className="profile-bottom">
        {userStats.mapped_count > 0 ? (
          <div>
            <div className="mappings-container">
              <div className="mappings-header">
                <img src="/star-white.svg" />
                <span className="mappings-title">Your mappings</span>
              </div>
              <div className="mappings-list">
                <div className="profile-fact">
                  You have mapped {userStats.mapped_count} schools.
                </div>
                <hr className="profile-fact-divider" />
                <div className="profile-fact">{facts.country_count}</div>
                <hr className="profile-fact-divider" />
                <div className="profile-fact">{facts.top_country}</div>
                <hr className="profile-fact-divider" />
                <div className="profile-fact">{facts.num_locations_mapped_total}</div>
              </div>
            </div>
            <div className="bottom-button">
              <Link href="/mapping">
                <Button variant="primary">
                  Map more schools
                  <img src="/white.svg" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="bottom-button">
              <Link href="/mapping">
                <Button variant="primary">
                  Start mapping schools
                  <img src="/white.svg" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const signOutWithRedirect = () => {
    signOut();
    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>Project Connect</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
          rel="stylesheet"
        />
      </Head>

      <HeaderComponent inverse={false} />

      {!loading && session && (
        <UserView user={session.user} signout={signOutWithRedirect} />
      )}

      <FooterComponent />
    </Layout>
  );
};

export default ProfilePage;

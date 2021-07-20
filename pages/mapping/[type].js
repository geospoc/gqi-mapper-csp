import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {useSession} from "next-auth/client";
import {v4 as uuidv4} from "uuid";

import Quiz from "../../components/quiz";
import Result from "../../components/result";
import {useRouter} from "next/router";

export default function mapping() {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState({
    center: {coordinates: [0, 0]},
    geom: {
      coordinates: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
    metaData: {color: "#FFF", stroke: "#FFF"},
  });
  const [questions, setQuestions] = useState([question]);
  const [locationResults, setLocationResults] = useState({
    yes_count: 0,
    no_count: 0,
    maybe_count: 0,
    total_count: 0,
  });
  const [userStats, setUserStats] = useState({mapped_count: 0});
  const [gameStats, setGameStats] = useState({country_counts: {}, mapped_count: 0});
  const [fact, setFact] = useState("");

  const [cookies, setCookie] = useCookies(["uuid"]);
  const [session, loading] = useSession();

  const [untaggedLocationsCount, setUntaggedLocationsCount] = useState(10);
  const [locationType, setLocationType] = useState("");

  useEffect(() => {
    async function addUser(uuid) {
      await fetch("/api/addUser", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          user_id: uuid,
        }),
      });
    }

    async function fetchData(userId) {
      const user_id = session ? session.user.id : cookies.uuid ? cookies.uuid : userId;
      // Get location data
      const result = await fetch(
        `/api/getLocations/${user_id}?type=${router.query.type}`
      );
      setQuestions(await result.json());
    }

    if (!loading) {
      // Initialize cookie if not present
      const userId = uuidv4();
      if (!session && !cookies.uuid) {
        setCookie("uuid", userId, {path: "/", maxAge: 2592000}); // maxAge: 30 days
        addUser(userId);
      }

      // Initialize the set of questions
      fetchData(userId);
    }
  }, [loading]);

  async function fetchLocationResults(id) {
    // Get number of untagged locations
    const result = await fetch(`/api/getLocationResults/${id}`);
    const response = await result.json();
    setLocationResults(response);
  }

  useEffect(() => {
    if (questions) {
      const question = questions[counter];
      question.featurePolygon = question.geom;
      setQuestion(question);
    }
  }, [questions]);

  useEffect(() => {
    if (questions && counter < questions.length) {
      const question = questions[counter];
      question.featurePolygon = question.geom;
      setQuestion(question);
    }
  }, [counter]);

  function handleAnswerSelected(result) {
    if (result.id) {
      fetchLocationResults(result.id);
    }

    const user_id = session ? session.user.id : cookies.uuid;

    fetch("/api/validateLocation", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        location_id: result.id,
        result: result.answer,
        location_type: result.location_type,
      }),
    });
  }

  function handleNextSelected() {
    var countryCounts = gameStats.country_counts;
    const mappedCount = gameStats.mapped_count;
    if (countryCounts[question.country_code]) {
      countryCounts[question.country_code] = countryCounts[question.country_code] + 1;
    } else {
      countryCounts[question.country_code] = 1;
    }
    setGameStats({country_counts: countryCounts, mapped_count: mappedCount + 1});

    if (counter < questions.length) {
      setCounter(counter + 1);
      setLocationResults({yes_count: 0, no_count: 0, maybe_count: 0, total_count: 0});
    }
  }

  async function fetchUntaggedLocationsCount() {
    const user_id = session ? session.user.id : cookies.uuid;

    // Get number of untagged locations
    const result = await fetch(
      `/api/getUntaggedLocationsCount/${user_id}?type=${router.query.type}`
    );
    const response = await result.json();
    setUntaggedLocationsCount(await response.count);
  }

  async function fetchUserStats() {
    const user_id = session ? session.user.id : cookies.uuid;

    const result = await fetch(`/api/getUserStats/${user_id}`);
    const response = await result.json();
    setUserStats(await response);
  }

  async function fetchFact() {
    const user_id = session ? session.user.id : cookies.uuid;
    const result = await fetch(
      `/api/getFact/${user_id}?page=result&type=${router.query.type}`
    );
    const response = await result.json();
    setFact(await response["message"]);
    setLocationType(router.query.type);
  }

  if (counter < questions.length) {
    return (
      <Quiz
        question={question}
        counter={counter}
        questionTotal={questions.length}
        onAnswerSelected={handleAnswerSelected}
        onNextSelected={handleNextSelected}
        locationResults={locationResults}
      />
    );
  } else {
    if (counter == questions.length) {
      fetchUserStats();
      fetchUntaggedLocationsCount();
      fetchFact();
      setCounter(counter + 1);
    }
    return (
      <Result
        taggedAllLocations={untaggedLocationsCount <= 0}
        fact={fact}
        userStats={userStats}
        gameStats={gameStats}
        locationType={locationType}
      />
    );
  }
}

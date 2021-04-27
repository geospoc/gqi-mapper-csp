import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {useSession} from "next-auth/client";
import {v4 as uuidv4} from "uuid";

import Quiz from "../components/quiz";
import Result from "../components/result";

export default function mapping() {
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState({
    id: 0,
    lat: 0,
    lon: 0,
    country_code: "",
    answer: "",
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
  const [session] = useSession();

  const [untaggedLocationsCount, setUntaggedLocationsCount] = useState(10);

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

    // Initialize cookie if not present
    const userId = uuidv4();
    if (!session && !cookies.uuid) {
      setCookie("uuid", userId, {path: "/", maxAge: 2592000}); // maxAge: 30 days
      addUser(userId);
    }

    // Initialize the set of questions
    async function fetchData() {
      const user_id = session ? session.user.id : cookies.uuid ? cookies.uuid : userId;
      // Get location data
      const result = await fetch(`/api/getLocations/${user_id}`);
      setQuestions(await result.json());
    }
    fetchData();
  }, []);

  async function fetchLocationResults(school_id) {
    // Get number of untagged locations
    const result = await fetch(`/api/getLocationResults/${school_id}`);
    const response = await result.json();
    setLocationResults(response);
  }

  useEffect(() => {
    if (questions) {
      setQuestion(questions[counter]);
    }
  }, [questions]);

  useEffect(() => {
    if (questions) {
      setQuestion(questions[counter]);
    }
  }, [counter]);

  function handleAnswerSelected(result) {
    if (result.school_id) {
      fetchLocationResults(result.school_id);
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
        school_id: result.school_id,
        result: result.answer,
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
    const result = await fetch(`/api/getUntaggedLocationsCount/${user_id}`);
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
    const result = await fetch(`/api/getFact/${user_id}?page=result`);
    const response = await result.json();
    setFact(await response["message"]);
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
      />
    );
  }
}

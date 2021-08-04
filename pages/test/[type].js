import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {v4 as uuidv4} from "uuid";

import QuizTest from "../../components/quizTest";
import ResultTest from "../../components/resultTest";
import {useRouter} from "next/router";
const numQuestions = 6;

export default function mapping() {
  const router = useRouter();
  const [answerCount, setAnswerCount] = useState(0);
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
  const [cookies, setCookie] = useCookies(["uuid"]);

  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  useEffect(() => {
    // Initialize cookie if not present
    if (!cookies.uuid) {
      setCookie("uuid", uuidv4(), {path: "/"});
    }

    // Initialize the set of questions
    async function fetchData() {
      // Get location data
      console.log(router);
      const result = await fetch(`/api/getLocationsTest/${router.query.type}`);
      setQuestions(shuffle(await result.json()));
    }
    fetchData();
  }, []);

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

  function handleAnswerSelected(answer) {
    if (answer) {
      setAnswerCount(answerCount + 1);
    }
    if (counter < numQuestions) {
      setCounter(counter + 1);
    }
  }

  if (counter < numQuestions) {
    return (
      <QuizTest
        question={question}
        counter={counter}
        questionTotal={numQuestions}
        onAnswerSelected={handleAnswerSelected}
      />
    );
  } else {
    return (
      <ResultTest
        correctAnswers={answerCount}
        totalQuestions={numQuestions}
        locationType={router.query.type}
      />
    );
  }
}

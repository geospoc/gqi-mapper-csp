import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

import useScriptText from '../hooks/useScriptText';
import Intro from '../components/intro';
import Quiz from '../components/quiz';
import Result from '../components/result';

 
export default function mapping() {

	const [answerCount, setAnswerCount] = useState(0);
	const [counter, setCounter] = useState(0);
	const [question, setQuestion] = useState({ id: 0, lat: 0, lon: 0, answer: ''});
	const [questions, setQuestions] = useState([question]);

	const [cookies, setCookie] = useCookies(['uuid']);

	const scriptText = "\
		const setVh = () => {\
			let vh = window.innerHeight * 0.01;\
			document.documentElement.style.setProperty('--vh', `${vh}px`);\
		};\
		window.addEventListener('load', setVh);\
		window.addEventListener('resize', setVh);";
	useScriptText(scriptText);

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

		// Initialize the set of questions
		async function fetchData() {
			// Get location data
			const result = await fetch("/api/getLocations");
			setQuestions(await result.json());
		}
		fetchData();

		async function addUser(uuid) {
			await fetch("/api/addUser", {
				'method': 'POST',
				'headers': {
					'content-type': 'application/json',
					'accept': 'application/json'
				},
				'body': JSON.stringify({
					user_id: uuid
				})
			})
		}

		// Initialize cookie if not present
		if(!cookies.uuid){
			const userId = uuidv4();
			setCookie('uuid', userId, { path: '/' });
			addUser(userId);
		}

	}, []);

	useEffect(() => {
		if(questions) {
			setQuestion(questions[counter]);
		}
	}, [questions]);

	useEffect(() => {
		if(questions) {
			setQuestion(questions[counter]);
		}
	}, [counter])

	function handleAnswerSelected(result) {
		fetch("/api/validateLocation", {
			'method': 'POST',
			'headers': {
				'content-type': 'application/json',
				'accept': 'application/json'
  			},
  			'body': JSON.stringify({
  				user_id: cookies.uuid, 
  				school_id: result.school_id,
  				result: result.answer
  			})
		})
		if (counter < questions.length) {
			setCounter(counter + 1);
	  	} 
	}

  	if (counter < questions.length) {
		return (
			<Quiz
				question={question}
				counter={counter}
				questionTotal={questions.length}
				onAnswerSelected={handleAnswerSelected}
			/>
		);
	} else {
	  	return <Result correctAnswers={answerCount} />;
	}

}
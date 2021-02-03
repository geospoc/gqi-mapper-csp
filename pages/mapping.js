import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

import useScriptText from '../hooks/useScriptText';
import Intro from '../components/intro';
import Quiz from '../components/quiz';
import Result from '../components/result';

 
export default function mapping() {
	const [counter, setCounter] = useState(0);
	const [question, setQuestion] = useState({ id: 0, lat: 0, lon: 0, country_code: '', answer: ''});
	const [questions, setQuestions] = useState([question]);
	const [locationResults, setLocationResults] = useState({ yes_count: 0, no_count: 0, maybe_count: 0, total_count: 0});
	const [userStats, setUserStats] = useState({ total: 0 });
	const [gameStats, setGameStats] = useState({ country_counts: {} });

	const [cookies, setCookie] = useCookies(['uuid']);

	const [untaggedLocationsCount, setUntaggedLocationsCount] = useState(10);

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
			setCookie('uuid', userId, { path: '/', maxAge: 2592000 }); // maxAge: 30 days
			addUser(userId);
		}

		// Initialize the set of questions
		async function fetchData() {
			// Get location data
			const result = await fetch(`/api/getLocations/${cookies.uuid}`);
			setQuestions(await result.json());
		}
		fetchData();
	}, []);

	async function fetchLocationResults(school_id) {
		// Get number of untagged locations
		const result = await fetch(`/api/getLocationResults/${school_id}`);
		const response = await result.json();
		setLocationResults(response);
	};

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
		if (result.school_id) {
			fetchLocationResults(result.school_id);
		}
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
		});
	}

	function handleNextSelected() {
		var countryCounts = gameStats.country_counts;
		if (countryCounts[question.country_code]) {
			countryCounts[question.country_code] = countryCounts[question.country_code] + 1;
		} else {
			countryCounts[question.country_code] = 1;
		}
		setGameStats({ country_counts: countryCounts });

		if (counter < questions.length) {
			setCounter(counter + 1);
			setLocationResults({ yes_count: 0, no_count: 0, maybe_count: 0, total_count: 0});
	  	}
	}

	async function fetchUntaggedLocationsCount() {
		// Get number of untagged locations
		const result = await fetch(`/api/getUntaggedLocationsCount/${cookies.uuid}`);
		const response = await result.json();
		setUntaggedLocationsCount(await response.count);
	};

	async function fetchUserStats() {
		const result = await fetch(`/api/getUserStats/${cookies.uuid}`);
		const response = await result.json();
		setUserStats(await response);
	};

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
		fetchUserStats();
		fetchUntaggedLocationsCount();
	  	return <Result taggedAllLocations={untaggedLocationsCount <= 0} userStats={userStats} gameStats={gameStats} />;
	}

}
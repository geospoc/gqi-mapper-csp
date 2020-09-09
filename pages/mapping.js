import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

import useScriptText from '../hooks/useScriptText';
import Intro from '../components/intro';
import Quiz from '../components/quiz';
import quizQuestions from '../api/quizQuestions';
import Result from '../components/result';


const numQuestions = 5;
 
export default function mapping() {

	const [answerCount, setAnswerCount] = useState(0);
	const [questions, setQuestions] = useState(null);
	const [counter, setCounter] = useState(0);
	const [question, setQuestion] = useState({ lat: 0, lon: 0, answer: ''});

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
		setQuestions(shuffle(quizQuestions));

		// Initialize cookie if not present
		if(!cookies.uuid){
			setCookie('uuid', uuidv4(), { path: '/' });
		}

	}, []);

	useEffect(() => {
		if(questions) {
			setQuestion({ lat: questions[counter].lat, lon: questions[counter].lon, answer: questions[counter].answer});
		}
	}, [questions]);

	useEffect(() => {
		if(questions) {
			setQuestion({ lat: questions[counter].lat, lon: questions[counter].lon, answer: questions[counter].answer});
		}
	}, [counter])


	function handleAnswerSelected(answer) {
		if(answer){
			setAnswerCount(answerCount + 1);
		}
		if (counter < numQuestions) {
			setCounter(counter + 1);
	  	} 
	}

  	if (counter < numQuestions) {
		return (
			<Quiz
				answer={question.answer}
				lat={question.lat}
				lon={question.lon}
				counter={counter}
				questionTotal={numQuestions}
				onAnswerSelected={handleAnswerSelected}
			/>
		);
	} else {
	  	return <Result correctAnswers={answerCount} />;
	}

}
import React, { useState, useEffect } from 'react';
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

		setQuestions(shuffle(quizQuestions));

		var scriptFound = false;
		let allsuspects=document.getElementsByTagName("script");
		for (let i=allsuspects.length; i>=0; i--){
			if (allsuspects[i] && allsuspects[i].getAttribute("src")===null
				&& allsuspects[i].text.includes('setVh')){
				scriptFound = true;
				break;
			}
		}
		if(!scriptFound){
			// fix 100vh in Safari on iOS as well as Chrome 84+
			// see https://www.bram.us/2020/05/06/100vh-in-safari-on-ios/
			const script = document.createElement("script");
			script.text = "\
				const setVh = () => {\
					let vh = window.innerHeight * 0.01;\
					document.documentElement.style.setProperty('--vh', `${vh}px`);\
				};\
				window.addEventListener('load', setVh);\
				window.addEventListener('resize', setVh);";
			document.body.appendChild(script);
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
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
import {Row, Col, Button} from 'react-bootstrap';

import QuestionCount from '../components/questionCount';
import Layout from '../components/layout'

const MapComponent = dynamic(import('../components/mapComponent'),{
	ssr: false
})

export default function Quiz (props) {

	const [next, setNext] = useState(false);
	const [yes, setYes] = useState('outline-primary');
	const [no, setNo] = useState('outline-primary');
	const [result, setResult] = useState(false);
	const [answer, setAnswer] = useState({answer:'', answerClass: 'answerHidden'});

	function handleClick(e, value) {
		let buttonVariant = '';
		if(value === props.answer) {
			if(value === true) {
				setYes('success');
				setAnswer({answer: 'Correct answer', answerClass: 'answerCorrect'});
			} else {
				setNo('success');
				setAnswer({answer: 'Correct answer', answerClass: 'answerCorrect'});
			}
			setResult(true);
		} else {
			if(value === true) {
				setYes('danger');
				setAnswer({answer: 'Incorrect answer', answerClass: 'answerIncorrect'});
			} else {
				setNo('danger');
				setAnswer({answer: 'Incorrect answer', answerClass: 'answerIncorrect'});
			}
			setResult(false);
		}
		setNext(true);
	}

	function handleNext(){
		setNext(false);
		setYes('outline-primary');
		setNo('outline-primary');
		setAnswer({answer: '', answerClass: 'answerHidden'});
		props.onAnswerSelected(result);
  	}

	const latlon = [props.lat, props.lon];
	const answerClass = "answer " + answer.answerClass

	return (
		<Layout myClass="quiz">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<main>
				<QuestionCount counter={props.counter} total={props.questionTotal} />
				<p>Does this look like a school location?</p>

				<div className="row no-gutters align-items-center mapdiv">
					<MapComponent lat={props.lat} lon={props.lon} />
					<div className={answerClass}>
						{answer['answer']}
					</div>
				</div>

				<div>
					<Row className="p-3">
						<Col xs={4}>
							<Button variant={yes} onClick={e => handleClick(e, true)} disabled={next}>Yes</Button>{' '}
						</Col>
						<Col xs={4}>
							<Button variant={no} onClick={e => handleClick(e, false)} disabled={next}>No</Button>{' '}
						</Col>
						<Col xs={4}>
							<Button variant="outline-secondary" disabled>Maybe</Button>{' '}
						</Col>
					</Row>
				</div>
			</main>

			<footer className="mt-auto">
				<Button variant="primary" onClick={handleNext} disabled={!next}><span>NEXT<img className="white" src="/white.svg"/></span></Button>{' '}
			</footer>

		</Layout>
	)
}

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
import {Row, Col, Button, ProgressBar} from 'react-bootstrap';

import QuestionCount from '../components/questionCount';
import Layout from '../components/layout'

const MapComponent = dynamic(import('../components/mapComponent'),{
	ssr: false
})

export default function Quiz (props) {

	const [next, setNext] = useState(false);
	const [yes, setYes] = useState('outline-primary');
	const [no, setNo] = useState('outline-primary');
	const [maybe, setMaybe] = useState('outline-primary');
	const [result, setResult] = useState(false);
	const [answer, setAnswer] = useState({answer:'', answerClass: 'answerHidden'});

	function handleClick(e, value) {
		let buttons = document.getElementsByClassName('actionButton');
		for(let button of buttons) {
			button.className = "btn btn-outline-primary actionButton"
		}
		e.target.className = "btn btn-primary actionButton";
		let resultValue = {school_id: props.question.school_id, answer: value};
		props.onAnswerSelected(resultValue);
        setResult(resultValue)
		setNext(true);
	}

	function handleNext(){
		let buttons = document.getElementsByClassName('actionButton');
		for(let button of buttons) {
			button.className = "btn btn-outline-primary actionButton"
		}
		setNext(false);
		setAnswer({answer: '', answerClass: 'answerHidden'});
		props.onNextSelected();
  	}

	const latlon = [props.question.lat, props.question.lon];
	const answerClass = "answer " + answer.answerClass
	return (
		<Layout myClass="quiz">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<main>
				<QuestionCount counter={props.counter} total={props.questionTotal} />
				<p>Does this look like a school location? {props.question.school_id} </p>

				<div className="row no-gutters align-items-center mapdiv">
					<MapComponent lat={props.question.lat} lon={props.question.lon} />
					<div className={answerClass}>
						{answer['answer']}
					</div>
				</div>
				{next
					? <div>
						{props.locationResults.school_id}
						<ProgressBar variant="success" label="Yes" now={(props.locationResults.yes_count / props.locationResults.total_count) * 100} />
						<ProgressBar variant="danger" label="No" now={(props.locationResults.no_count / props.locationResults.total_count) * 100} />
						<ProgressBar variant="warning" label="Unsure" now={(props.locationResults.maybe_count / props.locationResults.total_count) * 100} />
					</div>
					:
					<div>
						<Row className="p-3">
							<Col xs={4}>
								<Button className='actionButton' variant={yes} onClick={e => handleClick(e, 'yes')}>Yes</Button>
							</Col>
							<Col xs={4}>
								<Button className='actionButton' variant={no} onClick={e => handleClick(e, 'no')}>No</Button>
							</Col>
							<Col xs={4}>
								<Button className='actionButton' variant={maybe} onClick={e => handleClick(e, 'maybe')}>Unsure</Button>
							</Col>
						</Row>
					</div>
				}
			</main>

			<footer className="mt-auto next-section">
				<Button variant="primary" onClick={handleNext} disabled={!next}><span>NEXT<img className="white" src="/white.svg"/></span></Button>{' '}
			</footer>
		</Layout>
	)
}

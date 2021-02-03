import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
import {Row, Col, Button} from 'react-bootstrap';

import ProgressBar from '../components/progressBar';
import QuestionCount from '../components/questionCount';
import Layout from '../components/layout'

const countryCodes = require('../data/countries.json');

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
	const answerClass = "answer " + answer.answerClass;
	const countryName = countryCodes[props.question.country_code];
	return (
		<Layout myClass="quiz">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<main>
				<QuestionCount counter={props.counter} total={props.questionTotal} />
				<p>Does this look like a school location?</p>

				<div className="row no-gutters align-items-center mapdiv">
					<MapComponent lat={props.question.lat} lon={props.question.lon} />
					<div className={answerClass}>
						{answer['answer']}
					</div>
				</div>
				<div>
					<Row className="p-3">
						<Col xs={4}>
							<Button className='actionButton' variant={yes} disabled={next} onClick={e => handleClick(e, 'yes')}>Yes</Button>
						</Col>
						<Col xs={4}>
							<Button className='actionButton' variant={no} disabled={next} onClick={e => handleClick(e, 'no')}>No</Button>
						</Col>
						<Col xs={4}>
							<Button className='actionButton' variant={maybe} disabled={next} onClick={e => handleClick(e, 'maybe')}>Unsure</Button>
						</Col>
					</Row>
				</div>
			</main>

			<footer className="mt-auto next-section">
				{next
					? <div>
						<ProgressBar 
							label="Yes" 
							chosen={result.answer == 'yes'}
							value={((props.locationResults.yes_count + (result.answer == 'yes' ? 1 : 0)) / (props.locationResults.total_count + 1)) * 100} />
						<ProgressBar 
							label="No" 
							chosen={result.answer == 'no'} 
							value={((props.locationResults.no_count + (result.answer == 'no' ? 1 : 0)) / (props.locationResults.total_count + 1)) * 100} />
						<ProgressBar 
							label="Unsure" 
							chosen={result.answer == 'maybe'} 
							value={((props.locationResults.maybe_count + (result.answer == 'maybe' ? 1 : 0)) / (props.locationResults.total_count + 1)) * 100} />
					</div>
					:
					''
				}
				<Button variant="primary" onClick={handleNext} disabled={!next}><span>NEXT<img className="white" src="/white.svg"/></span></Button>
			</footer>
		</Layout>
	)
}

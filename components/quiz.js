import React, { Component } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
import {Row, Col, Button} from 'react-bootstrap';

import QuestionCount from '../components/questionCount';
import Layout from '../components/layout'

const MapComponent = dynamic(import('../components/mapComponent'),{
	ssr: false
})

class Quiz extends Component {

	constructor(props) {
    	super(props);
    	this.state = {next: false, yes: 'outline-primary', no: 'outline-primary', result: false};

    	// This binding is necessary to make `this` work in the callback
    	this.handleClick = this.handleClick.bind(this);
    	this.handleNext = this.handleNext.bind(this);
  	}

  	handleClick(e, value) {
  		let buttonVariant = '';
  		if(value === this.props.answer) {
  			if(value === true) {
  				this.setState(state => ({yes: 'success'}));
  			} else {
  				this.setState(state => ({no: 'success'}));
  			}
  			this.setState(state => ({result: true}))
  		} else {
  			if(value === true) {
  				this.setState(state => ({yes: 'danger'}));
  			} else {
  				this.setState(state => ({no: 'danger'}));
  			}
  			this.setState(state => ({result: false}))
  		}
  		this.setState(state => ({next: true}));
  	}

  	handleNext(){
  		this.setState(state => ({next: false, yes: 'outline-primary', no: 'outline-primary'}));
  		this.props.onAnswerSelected(this.state.result)
  	}

	render() {

		const latlon = [this.props.lat, this.props.lon]
		return (
			<Layout myClass="quiz">
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</Head>
				<main>
					<QuestionCount counter={this.props.questionId} total={this.props.questionTotal} />
					<p>Does this look like a school location?</p>

					<div className="row no-gutters align-items-center mapdiv">
						<MapComponent lat={this.props.lat} lon={this.props.lon} />
					</div>

					<div>
						<Row className="p-3">
							<Col xs={4}>
								<Button variant={this.state.yes} onClick={e => this.handleClick(e, true)} disabled={this.state.next}>Yes</Button>{' '}
							</Col>
							<Col xs={4}>
								<Button variant={this.state.no} onClick={e => this.handleClick(e, false)} disabled={this.state.next}>No</Button>{' '}
							</Col>
							<Col xs={4}>
								<Button variant="outline-secondary" disabled>Maybe</Button>{' '}
							</Col>
						</Row>
					</div>
				</main>

				<footer className="mt-auto">
					<Button variant="primary" onClick={this.handleNext} disabled={!this.state.next}><span>NEXT<img className="white" src="/white.svg"/></span></Button>{' '}
				</footer>

			</Layout>
		)
	}
}

export default Quiz;

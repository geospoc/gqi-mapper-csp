import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from '../components/layout';
import Button from 'react-bootstrap/Button';

export default function Result(props) {
	let msg = '';
	switch(props.correctAnswers){
		case 5:
			msg = '🏆 You are a mapping champion! 🗺';
			break;
	}

	return(
	  	<Layout className="result">
			<Head>
				<title>Project Connect</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css2?family=Cabin&display=swap" rel="stylesheet" />
			</Head>

			<header className="masthead p-3">
			    <div className="inner">
			      <p className="masthead-brand">PROJECT CONNECT</p>
			    </div>
			</header>

			<div className="result">
				<h1>Thanks for your contribution to Project Connect!</h1>
				<p>You correctly identified {props.correctAnswers} location{ (props.correctAnswers!=1)?'s':null }. Your contribution will help us connect these schools to the Internet 🚀</p>
				<p style={{paddingTop: '.5em'}}>Want to engage more with Project Connect?</p>
				<Button variant="primary" href="/">Map More Schools</Button>{' '}
				<p>&nbsp;</p>
				<Button variant="primary" href="https://projectconnect.world">Learn More</Button>{' '}
			</div>

	    </Layout>
  	)
}

Result.propTypes = {
  correctAnswers: PropTypes.number.isRequired
};

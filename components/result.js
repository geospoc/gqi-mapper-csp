import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Container = styled.div`
.outerMessage {
	text-align: center;
}

.innerMessage {
	border-radius: 25px;
	border: .5px solid #808080;
	padding: 20px;
	text-align: left;
}

.fact {
	color: #0068ea;
	font-size: 1.5em;
}

p {
	font-size: 1em;
}
`;

export default function Result(props) {
	return(
		<Container>
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

				<div className="result big-button">
					<div className="outerMessage">
						<h2>Congratulations!</h2>
						<p>You just mapped {props.gameStats.mapped_count} schools</p>
					</div>
					<div className="innerMessage">
						<p className="fact" style={{paddingTop: '.5em'}}>
							You have mapped {props.userStats.total} locations in total.</p>
						<p className="fact"><strong>
						_</strong>
						</p>
						<p className="fact" style={{paddingTop: '.5em'}}><strong>
							The 10 schools you mapped consist of approx. 2000 students.</strong></p>
						<p style={{paddingTop: '.5em'}}>
						{props.taggedAllLocations ? '🏆 You are a mapping champion! 🗺 You have mapped all of our potential school locations. We will add more shortly, so come back soon.' : 'Help us connect more children to opportunity by mapping more schools.'}
						</p>
						{props.taggedAllLocations ? <Button variant="primary" href="https://projectconnect.world">Visit Project Connect</Button> : <Button variant="primary" href="/">Map More Schools</Button>}
					</div>
				</div>
		    </Layout>
	    </Container>
  	)
}

Result.propTypes = {
};

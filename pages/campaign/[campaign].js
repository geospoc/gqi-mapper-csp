import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Error from 'next/error';
import Layout from '../../components/layout';
import HeaderComponent from '../../components/headerComponent';
import { Container, Col, Row, ProgressBar } from 'react-bootstrap';


const campaigns = {
	"mapbox": {
		name: 'Mapbox',
		users: 1000,
		schools: 1000,
		taggings: 10000,
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function campaign() {

	const router = useRouter();
	const [campaign, setCampaign] = useState(null);
  	const [stats, setStats] = useState({ taggings: 0, users: 0, schools: 0});

	useEffect(() => {
		if(router.query.campaign) {
			if(router.query.campaign in campaigns) {
				setCampaign(router.query.campaign);
			} else {
				router.push('/404');
			}
		}
	},[router.query]);

	useEffect(() => {
		async function fetchData() {
			const result = await fetch(`/api/getCampaignStats/${campaign}`);
			setStats(await result.json());
		}
		fetchData();
	}, [campaign]);


	return(
		<>
		{campaign ?
		 	<Layout myClass="intro">
				<Head>
					<title>Project Connect</title>
					<link rel="icon" href="/favicon.ico" />
					<link href="https://fonts.googleapis.com/css2?family=Cabin&display=swap" rel="stylesheet" />
				</Head>

				<HeaderComponent inverse={false} />

				<div className="tips">
					<h1>{campaigns[campaign].name} Campaign</h1>
				</div>

				<Container fluid>
					<Row>
						<Col>
							<h4>Locations Mapped</h4>
						</Col>
					</Row>
					<Row>
						<Col xs={7} style={{paddingTop: '0.5em'}}>
							<ProgressBar now={stats.taggings/campaigns[campaign].taggings*100} />
						</Col>
						<Col className="text-right">
							<h4>
								<span style={{color: '#007bff'}}>
									{numberWithCommas(stats.taggings)}
								</span>
								&nbsp;/&nbsp;{numberWithCommas(campaigns[campaign].taggings)}
							</h4>
						</Col>
					</Row>
					<Row>
						<p>&nbsp;</p>
					</Row>
					<Row>
						<Col>
							<h4>Users Registered</h4>
						</Col>
					</Row>
					<Row>
						<Col xs={7} style={{paddingTop: '0.5em'}}>
							<ProgressBar now={stats.users/campaigns[campaign].users*100} />
						</Col>
						<Col className="text-right">
							<h4>
								<span style={{color: '#007bff'}}>
									{numberWithCommas(stats.users)}
								</span>
								&nbsp;/&nbsp;{numberWithCommas(campaigns[campaign].users)}
							</h4>
						</Col>
					</Row>
				</Container>
			</Layout>
		: null}
		</>
	);
}
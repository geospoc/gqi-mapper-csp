import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import {Row, Col, Button} from 'react-bootstrap';


class Question extends React.Component{
	render(){
	  return (
	    <Layout>
			<Head>
				<title>Project Connect</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css2?family=Cabin&display=swap" rel="stylesheet" />
			</Head>

			<main>
				<h2>1/10</h2>
				<p>Is this a school location?</p>

				<div className="row no-gutters align-items-center mytest">
					<div className="col-12 marker text-center">
						<img src="/marker.svg"/>
					</div>
				</div>

				<div>
					<Row className="p-3">
						<Col xs={4}>
							<Button variant="outline-primary">Yes</Button>{' '}
						</Col>
						<Col xs={4}>
							<Button variant="outline-primary">No</Button>{' '}
						</Col>
						<Col xs={4}>
							<Button variant="outline-primary">Maybe</Button>{' '}
						</Col>
					</Row>
				</div>
			</main>

			<footer className="mt-auto">
				<Button variant="primary" href="question"><span>NEXT<img className="white" src="/white.svg"/></span></Button>{' '}
			</footer>
	    </Layout>
	  )
	}
}

export default Question;
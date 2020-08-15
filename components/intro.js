import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Button from 'react-bootstrap/Button';

export default function Intro(props) {
  return (
    <Layout myClass="intro">
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

		<div className="main">
			<h1>Welcome to Project Connect mapping tool</h1>
			<p>With just one minute you can help us map 5 schools.</p>
		</div>

		<Button variant="primary" onClick={props.callback}><span>Start Mapping Schools<img className="white" src="/white.svg"/></span></Button>{' '}

		<div>
			<p>&nbsp;</p>
			<p style= {{textAlign: 'center'}}>There will be some <br/>interesting content<br/> here in the future 🤞</p>
		</div>
    </Layout>
  )
}
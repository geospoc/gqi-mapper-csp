import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Button from 'react-bootstrap/Button';

export default function Home() {
  return (
    <Layout>
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

		<Button variant="primary" href="question"><span>Start Mapping Schools<img className="white" src="/white.svg"/></span></Button>{' '}
    </Layout>
  )
}
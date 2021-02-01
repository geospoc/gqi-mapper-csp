import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { Container, Row, Image, Col } from 'react-bootstrap'

import Layout from '../components/layout'
import HeaderComponent from '../components/headerComponent'

const UserView = ({ user }) => {
    const [mappings, setMappings] = useState([])

    useEffect(() => {
        const getUserMappings = async () => {
            const result = await fetch(`/api/getAnswersByUser/${user.uid}`)
            const userMappings = await result.json()
            setMappings(userMappings)
        }
        getUserMappings()
    }, [])
    return (
        <Container fluid style={{ marginTop: '1em' }}>
            <Row>
                <Col>
                    <h2>{user.name}</h2>
                </Col>
                <Col xs={4}>
                    <Image src={user.image} thumbnail />
                </Col>
            </Row>
            <Row style={{ marginTop: '1em' }}>
                <Col>
                    <h3>Mappings:</h3>
                </Col>
            </Row>
            <Row style={{ marginTop: '1em' }}>
                <Col>
                    <p>Total mappings: {mappings.length}</p>
                </Col>
            </Row>
        </Container>
    )
}

const ProfilePage = () => {
    const [session, loading] = useSession()
    return (
        <Layout>
            <Head>
                <title>Project Connect</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <HeaderComponent inverse={false} />

            {!loading && session && <UserView user={session.user} />}
        </Layout>
    )
}

export default ProfilePage

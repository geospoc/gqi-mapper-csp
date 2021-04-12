import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'
import { Image, Button } from 'react-bootstrap'

import Layout from '../components/layout'
import HeaderComponent from '../components/headerComponent'

const UserView = ({ user, signout }) => {
    const [userStats, setUserStats] = useState({ mapped_count: 0 })
    const [facts, setFacts] = useState({});

    useEffect(() => {
        const getUserStats = async () => {
            const result = await fetch(`/api/getUserStats/${user.id}`)
            const response = await result.json()
            setUserStats(response)
        }

        const getFact = async () => {
            const result = await fetch(`/api/getFact/${user.id}?page=profile`);
            const response = await result.json();
            setFacts(response)
        }

        getUserStats()
        getFact()

    }, [])

    return (
        <div className="user-view">
            <div className="profile-card-container">
                <div className="profile-info">
                    <Image className="profile-picture" src={user.image} roundedCircle />
                    <div className="profile-name">{user.name}</div>
                </div>
                <div className="profile-signout-container">
                    <button
                        onClick={signout}
                        className="profile-signout">
                        Sign out
                            <img
                            src="caret-red.svg"
                            className="dropdown-caret" />
                    </button>
                </div>
            </div>

            <div className="profile-bottom">
                {userStats.mapped_count > 0
                    ? <div>
                        <div className="mappings-container">
                            <div className="mappings-header">
                                <img src="/star-white.svg" />
                                <span className="mappings-title">Your mappings</span>
                            </div>
                            <div className="mappings-list">
                                <div className="profile-fact">
                                    You have mapped {userStats.mapped_count} schools.
                                </div>
                                <hr className="profile-fact-divider" />
                                <div className="profile-fact">
                                    {facts.country_count}
                                </div>
                                <hr className="profile-fact-divider" />
                                <div className="profile-fact">
                                    {facts.top_country}
                                </div>
                                <hr className="profile-fact-divider" />
                                <div className="profile-fact">
                                    {facts.num_locations_mapped_total}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-button">
                            <Link href="/mapping"><Button variant="primary">Map more schools<img src="/white.svg" /></Button>
                            </Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="bottom-button">
                            <Link href="/mapping"><Button variant="primary">Start mapping schools<img src="/white.svg" /></Button>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const ProfilePage = () => {
    const [session, loading] = useSession()
    const router = useRouter()

    const signOutWithRedirect = () => {
        signOut()
        router.push('/')
    }

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

            {!loading && session && <UserView user={session.user} signout={signOutWithRedirect} />}
        </Layout>
    )
}

export default ProfilePage

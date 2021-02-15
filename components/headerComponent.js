import React from 'react'
import Link from 'next/link'
import { signin, signout, useSession } from 'next-auth/client'
import { Navbar, Nav, NavItem, NavLink, Dropdown, Container } from 'react-bootstrap'

const callbackURL = process.env.NEXT_PUBLIC_AUTH_CALLBACK

const SignInButton = ({ inverse }) => {
    return (
        <button
            className={`btn btn-outline-${inverse ? 'dark' : 'light'}`}
            onClick={signin}
        >
            Sign In
        </button>
    )
}

const SignOutButton = ({ inverse }) => {
    return (
        <button
            className={`btn btn-outline-${inverse ? 'dark' : 'light'}`}
            onClick={() => signout({ callbackUrl: callbackURL })}
        >
            Sign Out
        </button>
    )
}

const Header = (props) => {
    const [session, loading] = useSession()
    const inverse = props.inverse

    return (
        <div className={`masthead pt-2${inverse ? ' inverse' : ''}`}>
            <Navbar
                variant={`${inverse ? 'light' : 'dark'}`}
                className="justify-content-between"
            >
                <a href="/" className="masthead-brand">Project Connect</a>
                <Nav>
                    {!session && <SignInButton inverse={inverse} />}
                    {session && !loading && (
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink}>
                                {session.user.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="right">
                                <Dropdown.Item as={Container}>
                                    <Link href="/profile">My Profile</Link>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <SignOutButton inverse={true} />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {session && <li className="nav-item"></li>}
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header

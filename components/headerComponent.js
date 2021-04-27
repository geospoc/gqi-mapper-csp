import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Navbar, Nav, NavItem, Dropdown, Button } from 'react-bootstrap'

import './headerComponent.module.css'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
        className="custom-dropdown-toggle"
        ref={ref}
        onClick={(e) => {
            e.preventDefault()
            onClick(e)
        }}
    >
        <div className="dropdown-toggle-content">
            <div>{children}</div>
            <img src="/white.svg" className="dropdown-toggle-caret" />
        </div>
    </button>
))

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <ul className="custom-dropdown-list">
                    {React.Children.toArray(children)}
                </ul>
            </div>
        )
    },
)

const Header = ({ hideSignIn }) => {
    const [session, loading] = useSession()
    const router = useRouter()

    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';
    const callbackUrl = hostname === 'localhost' ? 'http://localhost:3000/profile' : 'https://'+hostname+'/profile';

    return (
        <Navbar className="justify-content-between">
            <Link href="/">
                <a className="masthead-brand">Project Connect</a>
            </Link>
            <Nav style={{ height: 70 }}>
                {!session && !loading && !hideSignIn && (
                    <NavItem onClick={() => signIn(null, { callbackUrl: callbackUrl })}>
                        <button className="signin-button">Sign in</button>
                    </NavItem>
                )}
                {session && !loading && (
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle
                            as={CustomToggle}
                            id="custom-dropdown-toggle"
                        >
                            {session.user.name.split(' ')[0]}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomMenu} align="right">
                            <Dropdown.Item
                                as={Link}
                                href="/profile"
                                className="profile-link"
                            >
                                <a className="dropdown-item profile-link">
                                    View Profile
                                    <img
                                        src="/blue.svg"
                                        className="dropdown-caret"
                                    ></img>
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                className="signout-button"
                                onClick={() => signOut({callbackUrl: hostname})}
                            >
                                Sign Out
                                <img
                                    src="/caret-red.svg"
                                    className="dropdown-caret"
                                ></img>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Nav>
        </Navbar>
    )
}

export default Header
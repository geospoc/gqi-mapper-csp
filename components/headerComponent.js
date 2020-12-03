import React from "react";
import { signin, signout, useSession } from "next-auth/client";

const callbackURL = process.env.NEXT_PUBLIC_AUTH_CALLBACK;

function Header(props) {
	const [session, loading] = useSession();
	const inverse = props.inverse;

	function SignInButton() {
		return (
			<button
				className={`btn btn-outline-${inverse ? "dark" : "light"}`}
				onClick={signin}
			>
				Sign In
			</button>
		);
	}

	function SignOutButton() {
		return (
			<button
				className={`btn btn-outline-${inverse ? "dark" : "light"}`}
				onClick={() => signout({ callbackUrl: callbackURL })}
			>
				Sign Out
			</button>
		);
	}

	return (
		<header className={`masthead pt-2${inverse ? " inverse" : ""}`}>
			<nav className="navbar">
				<span className="masthead-brand">Project Connect</span>
				{!session && <SignInButton />}
				{session && <SignOutButton />}
			</nav>
		</header>
	);
}

export default Header;

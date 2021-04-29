import Head from "next/head";
import {useRouter} from "next/router";
import {providers} from "next-auth/client";

import Layout from "../components/layout";
import HeaderComponent from "../components/headerComponent";
import FooterComponent from "../components/footerComponent";
import ProviderButtons from "../components/providerButtons";

const SignInError = ({error}) => {
  const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };

  const errorMessage = error && (errors[error] ?? errors.default);

  return <div className="signin-error">{errorMessage}</div>;
};

export default function SignIn({providers}) {
  const {
    query: {callbackUrl, error},
  } = useRouter();

  return (
    <>
      <Head>
        <title>Project Connect</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <HeaderComponent hideSignIn={true} />
        <main>
          <div className="container px-4">
            <div className="signin-title">Sign in to your account</div>
            {error && <SignInError error={error} />}
            <ProviderButtons providers={providers} callbackUrl={callbackUrl} />
            <hr className="signin-divider" />
            <div>
              Don&apos;t have an account yet? No worries, an account will be created on
              your first sign in!
            </div>
          </div>
        </main>
        <FooterComponent />
      </Layout>
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};

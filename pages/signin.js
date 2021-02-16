import Head from 'next/head'
import { useRouter } from 'next/router'
import { providers } from 'next-auth/client'

import Layout from '../components/layout'
import HeaderComponent from '../components/headerComponent'
import ProviderButtons from '../components/providerButtons'

export default function SignIn({ providers }) {
    const {
        query: { callbackUrl },
    } = useRouter()

    return (
        <div>
            <Head>
                <title>Project Connect</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Layout>
                <HeaderComponent />
                <div className="container px-4">
                    <div className="signin-title">Sign in to your account</div>
                    <ProviderButtons
                        providers={providers}
                        callbackUrl={callbackUrl}
                    />
                    <hr className="signin-divider" />
                    <div>
                        Don't have an account yet? No worries, an account will
                        be created on your first sign in!
                    </div>
                </div>
            </Layout>
        </div>
    )
}

SignIn.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    }
}

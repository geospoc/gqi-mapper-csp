import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import Models from '../../../models'

export default (req, res) =>
    NextAuth(req, res, {
        providers: [
            Providers.Facebook({
                clientId: process.env.FACEBOOK_ID,
                clientSecret: process.env.FACEBOOK_SECRET,
            }),
            Providers.GitHub({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }),
        ],

        adapter: Adapters.TypeORM.Adapter(process.env.DATABASE_URL, {
            models: {
                User: Models.User,
            },
        }),

        database: process.env.DATABASE_URL,

        secret: process.env.SECRET,

        session: {
            jwt: true,
        },
        callbacks: {
            signIn: async (user, account, profile) => {
                // Defined on all sign ins, except the first sign in
                if (user.id) {
                    await fetch(
                        `${process.env.NEXTAUTH_URL}/api/saveUserData`,
                        {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                accept: 'application/json',
                            },
                            body: JSON.stringify({
                                user_id: user.id,
                                uuid: req.cookies.uuid,
                            }),
                        },
                    )
                }
                return Promise.resolve(true)
            },

            jwt: async (token, user, account, profile, isNewUser) => {
                // True only on first sign in
                if (isNewUser) {
                    await fetch(
                        `${process.env.NEXTAUTH_URL}/api/saveUserData`,
                        {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                accept: 'application/json',
                            },
                            body: JSON.stringify({
                                user_id: user.id,
                                uuid: req.cookies.uuid,
                            }),
                        },
                    )
                }

                if (user) {
                    token.id = user.uuid
                }

                return Promise.resolve(token)
            },

            session: async (session, user) => {
                session.user.id = user.id
                return Promise.resolve(session)
            },
        },

        debug: false,
    })

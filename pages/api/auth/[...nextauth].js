import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'cookies'

import Models from '../../../models'

export default (req, res) => {

    const cookies = new Cookies(req, res)

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
            jwt: async (token, user, account, profile, isNewUser) => {
                // True only on first sign in
                if (isNewUser) {
                    let uuid = req.cookies.uuid
                    if (!uuid) {
                        uuid = uuidv4()
                    }
                    token.id = uuid
                    await fetch(
                        `${process.env.NEXTAUTH_URL}/api/saveUserUuid`,
                        {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                accept: 'application/json',
                            },
                            body: JSON.stringify({
                                user_id: user.id,
                                uuid: uuid,
                            }),
                        },
                    )
                }
                // On other sign ins
                else if (user) {
                    const session_uuid = req.cookies.uuid
                    if (session_uuid) {
                        await fetch(
                            `${process.env.NEXTAUTH_URL}/api/mergeUuidData`,
                            {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json',
                                    accept: 'application/json',
                                },
                                body: JSON.stringify({
                                    from_uuid: session_uuid,
                                    to_uuid: user.uuid,
                                }),
                            },
                        )
                    }
                    cookies.set('uuid')
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
}

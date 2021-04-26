import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import {v4 as uuidv4} from "uuid";
import Cookies from "cookies";

import Models from "../../../models";

const DATABASE_URL = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`;

export default (req, res) => {
  const cookies = new Cookies(req, res);

  // For more information on each option (and a full list of options) go to
  // https://next-auth.js.org/configuration/options
  return NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers
    providers: [
      Providers.Facebook({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      Providers.Twitter({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],

    // https://next-auth.js.org/schemas/adapters
    adapter: Adapters.TypeORM.Adapter(DATABASE_URL, {
      models: {
        User: Models.User,
      },
    }),

    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/database
    //
    // Notes:
    // * You must to install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    database: DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a seperate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `jwt` is automatically set to `true` if no database is specified.
      jwt: true,

      // Seconds - How long until an idle session expires and is no longer valid.
      // maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
      // A secret to use for key generation (you should set this explicitly)
      // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
      // Set to true to use encryption (default: false)
      // encryption: true,
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in pages.
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
      signIn: "/signin", // Displays signin buttons
      // signOut: '/api/auth/signout', // Displays form with sign out button
      // error: '/api/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/api/auth/verify-request', // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
      jwt: async (token, user, account, profile, isNewUser) => {
        // True only on first sign in
        if (isNewUser) {
          let uuid = req.cookies.uuid;
          if (!uuid) {
            uuid = uuidv4();
          }
          token.id = uuid;
          await fetch(`${process.env.NEXTAUTH_URL}/api/saveUserUuid`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              uuid: uuid,
            }),
          });
        }
        // On other sign ins
        else if (user) {
          const session_uuid = req.cookies.uuid;
          if (session_uuid && session_uuid !== user.uuid) {
            await fetch(`${process.env.NEXTAUTH_URL}/api/mergeUuidData`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify({
                from_uuid: session_uuid,
                to_uuid: user.uuid,
              }),
            });
          }
          token.id = user.uuid;
        }
        cookies.set("uuid");

        return Promise.resolve(token);
      },

      session: async (session, user) => {
        session.user.id = user.id;
        return Promise.resolve(session);
      },
      // signIn: async (user, account, profile) => { return Promise.resolve(true) },
      // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
  });
};

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

# ProjectConnect App

Refer to [unicef/projectconnect-app](https://github.com/unicef/projectconnect-app) for an overview.

## 🛠 Architecture

This webapp is built using [Next.js](https://nextjs.org/) as a React Framework and deployed using [Vercel](https://vercel.com/).

* `pages/_app.js` is the application entry point:
    1. Imports the default Bootstrap stylesheet, and additional styles found in `styles/global.css`
    2. Wraps the application in a `<CookieProvider>` to make available [react-cookie](https://www.npmjs.com/package/react-cookie) throughout the code.
* `pages/index.js` is the first page to load, which imports `components/intro.js`:
    1. Landing page includes static content
    2. links to `pages/start-test.js` and `pages/tips.js`
    3. Includes FAQ as a Bootstrap accordion.
* `pages/tips.js` is primarily static content, pulling images from `public/tips/`
* `pages/start-test.js` is also mostly static content that directs users to `pages/test.js` or `pages/mapping.js`
* `pages/mapping.js` contains most of the logic for the application:
    1. Fetches dataset of schools to validate from API endpoint: `pages/api/getLocations/[uuid].js`
    2. Sets cookie, and adds user to Database (`pages/api/addUser.js`), if cookie is not set
    3. Presents data through frontend, by calling `components/quiz.js
    4. Stores user response through API endpoint: `pages/api/validateLocation.js`
    5. Upon completion, redirects user to `components/result.js`
* `pages/test.js` is a simplified version of `pages/mapping.js` that instead of pulling data from the database, it pulls local data from `pages/api/quizQuestions.js` and does not store any of the user answers. It calls `components/quizTest.js`, analogous to `components/quiz.js`
* `components/quiz.js` iterates through the dataset prompting the user to respond to each location. It calls the `component/mapComponent.js` to render the actual map using Mapbox as the provider through [react-mapbox-gl](https://www.npmjs.com/package/react-mapbox-gl) as bindings for [mapbox-gl](https://docs.mapbox.com/mapbox-gl-js/api/)

## ✏️ Configuration

In order to run this application, you need to set up a [Postgres Database](https://www.postgresql.org/) and open an account with [Mapbox](https://www.mapbox.com/) to obtain an *Access Token*. The following [environment variables](https://nextjs.org/docs/basic-features/environment-variables) need to be set in `.env` or `.env.local`:
```
NEXT_PUBLIC_ACCESS_TOKEN="MAPBOX_ACCESS_TOKEN"
PGUSER="POSTGRES_USER"
PGHOST="POSTGRES_HOST"
PGPASSWORD="POSTGRES_PASSWORD"
PGDATABASE="POSTGRES_DATABASE"
```
To work with the authentication functionalities, you need to add the following entries to the `.env` or `.env.local`:
```
SECRET="A secret to use for key generation"
NEXTAUTH_URL="HOST_URL"
FACEBOOK_ID="YOUR_FACEBOOK_ID"
FACEBOOK_SECRET="YOUR_FACEBOOK_SECRET"
TWITTER_CLIENT_ID="YOUR_TWITTER_CLIENT_ID"
TWITTER_CLIENT_SECRET="YOUR_TWITTER_CLIENT_SECRET"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
NEXT_PUBLIC_AUTH_CALLBACK="HOST_URL"
```
To obtain the secrets, contact one of the contributors.

The [countries.json](data/countries.json) is included in this repository to associate country codes with country names. If this file needs to be updated or replaced, follow these instructions:

1. Download [the JSON file of country names and ISO-3166 alpha-2 codes here](https://datahub.io/core/country-list) from Data Hub. Place the JSON file in `scripts/` of this repository and call it `countryCodes.json`.
2. From the root directory, run `node scripts/createCountryCodesJson.js` to run the script that creates the JSON file the game requires and places it in `data/`. 
3. Verify that the JSON file `countries.json` exists inside `data/` and it is in the format:
```
{
    "Country code": "Country name",
    ...
}
```

## 💻 Development Environment

Setup your development environment as follows:

1. Clone this repo:
    - SSL:
    ```bash
    git clone git@github.com:lacabra/proco-map-app.git
    ```
    - HTTPS:
    ```bash
    git clone https://github.com/lacabra/proco-map-app.git
    ```
2. Install project dependencies:
    ```bash
    cd proco-map-app
    npm install
    ```
3. Set up your local [Postgres Database](https://www.postgresql.org/) and configure the following environment variables in `.env.local`:
    ```bash
    NEXTAUTH_URL=http://localhost:3000
    PGUSER=
    PGHOST=
    PGPASSWORD=
    PGDATABASE=
    ```
5. Open an account with [Mapbox](https://www.mapbox.com/) to obtain an *Access Token*. Add your access token to `.env.local`:   
    ```bash
    NEXT_PUBLIC_ACCESS_TOKEN="YOUR_MAPBOX_ACCESS_TOKEN"
    ```
6. Optional: If you need to test the user authentication, you will need to set up your own credentials with either one of the OAuth providers:
    * RECOMENDED FOR EASIER SETUP: **GitHub**: Follow these [instructions](https://docs.github.com/en/developers/apps/creating-an-oauth-app).
        * Homepage URL: `http://localhost:3000`  
        * Authorization Callback URL: `http://localhost:3000/api/auth/callback/github`
7. Optional: you may get a [*jwt_auto_generated_signing_key* warning](https://github.com/nextauthjs/next-auth/issues/484) that you can resolve by following the instructions on that link, or [these instructions](https://next-auth.js.org/warnings).
8. Run the developmnet server with [fast refresh](https://nextjs.org/docs/basic-features/fast-refresh):
    ```bash
    npm run dev
    ```

## 🗄 Data Ingestion

This application expects a CSV file containing the following data about each school:

* lat
* lon
* id
* country

Name the file `schools.csv` and copy it into the `scripts/` folder. In that folder run:
```bash
node csvToJson.js
```

The above script will generate a file `schools.json` that will be ingested by `db/dbOps.js`.

*Note: For testing purposes a sample `scripts/schools.json` is included in the code repository, which has the same data as the locations used in the [practice test](https://github.com/lacabra/proco-map-app/blob/master/pages/api/getLocationsTest.js), yet in production a different dataset will be used.*

## :memo: License

This software is licensed under the [GNU General Public License](LICENSE) as published by the Free Software Foundation, either version 3 of the License, or
any later version.

```
    ProjectConnect App
    Copyright (C) 2020 UNICEF

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

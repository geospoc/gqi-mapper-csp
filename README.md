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
* `pages/tips.js` is primarily static content, pulling images from `public/tips.js`
* `pages/start-test.js` is also mostly static content that directs users to `pages/test.js` or `pages/mapping.js`
* `pages/mapping.js` contains most of the logic for the application:
    1. Fetches dataset of schools to validate from API endpoint: `pages/api/addUser.js`
    2. Sets cookie, and adds user to Database, if cookie is not set
    3. Presents data through frontend, by calling `components/quiz.js
    4. Stores user response through API endpoint: `pages/api/validateLocation.js`
    5. Upon completion, redirects user to `components/result.js`
* `pages/test.js` is a simplified version of `pages/mapping.js` that instead of pulling data from the database, it pulls local data from `api/quizQuestions.js` and does not store any of the user answers. It calls `components/quizTest.js`, analogous to `components/quiz.js`
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
3. After having set up the proper [Configuration](#%EF%B8%8F-configuration), run the developmnet server with [fast refresh](https://nextjs.org/docs/basic-features/fast-refresh):
    ```bash
    npm run dev
    ```

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

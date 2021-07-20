import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");

const pool = new Pool();

/* Facts must have three components:
 * 1. A key identifier, e.g. top_country, the code to identify the fact. Key identifiers are stored
 * in an array 'factTypes'.
 * 2. A SQL query which gets a table with one column and one row. The column must be
 * named the key identifier and the row must contain the value, e.g. the name of the top country.
 * Queries are stored in an array 'queries' whose order is parallel to that of 'factTypes', i.e. if
 * the fact whose key identifier is 'top_country' is second in the factTypes array mentioned above,
 * its corresponding SQL query must be second in the queries array.
 * 3. A message which is stored in a dictionary 'messages' with the key identifier as the key and the value
 * set to the text which will display on the result page, e.g. Your top country is Antarctica.
 */
export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    var fact = null;
    const user_id = req.query.uuid;
    const type = req.query.type;
    if (uuidValidate(user_id)) {
      // Fact keys
      const factTypes = ["num_locations_mapped_total"];
      // SQL queries which fetch facts
      const queries = [
        `SELECT COUNT(DISTINCT location_id) as num_locations_mapped_total FROM crowdsourcing WHERE location_type ilike '${type}';`,
      ];

      // Fact messages for each fact type
      const getMessage = (factType, answer) => {
        return `You are part of a global movement! Together, players have mapped ${answer} ${type}.`;
        // switch (factType) {
        //   case "country_count":
        //     return `You have mapped locations in ${answer} countr${
        //       answer == 1 ? "y" : "ies"
        //     }.`;
        //   case "top_country":
        //     return `Your top country is ${countryCodes[answer]}.`;
        //   case "num_countries_mapped_total":
        //     return `You are part of a global movement! Together, players have mapped locations in ${answer} countr${
        //       answer == 1 ? "y" : "ies"
        //     }.`;
        //   case "num_locations_mapped_total":
        //     return `You are part of a global movement! Together, players have mapped ${answer} locations.`;
        // }
      };

      // Return random fact for the result page
      if (req.query.page === "result") {
        try {
          const rand = Math.floor(Math.random() * queries.length);
          const factType = factTypes[rand];
          result = await pool.query(queries[rand]);
          const answer = result.rows[0][factType];

          fact = getMessage(factType, answer);
        } catch (e) {
          console.log(e);
        }
        let output = null;
        if (result) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          output = JSON.stringify({message: fact});
        } else {
          res.statusCode = 500;
        }
        res.end(output);
      }

      // Return all the facts for the profile page.
      if (req.query.page === "profile") {
        try {
          const promises = [];
          result = {};

          queries.forEach((query) => promises.push(pool.query(query)));

          const queryResults = await Promise.all(promises);

          queryResults.forEach((queryResult, indx) => {
            const factType = factTypes[indx];

            const answer = queryResult.rows[0][factType];

            result[factType] = getMessage(factType, answer);
          });

          res.statusCode = 200;
          res.end(JSON.stringify(result));
        } catch (e) {
          console.log(e);
        }
      }
    }
  } else {
    // If it's not a GET request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};

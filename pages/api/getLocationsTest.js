const testLocations = [
  {
    id: 1,
    lat: -1.91656,
    lon: 30.10833,
    answer: true,
    country_code: "RW",
  },
  {
    id: 2,
    lat: -1.925156,
    lon: 30.110281,
    answer: false,
    country_code: "RW",
  },
  {
    id: 3,
    lat: -2.02617,
    lon: 30.02317,
    answer: true,
    country_code: "RW",
  },
  {
    id: 4,
    lat: -2.033803,
    lon: 30.022977,
    answer: false,
    country_code: "RW",
  },
  {
    id: 5,
    lat: 17.08438244,
    lon: -61.7566271,
    answer: true,
    country_code: "AG",
  },
  {
    id: 6,
    lat: 17.082966,
    lon: -61.752061,
    answer: false,
    country_code: "AG",
  },
  {
    id: 7,
    lat: 17.08027778,
    lon: -61.8325,
    answer: true,
    country_code: "AG",
  },
  {
    id: 8,
    lat: 17.078865,
    lon: -61.829458,
    answer: false,
    country_code: "AG",
  },
  {
    id: 9,
    lat: 50.637477,
    lon: 71.457674,
    answer: true,
    country_code: "KZ",
  },
  {
    id: 10,
    lat: 50.638657,
    lon: 71.455382,
    answer: false,
    country_code: "KZ",
  },
  {
    id: 11,
    lat: 50.285003,
    lon: 57.16979,
    answer: true,
    country_code: "KZ",
  },
  {
    id: 12,
    lat: 50.271741,
    lon: 57.168882,
    answer: false,
    country_code: "KZ",
  },
  {
    id: 13,
    lat: 13.1449,
    lon: -61.1946,
    answer: true,
    country_code: "VC",
  },
  {
    id: 14,
    lat: 13.141533,
    lon: -61.194906,
    answer: false,
    country_code: "VC",
  },
];

export default async (req, res) => {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testLocations));
  } else {
    // If it's not a GET request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};

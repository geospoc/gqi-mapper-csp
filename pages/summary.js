import React, {useState, useEffect} from "react";
import {Table} from "react-bootstrap";

function BarSVG({data}) {
  const wy = (data.yes / (data.yes + data.no + data.maybe)) * 100;
  const wn = (data.no / (data.yes + data.no + data.maybe)) * 100;
  const wm = (data.maybe / (data.yes + data.no + data.maybe)) * 100;

  const widthy = wy + "%";
  const widthn = wn + "%";
  const xn = 100 - wn + "%";
  const widthm = wm + "%";
  const xm = wy + "%";

  return (
    <svg width="100%" height="25">
      <g className="bars">
        <rect fill="#d3d3d3" width="100%" height="25"></rect>
        <rect fill="#b6d7a8" width={widthy} height="25"></rect>
        <rect fill="#ea9999" width={widthn} height="25" x={xn}></rect>
        <rect fill="#ffe599" width={widthm} height="25" x={xm}></rect>
      </g>
    </svg>
  );
}

export default function summary() {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState({});
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Get Summary of results
      const result = await fetch("/api/summaryResults");
      setResults(await result.json());

      const locations = await fetch("/api/getLocationIds");
      setLocations(await locations.json());

      const users = await fetch("/api/summaryUsers");
      setUsers(await users.json());
    }
    fetchData();
  }, []);

  useEffect(() => {
    let obj = {};

    for (let i = 1; i < locations.length; i++) {
      obj[locations[i].school_id] = {yes: 0, no: 0, maybe: 0};
    }

    results.forEach((e) => {
      if (!obj[e.school_id]) {
        obj[e["school_id"]] = {yes: 0, no: 0, maybe: 0};
      }
      obj[e["school_id"]][e["result"]] = Number(e.count);
    });
    setSummary(obj);
    console.log(obj);
  }, [results, locations]);

  return (
    <div className="tableResults">
      <h2 className="text-center">Summary of Results</h2>
      <p>&nbsp;</p>
      <Table size="sm">
        <thead>
          <tr>
            <th>School ID</th>
            <th className="text-center">Yes</th>
            <th className="text-center">No</th>
            <th className="text-center">Not Sure</th>
            <th>Distribution</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(summary).map((k, i) => (
            <tr key={i}>
              <td>{k}</td>
              <td className="text-center">{summary[k].yes}</td>
              <td className="text-center">{summary[k].no}</td>
              <td className="text-center">{summary[k].maybe}</td>
              <td>
                <BarSVG data={summary[k]} />
              </td>
              <td className="text-center">
                {summary[k].yes + summary[k].no + summary[k].maybe}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p>&nbsp;</p>

      <Table size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th className="text-right">Schools Tagged</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users).map((k, i) => (
            <tr key={i}>
              <td>{k}</td>
              <td>{users[k].user_id}</td>
              <td className="text-right">{users[k].count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

//{summary.map((e,i) => (
//			<div key={i}>{e.yes} - {e.no} - {e.maybe}</div>))}

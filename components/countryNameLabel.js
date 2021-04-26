import React from "react";

const CountryNameLabel = ({countryName}) => {
  return (
    <div id="countryName">
      <img
        style={{paddingBottom: "0.2em"}}
        src="icons/location-blue.svg"
        width="14"
      ></img>
      &nbsp;
      {countryName}
    </div>
  );
};

export default CountryNameLabel;

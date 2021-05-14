import React from "react";
import PropTypes from "prop-types";
import {isMobile} from "react-device-detect";

function QuestionCount(props) {
  return (
    <h2 className="questionCount">
      <span>{props.counter + 1}</span>/<span>{props.total}</span>
      {!isMobile && (
        <span className="col-sm-12 text-right" style={{marginLeft: "14rem"}}>
          <button
            type="button"
            onClick={props.handleShow}
            className="btn btn-warning"
            style={{
              color: "white",
              fontSize: "14px",
              backgroundColor: "#18A0FB",
              borderWidth: 0,
              marginBottom: 2,
              marginTop: 0,
            }}
          >
            Keyboard Shortcuts
          </button>
        </span>
      )}
    </h2>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default QuestionCount;

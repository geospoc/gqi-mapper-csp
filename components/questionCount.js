import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount(props) {
  return (
    <h2 className="questionCount">
      <span>{props.counter}</span>/<span>{props.total}</span>
    </h2>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
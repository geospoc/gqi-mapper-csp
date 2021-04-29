import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;

  progress[value] {
    width: ${(props) => props.width};
    appearance: none;

    ::-webkit-progress-bar {
      height: 10px;
      border-radius: 20px;
      background-color: #eeeeee;
    }

    ::-webkit-progress-value {
      height: 10px;
      border-radius: 20px;
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: 11% auto 11%;
    span {
      font-size: 12px;
      text-transform: uppercase;
    }
  }

  .bar-chosen.yes {
    progress[value] {
      ::-webkit-progress-value {
        background-color: #8dd240;
      }
    }

    span {
      color: #8dd240;
    }
  }

  .bar-chosen.no {
    progress[value] {
      ::-webkit-progress-value {
        background-color: #fc625f;
      }
    }

    span {
      color: #fc625f;
    }
  }

  .bar-chosen.maybe {
    progress[value] {
      ::-webkit-progress-value {
        background-color: #fec84c;
      }
    }

    span {
      color: #fec84c;
    }
  }

  .bar-unchosen {
    progress[value] {
      ::-webkit-progress-value {
        background-color: #a9a9a9;
      }
    }

    span {
      color: #a9a9a9;
    }
  }

  progress {
    vertical-align: middle;
    text-align: center;
  }

  #label {
    text-align: right;
  }

  #percentage {
    text-align: left;
  }

  #progress-bar {
    text-align: center;
  }
`;

const ProgressBar = (props) => {
  const {value, answer, max, label, chosen, width} = props;

  return (
    <Container value={value} answer={answer} width={width} chosen={chosen} label={label}>
      <div
        className={
          chosen == true
            ? `grid-container bar-chosen ${answer}`
            : "grid-container bar-unchosen"
        }
      >
        <span id="label">{label}&nbsp;</span>
        <div>
          <progress id="progress-bar" label={label} value={value} max={max} />
        </div>
        <span id="percentage">&nbsp;{((value / max) * 100).toFixed(2)}%</span>
      </div>
    </Container>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  answer: PropTypes.string,
  max: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
};

ProgressBar.defaultProps = {
  max: 100,
  width: "100%",
  chosen: true,
};

export default ProgressBar;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	text-align: center;

	progress[value]{
		width: ${props => props.width};
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

	.bar-chosen {
		color: red;
  		progress[value]{
			::-webkit-progress-value {
				background-color: #0068ea;
			}
		}

		span {
			color: #0068ea;
		}
	}

	.bar-unchosen {
		progress[value]{
			::-webkit-progress-value {
				background-color: #808080;
			}
		}

		span {
			color: #808080;
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

const ProgressBar = props => {
	const { value, max, label, chosen, width } = props;

	return (
		<Container value={value} width={width} chosen={chosen} label={label} >
			<div class={chosen == true ? 'grid-container bar-chosen' : 'grid-container bar-unchosen'}>
				<span id='label'>{label}&nbsp;</span>
				<div><progress id='progress-bar' label={label} value={value} max={max} /></div>
				<span id='percentage'>&nbsp;{((value / max) * 100).toFixed(2)}%</span>
			</div>
		</Container>);
}

ProgressBar.propTypes = {
	value: PropTypes.number.isRequired,
	max: PropTypes.number,
	label: PropTypes.string,
	color: PropTypes.string,
	width: PropTypes.string
}

ProgressBar.defaultProps = {
	max: 100,
	width: '100%',
	chosen: true
}

export default ProgressBar;
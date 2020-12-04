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
			background-color: #eee;
		}

		::-webkit-progress-value {
			height: 10px;
			border-radius: 20px;
			background-color: ${props => props.color};
		}
		vertical-align: middle;
	}

	span {
		font-size: 12px;
		text-transform: uppercase;
		color: ${props => props.color};
	}
`;

const ProgressBar = props => {
	const { value, max, label, color, width } = props;

	return (
		<Container value={value} width={width} color={color} label={label} >
			<span>{label}</span>&nbsp;
			<progress label={label} value={value} max={max} />&nbsp;
			<span>{((value / max) * 100).toFixed(2)}%</span>
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
	color: '#0068ea',
	width: '80%'
}

export default ProgressBar;
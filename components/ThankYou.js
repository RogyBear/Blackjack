import React from 'react';

export default function ThankYou(props) {
	let style;
	if (props.startFade) {
		style = { animation: 'fade-in .7s forwards' };
	}
	return (
		<div className="thanks" style={style}>
			{props.message.message}
		</div>
	);
}

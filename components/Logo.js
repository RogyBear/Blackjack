import React, { Fragment, useContext } from 'react';
import Router, { useRouter } from 'next/router';
// import ReactVivus from 'react-vivus';
import { LogoContext } from '../contexts/LogoContext';
export default function Logo() {
	const { logoLoad, setLogoLoad } = useContext(LogoContext);
	const router = useRouter();
	let backgroundAnimation = { zIndex: '-1', opacity: 0 };
	let logoAnimation;
	let logoAnimationFinish;
	const handleAnimation = () => {
		setTimeout(() => {
			setLogoLoad(true);
		}, 1000);
	};

	if (router.pathname === '/' && logoLoad === false) {
		logoAnimation = {
			animation: 'opacityFill 3s forwards, flyLeft 3s 1s',
			animationFillMode: 'forwards'
		};

		backgroundAnimation = {
			animationName: 'opacityFillReverse',
			animationDuration: '2s',
			animationFillMode: 'forwards',
			animationDelay: '1s'
		};
	} else {
		logoAnimation = {
			animation: 'flyLeftHold forwards'
		};
	}

	return (
		<Fragment>
			<div
				className="logo__background"
				style={logoLoad === false ? backgroundAnimation : { zIndex: '-1', opacity: 0 }}
				onAnimationEnd={handleAnimation}
			/>
			<img
				className="logo__img"
				src="../static/logo_house.svg"
				style={logoLoad === false ? logoAnimation : logoAnimation}
			/>
		</Fragment>
	);
}

// style={logoLoad === false ? logoAnimation : {}}

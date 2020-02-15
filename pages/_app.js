import React, { Fragment } from 'react';
import App from 'next/app';
import Logo from '../components/Logo';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../static/main.scss';

import { Helmet } from 'react-helmet';
import { PageTransition } from 'next-page-transitions';
import { LogoContext, LogoProvider } from '../contexts/LogoContext';
class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Fragment>
				<Helmet>
					<link
						href="https://fonts.googleapis.com/css?family=Raleway:600,700&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						charset="UTF-8"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
					/>
				</Helmet>
				<Nav />
				<LogoProvider>
					<Logo />
					<PageTransition timeout={300} classNames="page-transition">
						<Component {...pageProps} />
					</PageTransition>
				</LogoProvider>
				<Footer />
				<style jsx global>{`
					.page-transition-enter {
						opacity: 0;
					}
					.page-transition-enter-active {
						opacity: 1;
						transition: opacity 300ms;
					}
					.page-transition-exit {
						opacity: 1;
					}
					.page-transition-exit-active {
						opacity: 0;
						transition: opacity 300ms;
					}
				`}</style>
			</Fragment>
		);
	}
}

export default MyApp;

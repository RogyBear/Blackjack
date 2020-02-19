import React from 'react';
import axios from 'axios';
import Link from 'next/link';
console.log(process.env.BLACKJACKCMS);
export default function Service(props) {
	return (
		<div className="service">
			<div className="service__upper-section">
				<div className="service__upper-section__picture">
					<img className="service__upper-section__picture__img" src={`${props.entries[0].picture[0].url}`} />
				</div>
				<div className="service__upper-section__text">
					<h1 className="service__upper-section__text__title">{props.entries[0].title}</h1>
					<p className="service__upper-section__text__paragraph-one">
						<span className="service__upper-section__text__paragraph-one__bold">
							{props.entries[0].description_bold} <br />
							<br />
						</span>
						{props.entries[0].description}
					</p>
					<Link href="/contact">
						<button className="service__upper-section__text__button">Get in touch!</button>
					</Link>
				</div>
			</div>
			<div className="service__lower-section">
				<div className="service__lower-section__picture">
					<img className="service__lower-section__picture__img" src={`${props.entries[1].picture[0].url}`} />
				</div>
				<div className="service__lower-section__text">
					<h1 className="service__lower-section__text__title">{props.entries[1].title}</h1>
					<p className="service__lower-section__text__paragraph-one">
						<span className="service__lower-section__text__paragraph-one__bold">
							{props.entries[1].description_bold} <br />
							<br />
						</span>
						{props.entries[1].description}
					</p>
					<Link href="/contact">
						<button className="service__upper-section__text__button">Get in touch!</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

Service.getInitialProps = async () => {
	const res = await axios.get(`${process.env.BLACKJACKCMS}/services`);
	const { data } = res;
	return {
		entries: data
	};
};

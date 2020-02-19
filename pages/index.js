import React from 'react';
import axios from 'axios';
import MainSlider from '../components/MainSlider';
import Link from 'next/link';
export default function Index(props) {
	return (
		<div className="main">
			<div className="main__upper-box">
				<div className="main__upper-box__picture">
					<img className="main__upper-box__picture__img" src={`${props.entries[0].picture[0].url}`} />
				</div>

				<div className="main__upper-box__text-boxes">
					<div className="main__upper-box__text-boxes__black">
						<p className="main__upper-box__text-boxes__black__text">{props.entries[0].black_box}</p>
						<Link href="/service">
							<button className="main__upper-box__text-boxes__black__btn">Go To Service</button>
						</Link>
					</div>
					<div className="main__upper-box__text-boxes__white">
						<p className="main__upper-box__text-boxes__white__text">{props.entries[0].white_box}</p>
					</div>
				</div>
			</div>
			<div className="main__quote">
				<p className="main__quote__text">the house always wins</p>
			</div>
			<MainSlider data={props.entries[0].home_slider} />
		</div>
	);
}

Index.getInitialProps = async () => {
	const res = await axios.get(`${process.env.BLACKJACKCMS}/homes`);

	const { data } = res;

	return {
		entries: data
	};
};

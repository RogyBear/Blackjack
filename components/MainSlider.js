import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

export default class MainSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nav1: null,
			nav2: null
		};
	}

	componentDidMount() {
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2
		});
	}

	render() {
		const data = this.props.data;
		console.log(data);
		return (
			<div className="main-slider">
				<div className="main-slider__orange-box">
					<div className="main-slider__orange-box__text-slider">
						<Slider
							asNavFor={this.state.nav2}
							ref={(slider) => (this.slider1 = slider)}
							fade={true}
							dots={false}
							arrows={false}
						>
							{data.map((e) => {
								return (
									<div className="main-slider__orange-box__text-slider__slides">
										<h2 className="main-slider__orange-box__text-slider__slides__title">
											{e.title}
										</h2>
										<p className="main-slider__orange-box__text-slider__slides__description">
											{' '}
											{e.description}
										</p>
									</div>
								);
							})}
						</Slider>
						<Link href="gallery">
							<button className="main-slider__orange-box__text-slider__button">Go to Gallery</button>
						</Link>
					</div>
				</div>
				<div className="main-slider__slider">
					<Slider
						asNavFor={this.state.nav1}
						ref={(slider) => (this.slider2 = slider)}
						swipeToSlide={true}
						focusOnSelect={true}
						fade={true}
						dots={false}
						arrows={false}
						autoplay={true}
						infinite={true}
						autoplaySpeed={4500}
					>
						{data.map((e) => {
							return (
								<div className="main-slider__slider__slides">
									<img src={`http://localhost:1337${e.image.url}`} />
								</div>
							);
						})}
					</Slider>
				</div>
			</div>
		);
	}
}

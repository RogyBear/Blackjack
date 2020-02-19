import React from 'react';
import GallerySlider from 'react-slick';
import axios from 'axios';
export default function Gallery(props) {
	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		slidesToShow: 3,
		speed: 500,
		cssEase: 'ease-out'
	};
	return (
		<div className="gallery">
			{props.pictures.map((e) => (
				<div className="gallery__slider">
					<h2 className="gallery__slider__title">{e.title}</h2>
					<GallerySlider {...settings}>
						{e.image.map((image) => (
							<div className="gallery__slider__slide">
								<div className="gallery__slider__slide__content">
									<img src={`${image[0].url}`} />
								</div>
							</div>
						))}
					</GallerySlider>
				</div>
			))}
		</div>
	);
}

Gallery.getInitialProps = async () => {
	const res = await axios.get(`${process.env.BLACKJACKCMS}/galleries`);
	const { data } = res;
	return { pictures: data };
};

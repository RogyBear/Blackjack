import React from 'react';
import axios from 'axios';
export default function Career(props) {
	return (
		<div className="career">
			<div className="career__upper-section">
				<div className="career__upper-section__picture">
					<img
						className="career__upper-section__picture__img"
						src={`http://localhost:1337${props.entries[0].picture.url}`}
					/>
				</div>
				<div className="career__upper-section__text">
					<h1 className="career__upper-section__text__title">{props.entries[0].title}</h1>
					<p className="career__upper-section__text__paragraph-one">
						<span className="career__upper-section__text__paragraph-one__bold">
							{props.entries[0].description_bold} <br />
							<br />
						</span>
						{props.entries[0].upper_description}
					</p>
				</div>
			</div>
			<div className="career__lower-section">
				<p className="career__lower-section__paragraph">{props.entries[0].lower_description}</p>
				<form className="career__lower-section__form">
					<h2 className="career__lower-section__form__title">{props.entries[0].lower_title}</h2>
					<div className="career__lower-section__form__upper">
						<div className="career__lower-section__form__group">
							<input
								type="text"
								className="career__lower-section__form__input"
								placeholder="First Name"
							/>
							<label htmlFor="file-upload" className="career__lower-section__form__input file-upload">
								Upload Resume
							</label>
							<input type="file" id="file-upload" className="career__lower-section__form__input file" />
						</div>

						<div className="career__lower-section__form__group">
							<input type="text" className="career__lower-section__form__input" placeholder="Last Name" />
							<input
								type="email"
								className="career__lower-section__form__input"
								placeholder="Email Address"
							/>
						</div>
					</div>
					<div className="career__lower-section__form__lower">
						<div className="career__lower-section__form__group">
							<input type="submit" value="Submit" className="career__lower-section__form__input" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

Career.getInitialProps = async () => {
	const res = await axios.get('http://localhost:1337/careers');
	const { data } = res;
	return {
		entries: data
	};
};

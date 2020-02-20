import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import ThankYou from '../components/ThankYou';
export default function Career(props) {
	// State for contact information
	const [ career, setCareer ] = useState({ code: 'career', fileTarget: null });
	const [ firstRender, setFirstRender ] = useState(false);
	const [ file, setFile ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const [ required, setRequired ] = useState(true);
	const [ thankYou, setThankYou ] = useState(false);
	const [ thankYouMessage, setThankYouMessage ] = useState({ message: null });
	// Handler functions for the form

	const handleUpload = (e) => {
		let file = e.target.files[0];
		setFile(file);
		setCareer((prevState) => ({
			...prevState,
			file: file.name
		}));
	};
	useEffect(
		() => {
			if (firstRender === true) {
				console.log('file target called');
				axios
					.post(`${process.env.BLACKJACKCMS}/email`, career, {
						headers: { 'Content-Type': 'application/json' }
					})
					.then((res) => {
						console.log('Email Sent Successfully');
						setLoading(false);
						setThankYou(true);
						setThankYouMessage({
							message: 'Your resume was sent successfully.'
						});
					})
					.catch((err) => {
						setLoading(false);
						setThankYou(true);
						setThankYouMessage({
							message: 'There was an error sending your resume. Please try again later'
						});
					});
			}
			setFirstRender(true);
		},
		[ career.fileTarget ]
	);
	const handleSubmit = async (e) => {
		e.preventDefault();
		//Axios Post Request
		setRequired(false);
		setLoading(true);
		const formData = new FormData(e.target);
		let fileName = file.name.split('.');

		formData.append('file', file, fileName[0]);

		axios
			.post(`${process.env.BLACKJACKCMS}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((res) => {
				console.log(res.data);
				setCareer((prevState) => ({
					...prevState,
					fileTarget: res.data[0].url
				}));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setCareer((prevState) => ({
			...prevState,
			[name]: value
		}));
	};
	const override = css`
		display: block;
		position: absolute;
		right: 23px;
		top: 26%;
		border-color: white;
	`;
	return (
		<div className="career">
			<div className="career__upper-section">
				<div className="career__upper-section__picture">
					<img className="career__upper-section__picture__img" src={`${props.entries[0].picture[0].url}`} />
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
				<form onSubmit={handleSubmit} className="career__lower-section__form">
					<h2 className="career__lower-section__form__title">{props.entries[0].lower_title}</h2>
					<div className="career__lower-section__form__upper">
						<div className="career__lower-section__form__group">
							<input
								disabled={!required}
								required={required}
								onChange={handleChange}
								type="text"
								className="career__lower-section__form__input"
								name="firstName"
								placeholder="First Name"
							/>
							<label
								htmlFor="file-upload"
								style={!required === true ? { cursor: 'default' } : {}}
								className="career__lower-section__form__input file-upload"
							>
								Upload Resume
							</label>
							<input
								disabled={!required}
								required={required}
								onChange={handleUpload}
								type="file"
								id="file-upload"
								name="files"
								className="career__lower-section__form__input file"
							/>
							<div className="file-upload__name">{career.file}</div>
						</div>

						<div className="career__lower-section__form__group">
							<input
								disabled={!required}
								required={required}
								onChange={handleChange}
								type="text"
								className="career__lower-section__form__input"
								name="lastName"
								placeholder="Last Name"
							/>
							<input
								disabled={!required}
								required={required}
								onChange={handleChange}
								type="email"
								className="career__lower-section__form__input"
								name="email"
								placeholder="Email Address"
							/>
						</div>
					</div>
					<div className="career__lower-section__form__lower">
						{thankYou ? (
							<ThankYou startFade={thankYou} message={thankYouMessage} />
						) : (
							<div className="career__lower-section__form__group career-submit">
								<input
									style={!required === true ? { cursor: 'default' } : {}}
									disabled={!required}
									type="submit"
									value={loading ? 'Please Wait...' : 'Submit'}
									className="career__lower-section__form__input career-submit__btn"
								/>
								<ClipLoader css={override} size={23} loading={loading} />
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

Career.getInitialProps = async () => {
	const res = await axios.get(`${process.env.BLACKJACKCMS}/careers`);
	const { data } = res;
	return {
		entries: data
	};
};

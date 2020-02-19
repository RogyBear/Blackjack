import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Career(props) {
	// State for contact information
	const [ career, setCareer ] = useState({ code: 'career', fileTarget: null });
	const [ firstRender, setFirstRender ] = useState(false);
	const [ file, setFile ] = useState({});
	const ref = React.createRef();
	// Handler functions for the form
	const formElem = ref;
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
					})
					.catch((err) => {
						console.log(err);
						console.log('Error, could not send email');
					});
			}
			setFirstRender(true);
		},
		[ career.fileTarget ]
	);
	const handleSubmit = async (e) => {
		e.preventDefault();
		//Axios Post Request
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
				<form onSubmit={handleSubmit} ref={ref} className="career__lower-section__form">
					<h2 className="career__lower-section__form__title">{props.entries[0].lower_title}</h2>
					<div className="career__lower-section__form__upper">
						<div className="career__lower-section__form__group">
							<input
								onChange={handleChange}
								type="text"
								className="career__lower-section__form__input"
								name="firstName"
								placeholder="First Name"
							/>
							<label htmlFor="file-upload" className="career__lower-section__form__input file-upload">
								Upload Resume
							</label>
							<input
								onChange={handleUpload}
								type="file"
								id="file-upload"
								name="files"
								className="career__lower-section__form__input file"
							/>
						</div>

						<div className="career__lower-section__form__group">
							<input
								onChange={handleChange}
								type="text"
								className="career__lower-section__form__input"
								name="lastName"
								placeholder="Last Name"
							/>
							<input
								onChange={handleChange}
								type="email"
								className="career__lower-section__form__input"
								name="email"
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
	const res = await axios.get(`${process.env.BLACKJACKCMS}/careers`);
	const { data } = res;
	return {
		entries: data
	};
};

import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import ThankYou from '../components/ThankYou';
export default function Contact(props) {
	const options = [
		{ value: 'commercial', label: 'Commercial Inquiry' },
		{ value: 'residential', label: 'Residential Inquiry' },
		{ value: 'other', label: 'Other' }
	];
	//Styles
	const override = css`
		display: block;
		border-color: #ff6e21;
	`;
	// State for contact information
	const [ contact, setContact ] = useState({ code: 'contact' });
	const [ selectedOption, setSelectedOption ] = useState();
	const [ loading, setLoading ] = useState(false);
	const [ thankYou, setThankYou ] = useState(false);
	const [ thankYouMessage, setThankYouMessage ] = useState({ message: null });

	// Handler functions (state change)
	const handleChange = (e) => {
		const { name, value } = e.target;

		setContact((prevState) => ({
			...prevState,
			[name]: value
		}));
		console.log(contact);
	};
	const handleSelectedOption = (selectedOption) => {
		setSelectedOption(selectedOption);
		setContact((prevState) => ({
			...prevState,
			subject: selectedOption.label
		}));
	};

	// Handle Submit function for the form

	const handleSubmit = (e) => {
		e.preventDefault();
		//Axios Post Request
		setLoading(true);
		axios
			.post(`${process.env.BLACKJACKCMS}/email`, contact, { headers: { 'Content-Type': 'application/json' } })
			.then((res) => {
				setThankYou(true);
				setThankYouMessage({
					message: 'Your message was sent successfully. We will be in contact with you shortly. '
				});
			})
			.catch((err) => {
				setThankYou(true);
				setThankYouMessage({ message: 'There was an error sending your message. Please try again later. ' });
			});
	};

	return (
		<div className="contact">
			<h1 className="contact__title">{props.entries[0].orange_title}</h1>
			<div className="contact__information">
				<div className="contact__information__text">
					<h2 className="contact__information__text__title">{props.entries[0].white_title}</h2>
					<p className="contact__information__text__line">{props.entries[0].line_one}</p>
					<p className="contact__information__text__line">{props.entries[0].line_two}</p>
					<p className="contact__information__text__line">{props.entries[0].line_three}</p>

					<form onSubmit={handleSubmit} className="contact__information__text__form">
						<div className="contact__information__text__form__row">
							<div className="contact__information__text__form__group">
								<label htmlFor="name">First Name</label>
								<input
									disabled={loading}
									required={!loading}
									onChange={handleChange}
									className="contact__information__text__form__input"
									id="firstName"
									name="firstName"
									type="text"
								/>
							</div>

							<div className="contact__information__text__form__group">
								<label htmlFor="name">Last Name</label>
								<input
									disabled={loading}
									required={!loading}
									onChange={handleChange}
									className="contact__information__text__form__input"
									id="lastName"
									name="lastName"
									type="text"
								/>
							</div>
						</div>
						<div className="contact__information__text__form__row email-row">
							<label htmlFor="email">Email Address</label>
							<input
								disabled={loading}
								required={!loading}
								onChange={handleChange}
								className="contact__information__text__form__input email"
								id="email"
								name="email"
								type="email"
							/>
						</div>
						<div className="contact__information__text__form__row email-row">
							<label htmlFor="subject">Subject</label>
							<Select
								isDisabled={loading}
								onChange={handleSelectedOption}
								className="react-select"
								classNamePrefix="react-select"
								name="subject"
								value={selectedOption}
								theme={(theme) => ({
									...theme,
									borderRadius: 0,
									control: {
										padding: '2rem',
										background: '#eee',
										border: 'none'
									},
									colors: {
										neutral0: '#eee',
										primary25: '#ff6e21',
										primary: '#333'
									}
								})}
								options={options}
							/>
						</div>
						<div className="contact__information__text__form__row text-row">
							<label htmlFor="message">Message</label>
							<textarea
								disabled={loading}
								required={!loading}
								className="contact__information__text__form__input text-box"
								onChange={handleChange}
								name="message"
								id="message"
								type="email"
							/>
						</div>
						<div className="contact__information__text__form__row submit">
							{thankYou ? (
								<ThankYou startFade={thankYou} message={thankYouMessage} />
							) : (
								<div className="submit__transition">
									<button
										disabled={loading}
										style={loading ? { cursor: 'default' } : { cursor: 'pointer' }}
										className="contact__information__text__form__button"
									>
										Submit
									</button>
									<ClipLoader css={override} loading={loading} />{' '}
								</div>
							)}
						</div>
					</form>
				</div>

				<img className="contact__information__img" src={`${props.entries[0].picture[0].url}`} />
			</div>
		</div>
	);
}

Contact.getInitialProps = async () => {
	const res = await axios.get(`${process.env.BLACKJACKCMS}/contacts`);
	const { data } = res;
	return {
		entries: data
	};
};

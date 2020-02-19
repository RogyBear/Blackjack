import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
export default function Contact(props) {
	const options = [
		{ value: 'commercial', label: 'Commercial Inquiry' },
		{ value: 'residential', label: 'Residential Inquiry' },
		{ value: 'other', label: 'Other' }
	];

	// State for contact information
	const [ contact, setContact ] = useState({code: 'contact'});
	const [ selectedOption, setSelectedOption ] = useState();

	// Handler functions for the form

	const handleSubmit = (e) => {
		e.preventDefault();
		//Axios Post Request
		axios
			.post(`${process.env.BLACKJACKCMS}/email`, contact, { headers: { 'Content-Type': 'application/json' } })
			.then((res) => {
				console.log('Email Sent Successfully');
			})
			.catch((err) => {
				console.log(err);
				console.log('Error, could not send email');
			});
	};
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
										primary: '#333',
										neutral90: '#eee',
										neutral70: '#eee'
									}
								})}
								options={options}
							/>
						</div>
						<div className="contact__information__text__form__row text-row">
							<label htmlFor="message">Message</label>
							<textarea
								className="contact__information__text__form__input text-box"
								onChange={handleChange}
								name="message"
								id="message"
								type="email"
							/>
						</div>
						<div className="contact__information__text__form__row ">
							<button className="contact__information__text__form__button">Submit</button>
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

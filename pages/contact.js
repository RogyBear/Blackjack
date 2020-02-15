import React from 'react';
import axios from 'axios';
import Select from 'react-select';
export default function Contact(props) {
	const options = [
		{ value: 'commercial', label: 'Commercial Inquiry' },
		{ value: 'residential', label: 'Residential Inquiry' },
		{ value: 'other', label: 'Other' }
	];

	const customStyles = {
		borderBottom: '1px dotted pink',
		color: 'red',
		padding: 20
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

					<form className="contact__information__text__form">
						<div className="contact__information__text__form__row">
							<div className="contact__information__text__form__group">
								<label htmlFor="name">First Name</label>
								<input className="contact__information__text__form__input" id="name" type="text" />
							</div>

							<div className="contact__information__text__form__group">
								<label htmlFor="name">Last Name</label>
								<input className="contact__information__text__form__input" id="name" type="text" />
							</div>
						</div>
						<div className="contact__information__text__form__row email-row">
							<label htmlFor="email">Email Address</label>
							<input className="contact__information__text__form__input email" id="email" type="email" />
						</div>
						<div className="contact__information__text__form__row email-row">
							<label htmlFor="subject">Subject</label>
							<Select
								className="react-select"
								classNamePrefix="react-select"
								defaultValue={options[0]}
								id="subject"
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
								id="message"
								type="email"
							/>
						</div>
						<div className="contact__information__text__form__row ">
							<button className="contact__information__text__form__button">Submit</button>
						</div>
					</form>
				</div>

				<img
					className="contact__information__img"
					src={`http://localhost:1337${props.entries[0].picture.url}`}
				/>
			</div>
		</div>
	);
}

Contact.getInitialProps = async () => {
	const res = await axios.get(`http://localhost:1337/contacts`);
	const { data } = res;
	return {
		entries: data
	};
};

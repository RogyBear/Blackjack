import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function nav({ href }) {
	const router = useRouter();
	const path = router.route;

	const style = {
		color: '#ff6e21'
	};

	return (
		<nav className="nav">
			<ul className="nav__list">
				<li className="nav__list__item">
					<Link href="/">
						<a className="nav__list__item__link" style={path === '/index' ? style : { color: 'white' }}>
							Home
						</a>
					</Link>
				</li>
				<li className="nav__list__item">
					<Link href="/service">
						<a className="nav__list__item__link" style={path === '/service' ? style : { color: 'white' }}>
							Service
						</a>
					</Link>
				</li>
				<li className="nav__list__item">
					<Link href="/gallery">
						<a className="nav__list__item__link" style={path === '/gallery' ? style : { color: 'white' }}>
							Gallery
						</a>
					</Link>
				</li>
				<li className="nav__list__item">
					<Link href="/career">
						<a className="nav__list__item__link" style={path === '/career' ? style : { color: 'white' }}>
							Career
						</a>
					</Link>
				</li>
				<li className="nav__list__item">
					<Link href="/contact">
						<a className="nav__list__item__link" style={path === '/contact' ? style : { color: 'white' }}>
							Contact
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

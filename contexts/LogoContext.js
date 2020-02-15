import React, { createContext, useState, useEffect } from 'react';

export const LogoContext = createContext();
export function LogoProvider(props) {
	// if (typeof window !== undefined) {
	// 	sessionStorage.setItem('logo', logoLoad);

	// }
	const [ logoLoad, setLogoLoad ] = useState(false);
	useEffect(
		() => {
			window.sessionStorage.setItem('logo', logoLoad);
		},
		[ logoLoad ]
	);
	return <LogoContext.Provider value={{ logoLoad, setLogoLoad }}>{props.children}</LogoContext.Provider>;
}

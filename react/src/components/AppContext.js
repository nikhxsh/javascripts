import React from 'react';

const AppConfiguration = {
	searchToken: "Initial Search Token"
};

export const AppContext = React.createContext({ searchToken: AppConfiguration.searchToken });
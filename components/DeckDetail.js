import React from 'react';
import {View, Text} from "react-native";

/**
 * Component that shows the details of a deck
 * @param title - the title of the deck
 */
export const DeckDetail = ({route: {params: {title}}}) => {
	return (
		<View>
			<Text>{title}</Text>
		</View>
	);
};
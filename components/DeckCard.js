import React from 'react';
import {Text} from "react-native";
import {View} from "react-native-web";

/**
 * Component that represents a deck card
 * @param title - the title of the deck
 * @param numberOfCards - the number of cards in the deck
 */
export const DeckCard = ({title, numberOfCards}) => {
	return (
		<View>
			<Text>{title}</Text>
			<Text>{numberOfCards} cards</Text>
		</View>
	)
};
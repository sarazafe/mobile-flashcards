import React from 'react';
import {Text, TouchableOpacity} from "react-native";

/**
 * Component that represents a deck card
 * @param title - the title of the deck
 * @param numberOfCards - the number of cards in the deck
 */
export const DeckCard = ({title, numberOfCards}) => {
	return (<TouchableOpacity>
		<Text>{title}</Text>
		<Text>{numberOfCards}</Text>
	</TouchableOpacity>)
};
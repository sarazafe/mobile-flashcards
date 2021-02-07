import React from 'react';
import {Text, TouchableOpacity} from "react-native";

/**
 * Component that represents a deck card
 * @param title - the title of the deck
 * @param numberOfCards - the number of cards in the deck
 * @param onPress - function to be called on onPress event
 */
export const DeckCard = ({title, numberOfCards, onPress}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>{title}</Text>
			<Text>{numberOfCards}</Text>
		</TouchableOpacity>
	)
};
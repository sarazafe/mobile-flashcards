import React from 'react';
import {TouchableOpacity} from "react-native";
import {DeckCard} from "./DeckCard";

/**
 * Component that represents a touchable deck card
 * @param title - the title of the deck
 * @param numberOfCards - the number of cards in the deck
 * @param onPress - function to be called on onPress event
 */
export const TouchableDeckCard = ({title, numberOfCards, onPress}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<DeckCard title={title} numberOfCards={numberOfCards}/>
		</TouchableOpacity>
	)
};
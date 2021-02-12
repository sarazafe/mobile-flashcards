import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Blue, Green, LightBlue, White} from "../utils/colors";

/**
 * Component that represents a deck card
 * @param title - the title of the deck
 * @param numberOfCards - the number of cards in the deck
 */
export const DeckCard = ({title, numberOfCards}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subTitle}>{numberOfCards} cards</Text>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: White,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		marginBottom: 10,
		padding: 30,
		borderRadius: 10,
		boxShadow: `2px 2px 4px 0px ${Green}`,
	},

	title: {
		fontSize: 20,
		color: Blue,
		marginBottom: 10,
	},

	subTitle: {
		fontSize: 15,
		color: LightBlue,
	}
});
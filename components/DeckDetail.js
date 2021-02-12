import React, {Component} from 'react';
import {View} from "react-native";
import {connect} from 'react-redux';
import {DeckCard} from "./DeckCard";
import {Button} from "./Button";
import {ADD_CARD_PAGE, QUIZ_PAGE} from "../utils/constants";
import {removeDeck as removeDeckFromStorage} from "../api/api";
import {StackActions} from "@react-navigation/native";
import {removeDeck} from "../actions";
import {commonStyles} from "../utils/styles";

/**
 * Component that shows the details of a deck
 */
class DeckDetail extends Component {

	/**
	 * Starts the quiz
	 * @param title - the title of the deck
	 */
	startQuiz = title => {
		const {navigation} = this.props;
		navigation.navigate(QUIZ_PAGE, {
			title,
		});
	};

	/**
	 * Navigates to page that add a new card
	 * @param title - the title of the deck
	 */
	navigateToAddCard = title => {
		const {navigation} = this.props;
		navigation.navigate(ADD_CARD_PAGE, {
			title,
		});
	};

	/**
	 * Removes a deck
	 * @param title - the title of the deck to remove
	 */
	removeDeck = title => {
		removeDeckFromStorage(title).then(() => {
			const popAction = StackActions.pop(1);
			this.props.navigation.dispatch(popAction);
			this.props.removeDeck(title);
		});
	};

	render() {
		const {deck: {title, questions}} = this.props;
		return (
			<View style={commonStyles.container}>
				<DeckCard title={title} numberOfCards={questions.length}/>

				<View>
					<Button style={{padding: 10}} onPress={() => this.startQuiz(title)}
					        disabled={questions.length === 0}>
						Start the quiz!
					</Button>
					<Button style={{padding: 10}} onPress={() => this.navigateToAddCard(title)}>
						Add a card
					</Button>
				</View>

				<View>
					<Button style={{padding: 10}} onPress={() => this.removeDeck(title)}>
						Remove deck
					</Button>
				</View>
			</View>
		)
			;
	}
}

const mapStateToProps = (decks, {route: {params: {title}}}) => {
	return {
		deck: Object.values(decks).find(deck => (deck.title === title)),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeDeck: deck => dispatch(removeDeck(deck))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DeckDetail)
import React, {Component} from 'react';
import {View} from "react-native";
import {connect} from 'react-redux';
import {DeckCard} from "./DeckCard";
import {Button} from "./Button";

/**
 * Component that shows the details of a deck
 */
class DeckDetail extends Component {

	/**
	 * Starts the quiz
	 */
	startQuiz = () => {

	};

	/**
	 * Navigates to page that add a new card
	 * @param title - the title of the deck
	 */
	navigateToAddCard = (title) => {
		const {navigation} = this.props;
		navigation.navigate('Add card', {
			title,
		});
	};

	render() {
		const {deck: {title, questions}} = this.props;
		return (
			<View>
				<DeckCard title={title} numberOfCards={questions.length}/>

				<Button style={{padding: 10}} onPress={this.startQuiz} disabled={questions.length === 0}>
					Start the quiz!
				</Button>
				<Button style={{padding: 10}} onPress={() => this.navigateToAddCard(title)}>
					Add a card
				</Button>
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

export default connect(
	mapStateToProps,
)(DeckDetail)
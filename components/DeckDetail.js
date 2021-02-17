import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {FontAwesome5} from '@expo/vector-icons';
import {Button} from './Button';
import {ADD_CARD_PAGE, QUIZ_PAGE} from '../utils/constants';
import {removeDeck as removeDeckFromStorage} from '../api/api';
import {StackActions} from '@react-navigation/native';
import {removeDeck} from '../actions';
import {commonStyles} from '../utils/styles';
import {Blue, DarkSalmon} from '../utils/colors';
import {TouchableDeckCard} from './TouchableDeckCard';

/**
 * Component that shows the details of a deck
 */
class DeckDetail extends Component {

	/**
	 * Starts the quiz
	 */
	startQuiz = () => {
		const {deck: {questions}} = this.props;
		if (questions.length === 0) {
			return;
		}

		const {deck: {title}, navigation} = this.props;
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
		const {deck} = this.props;
		if (!deck) {
			return (<></>)
		}

		const {title, questions} = deck;
		return (
			<View style={commonStyles.container}>
				<TouchableDeckCard title={title} numberOfCards={questions.length}
				                   onPress={() => this.startQuiz()}/>
				<View style={{alignItems: 'center', justifyContent: 'center'}}>
					{
						questions.length > 0 ?
							<Text style={{color: Blue}}>Click on the card to start the quiz!</Text>
							:
							<View style={styles.noCardsContainer}>
								<FontAwesome5 name='exclamation' size={15} color={DarkSalmon}/>
								<Text style={{color: Blue, marginLeft: 10}}>Add some cards to start the quiz</Text>
							</View>
					}


				</View>

				<View style={{marginTop: 30}}>
					<Button onPress={() => this.navigateToAddCard(title)}>
						Add a card
					</Button>
					<Button onPress={() => this.removeDeck(title)}>
						Remove the deck
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
)(DeckDetail);

const styles = StyleSheet.create({
	noCardsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
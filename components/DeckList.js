import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {getDecks} from '../api/api';
import {receiveDecks} from '../actions';
import {TouchableDeckCard} from './TouchableDeckCard';
import {DECK_DETAILS_PAGE} from '../utils/constants';
import {commonStyles} from '../utils/styles';

/**
 * Component that represents the list of decks
 */
class DeckList extends Component {
	componentDidMount() {
		const {receiveDecks} = this.props;
		getDecks()
			.then(decks => receiveDecks(decks));
	}

	/**
	 * Navigates to deck details page
	 * @param title - the title of the deck
	 * @param navigation - the navigation
	 */
	navigateToDetails = ({title, navigation}) => {
		navigation.navigate(DECK_DETAILS_PAGE, {
			title,
		});
	}

	render() {
		const {decks, navigation} = this.props;
		return (
			<ScrollView style={commonStyles.container}>
				{
					Object.values(decks).map(({title, questions}) => (
						<TouchableDeckCard key={title} title={title} numberOfCards={questions.length}
						                   onPress={() => this.navigateToDetails({title, navigation})}/>
					))
				}
			</ScrollView>
		);
	}
}

const mapStateToProps = decks => {
	return {
		decks
	};
};

const mapDispatchToProps = dispatch => {
	return {
		receiveDecks: decks => dispatch(receiveDecks(decks))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckList);
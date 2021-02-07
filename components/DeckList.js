import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from "react-native";
import {getDecks} from "../api/api";
import {receiveDecks} from "../actions";
import {DeckCard} from "./DeckCard";

/**
 * Component that represents the list of decks
 */
class DeckList extends Component {
	componentDidMount() {
		const {receiveDecks} = this.props;
		getDecks()
			.then(decks => receiveDecks(decks));
	}

	render() {
		const {decks} = this.props;
		return (<View>
			{
				Object.values(decks).map(({title, questions}) => (
					<DeckCard key={title} title={title} numberOfCards={questions.length}/>
				))
			}
		</View>);
	}
}

const mapStateToProps = decks => {
	return {
		decks
	};
}

const mapDispatchToProps = dispatch => {
	return {
		receiveDecks: decks => dispatch(receiveDecks(decks))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckList)
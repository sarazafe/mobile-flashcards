import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";
import {getDecks} from "../api/api";
import {receiveDecks} from "../actions";

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
		return (<View><Text>{JSON.stringify(decks)}</Text></View>);
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
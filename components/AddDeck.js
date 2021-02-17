import React, {Component} from 'react';
import {View, Text, TextInput} from "react-native";
import {Button} from "./Button";
import {connect} from "react-redux";
import {addDeck} from "../actions";
import {saveDeckTitle} from "../api/api";
import {DECK_LIST_PAGE} from "../utils/constants";
import {commonStyles, formStyles} from "../utils/styles";
import {Error} from "./Error";

/**
 * Component where a new deck is able to be added to the store
 */
class AddDeck extends Component {
	state = {
		deckTitle: '',
		errorMsg: '',
	};

	/**
	 * Updates the property deckTitle of state
	 * @param deckTitle - the value in TextInput
	 */
	updateDeckTitle = deckTitle => {
		this.setState({
			deckTitle
		});
	};

	/**
	 * Resets the state
	 */
	resetState = () => {
		this.setState({
			deckTitle: '',
			errorMsg: '',
		});
	};

	/**
	 * Adds a new the deck to the collections of decks
	 */
	addDeck = () => {
		saveDeckTitle(this.state.deckTitle).then(() => {
			this.props.addDeck({
				title: this.state.deckTitle,
				questions: []
			});

			this.resetState();

			const {navigation} = this.props;
			navigation.navigate(DECK_LIST_PAGE);
		}).catch(() => {
			this.setState({
				deckTitle: '',
				errorMsg: 'Sorry, there was an error adding the deck. Please, try it again.',
			});
		});
	};

	render() {
		const {errorMsg} = this.state;
		return (
			<View style={commonStyles.container}>
				{
					errorMsg ? this.renderErrorView() : this.renderFormView()
				}
			</View>
		);
	}

	/**
	 * Renders the error view
	 */
	renderErrorView = () => {
		const {errorMsg} = this.state;
		return (
			<Error errorMsg={errorMsg} resetStateFn={this.resetState}/>
		);
	};

	/**
	 * Renders the form view
	 */
	renderFormView = () => {
		const {deckTitle} = this.state;
		return (
			<View>
				<View style={formStyles.header}>
					<Text style={formStyles.title}>Let's add a new deck!!</Text>
				</View>
				<TextInput
					style={formStyles.input}
					onChangeText={text => this.updateDeckTitle(text)}
					placeholder='Introduce a title for the new deck'
					value={deckTitle}
				/>
				<Button onPress={this.addDeck} disabled={!deckTitle}>
					Add deck
				</Button>
			</View>
		);
	};
}

const mapDispatchToProps = dispatch => {
	return {
		addDeck: deck => dispatch(addDeck(deck))
	};
};

export default connect(
	() => {
		return {}
	},
	mapDispatchToProps
)(AddDeck);
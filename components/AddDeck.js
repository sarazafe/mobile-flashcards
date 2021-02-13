import React, {Component} from 'react';
import {View, Text, TextInput} from "react-native";
import {Button} from "./Button";
import {connect} from "react-redux";
import {addDeck} from "../actions";
import {saveDeckTitle} from "../api/api";
import {HOME_TAB} from "../utils/constants";
import {commonStyles} from "../utils/styles";

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
			navigation.navigate(HOME_TAB);
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
		return (<View>
			<Text>{errorMsg}</Text>
			<Button onPress={this.resetState}>
				Try again!
			</Button>
		</View>);
	};

	/**
	 * Renders the form view
	 */
	renderFormView = () => {
		const {deckTitle} = this.state;
		return (<View>
			<Text>Let's add a new deck!!</Text>
			<TextInput
				style={{height: 40, borderColor: 'gray', borderWidth: 1}}
				onChangeText={text => this.updateDeckTitle(text)}
				placeholder='Introduce a title for the new deck'
				value={deckTitle}
			/>
			<Button onPress={this.addDeck} disabled={!deckTitle}>
				Add deck
			</Button>
		</View>);
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
)(AddDeck)
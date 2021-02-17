import React, {Component} from 'react';
import {View, Text, TextInput} from "react-native";
import {StackActions} from "@react-navigation/native";
import {connect} from "react-redux";
import {Button} from "./Button";
import {updateDeck} from "../actions";
import {addCartToDeck} from "../api/api";
import {commonStyles, formStyles} from "../utils/styles";
import {Error} from "./Error";

/**
 * Component where a new deck is able to be added to the store
 */
class AddCard extends Component {
	state = {
		question: '',
		answer: '',
		errorMsg: '',
	};

	/**
	 * Updates the question of the state
	 * @param question - the new value of the question
	 */
	updateQuestion = question => {
		this.setState({
			question,
		});
	};

	/**
	 * Updates the answer of the state
	 * @param answer - the new value of the answer
	 */
	updateAnswer = answer => {
		this.setState({
			answer,
		});
	};

	/**
	 * Resets the state
	 */
	resetState = () => {
		this.setState({
			question: '',
			answer: '',
			errorMsg: '',
		});
	};

	/**
	 * Adds the card to the list of cards of the deck
	 */
	addCard = () => {
		const {title} = this.props;
		const {question, answer} = this.state;
		addCartToDeck(title, {
			question,
			answer,
		}).then(() => {
			this.props.updateDeck({
				title,
				question: {
					question,
					answer,
				}
			});

			this.resetState()

			const popAction = StackActions.pop(1);
			this.props.navigation.dispatch(popAction);
		}).catch(() => {
			this.setState({
				question: '',
				answer: '',
				errorMsg: 'Sorry, there was be an error adding the card. Please, try it again.',
			});
		});
	};

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
	 * Renders the view form
	 */
	renderFormView = ()=>{
		const {title} = this.props;
		const {question, answer} = this.state;
		return (
			<View>
				<View style={formStyles.header}>
					<Text style={formStyles.title}>Let's add a new card to {title} deck!!</Text>
				</View>
				<TextInput
					style={formStyles.input}
					onChangeText={text => this.updateQuestion(text)}
					placeholder='Write a question'
					value={question}
				/>
				<TextInput
					style={formStyles.input}
					onChangeText={text => this.updateAnswer(text)}
					placeholder='Write an answer'
					value={answer}
				/>
				<Button onPress={this.addCard} disabled={!question || !answer}>
					Add card
				</Button>
			</View>
		);
	}

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
}

const mapStateToProps = ({}, {route: {params: {title}}}) => {
	return {
		title
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateDeck: deck => dispatch(updateDeck(deck))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddCard);
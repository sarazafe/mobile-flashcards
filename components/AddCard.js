import React, {Component} from 'react';
import {View, Text, TextInput} from "react-native";
import {StackActions} from "@react-navigation/native";
import {connect} from "react-redux";
import {Button} from "./Button";
import {updateDeck} from "../actions";
import {addCartToDeck} from "../api/api";

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
		return (<View>
			<Text>{errorMsg}</Text>
			<Button style={{padding: 10}} onPress={this.resetState}>
				Try again!
			</Button>
		</View>);
	};

	/**
	 * Renders the view form
	 */
	renderFormView = ()=>{
		const {title} = this.props;
		const {question, answer} = this.state;
		return (
			<View>
				<Text>Let's add a new card to {title} deck!!</Text>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={text => this.updateQuestion(text)}
					placeholder='Write a question'
					value={question}
				/>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={text => this.updateAnswer(text)}
					placeholder='Write an answer'
					value={answer}
				/>
				<Button style={{padding: 10}} onPress={this.addCard} disabled={!question || !answer}>
					Add card
				</Button>
			</View>
		);
	}

	render() {
		const {errorMsg} = this.state;
		return (
			<View>
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
)(AddCard)
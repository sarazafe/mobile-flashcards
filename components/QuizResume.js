import React, {Component} from 'react';
import {View, Text} from "react-native";
import { StackActions } from '@react-navigation/native';
import {Button} from "./Button";
import {commonStyles} from "../utils/styles";

/**
 * Component that represents a quiz resume
 * @param rightQuestions - number of right questions
 * @param totalQuestions - total number of deck's questions
 */
export default class QuizResume extends Component {

	/**
	 * Goes to quiz again to restart on that way the quiz
	 */
	restartQuiz = () => {
		const popAction = StackActions.pop(1);
		this.props.navigation.dispatch(popAction);
	};

	/**
	 * Goes to deck details page
	 */
	goToDeckDetails = () => {
		const popAction = StackActions.pop(2);
		this.props.navigation.dispatch(popAction);
	};

	render() {
		const {route: {params: {rightQuestions, totalQuestions}}} = this.props;
		return (
			<View style={commonStyles.container}>
				<Text>End of quiz!</Text>
				{
					(rightQuestions / totalQuestions) * 100 > 50 ?
						(
							<View>
								<Text>🎉 Congratulations!!!</Text>
								<Text>You got {rightQuestions} of {totalQuestions} right questions!</Text>
							</View>
						) :
						(
							<View>
								<Text>So sorry 🙁!!</Text>
								<Text>You only got {rightQuestions} of {totalQuestions} right questions.</Text>
								<Text>Go study and try it again when you're ready!! 💪🏻</Text>
							</View>
						)
				}

				<View>
					<Button style={{padding: 10}} onPress={this.restartQuiz}>
						Restart the quiz!
					</Button>

					<Button style={{padding: 10}} onPress={this.goToDeckDetails}>
						Back to deck
					</Button>
				</View>
			</View>
		);
	}
}
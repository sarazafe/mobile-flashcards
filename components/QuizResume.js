import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {Button} from './Button';
import {commonStyles} from '../utils/styles';
import {Blue, DarkBlue} from '../utils/colors';

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
			<View style={[commonStyles.container, styles.container, styles.mainContainer]}>
				<Text style={styles.title}>End of the quiz!</Text>
				{
					(rightQuestions / totalQuestions) * 100 > 50 ?
						(
							<View style={styles.container}>
								<Text style={[styles.text, styles.remarked]}>🎉 Congratulations!!!</Text>
								<Text style={styles.text}>You got {rightQuestions} of {totalQuestions} right
									questions!</Text>
							</View>
						) :
						(
							<View style={[styles.container]}>
								<Text style={[styles.text,styles.remarked]}>So sorry 🙁!!</Text>
								<Text style={styles.text}>You only got {rightQuestions} of {totalQuestions} right
									questions.</Text>
								<Text style={styles.text}>Go study and try it again when you're ready!! 💪🏻</Text>
							</View>
						)
				}

				<View>
					<Button onPress={this.restartQuiz}>
						Restart the quiz!
					</Button>

					<Button onPress={this.goToDeckDetails}>
						Back to deck
					</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		paddingLeft: 30,
		paddingRight: 30,
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: DarkBlue,
		fontSize: 20,
		marginBottom: 10,
	},
	text: {
		color: Blue,
		fontSize: 15,
		textAlign: 'center',
		marginBottom: 8,
	},
	remarked: {
		fontSize: 17,
		fontWeight: 'bold'
	}
});
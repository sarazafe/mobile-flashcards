import React, {Component} from 'react';
import {View} from "react-native";
import {connect} from 'react-redux';
import {Button} from "./Button";
import {Text} from "react-native-web";
import {FontAwesome} from '@expo/vector-icons';
import {QuizResume} from "./QuizResume";

/**
 * Component where quiz takes place
 */
class Quiz extends Component {
	state = {
		currentQuestion: {},
		remainingQuestions: [],
		totalQuestions: 0,
		rightQuestions: 0,
		showQuestion: true,
	};

	componentDidMount() {
		const {deck: {questions}} = this.props;

		// Shuffle the questions
		const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
		const currentQuestion = shuffledQuestions.splice(0, 1)[0];
		this.setState({
			currentQuestion: currentQuestion,
			remainingQuestions: shuffledQuestions,
			totalQuestions: questions.length,
		});
	}

	/**
	 * Answers the question. Increments the number of right answers and shows the next question
	 * @param correct - flag to indicate if the chosen answer for the question was right or not
	 */
	answerQuestion = correct => {
		if (correct) {
			this.setState((currentState) => ({
				...currentState,
				rightQuestions: currentState.rightQuestions + 1
			}));
		}

		this.showNextQuestion();
	};

	/**
	 * Shows next question
	 */
	showNextQuestion = () => {
		this.setState((currentState) => {
			const {remainingQuestions} = currentState;
			const questions = [...remainingQuestions];
			const currentQuestion = questions.splice(0, 1)[0];
			return {
				...currentState,
				currentQuestion,
				remainingQuestions: questions,
			}
		});
	};

	/**
	 * Toggle show question flag
	 */
	toggleQuestion = () => {
		this.setState(currentState => ({
			...currentState,
			showQuestion: !currentState.showQuestion,
		}));
	};

	render() {
		const {currentQuestion, remainingQuestions, totalQuestions, rightQuestions, showQuestion} = this.state;

		return (
			<View>
				{
					currentQuestion ?
						(
							<View>
								<Text>Let's start the quiz!</Text>
								<Text>{remainingQuestions.length}/{totalQuestions}</Text>
								{
									showQuestion ?
										(
											<View>
												<View>
													<Text>{currentQuestion.question}</Text>
												</View>
												<View>
													<Button style={{padding: 10}} onPress={this.toggleQuestion}>
														Show the answer!
													</Button>
												</View>
												<View>
													<Button style={{padding: 20}}
													        onPress={() => this.answerQuestion(true)}>
														<FontAwesome name="thumbs-up" size={24} color="green"/> Right!
													</Button>
													<Button style={{padding: 10}}
													        onPress={() => this.answerQuestion(false)}>
														<FontAwesome name="thumbs-down" size={24} color="red"/> Wrong
													</Button>
												</View>
											</View>
										) : (
											<View>
												<View>
													<Text>{currentQuestion.answer}</Text>
												</View>
												<View><Button style={{padding: 10}} onPress={this.toggleQuestion}>
													Back to question
												</Button>
												</View>
											</View>
										)
								}
							</View>
						)
						:
						(
							<QuizResume rightQuestions={rightQuestions} totalQuestions={totalQuestions}/>
						)
				}
			</View>
		);
	}
}

const mapStateToProps = (decks, {route: {params: {title}}}) => {
	return {
		deck: Object.values(decks).find(deck => (deck.title === title)),
	};
};

export default connect(
	mapStateToProps,
)(Quiz)
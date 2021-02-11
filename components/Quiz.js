import React, {Component} from 'react';
import {View} from "react-native";
import {connect} from 'react-redux';
import {Text} from "react-native-web";
import {QuizResume} from "./QuizResume";
import {QuizQuestionSection} from "./QuizQuestionSection";
import {QuizAnswerSection} from "./QuizAnswerSection";

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
				showQuestion: true,
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
										<QuizQuestionSection question={currentQuestion}
										                     toggleQuestionFn={this.toggleQuestion}/>
										:
										<QuizAnswerSection question={currentQuestion}
										                   answerQuestionFn={this.answerQuestion}
										                   toggleQuestionFn={this.toggleQuestion}/>

								}
							</View>
						)
						:
						<QuizResume rightQuestions={rightQuestions} totalQuestions={totalQuestions}/>
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
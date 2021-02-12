import React, {Component} from 'react';
import {View, Text} from "react-native";
import {connect} from 'react-redux';
import {QuizQuestionSection} from "./QuizQuestionSection";
import {QuizAnswerSection} from "./QuizAnswerSection";
import {QUIZ_RESUME_PAGE} from "../utils/constants";
import {saveQuizResults} from "../api/api";
import {commonStyles} from "../utils/styles";

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
		const {navigation} = this.props;
		this.unsubscribeFocusListener = navigation.addListener('focus', () => {
			this.initQuiz();
		});

		this.unsubscribeBlurListener = navigation.addListener('blur', () => {
			this.setState({
				showQuestion: true,
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribeFocusListener();
		this.unsubscribeBlurListener();
	}

	/**
	 * Inits the quiz. It sets the initial state.
	 */
	initQuiz = () => {
		const {deck: {questions}} = this.props;

		// Shuffle the questions
		const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
		const currentQuestion = shuffledQuestions.splice(0, 1)[0];
		this.setState({
			currentQuestion: currentQuestion,
			remainingQuestions: shuffledQuestions,
			totalQuestions: questions.length,
			rightQuestions: 0,
			showQuestion: true,
		});
	};

	/**
	 * Answers the question. Increments the number of right answers and shows the next question
	 * @param correct - flag to indicate if the chosen answer for the question was right or not
	 */
	answerQuestion = correct => {
		if (correct) {
			this.setState((currentState) => ({
				...currentState,
				rightQuestions: currentState.rightQuestions + 1
			}), this.showNextQuestion);
		} else {
			this.showNextQuestion();
		}
	};

	/**
	 * Shows next question. If there are no more questions to show,
	 * saves the results of the quiz in async storage and navigates to
	 * quiz resume page
	 */
	showNextQuestion = () => {
		const {remainingQuestions} = this.state;
		if (remainingQuestions.length === 0) {
			const {navigation, deck: {title}} = this.props;
			const {rightQuestions, totalQuestions} = this.state;

			saveQuizResults({
				title,
				rightQuestions,
				totalQuestions,
			});

			navigation.navigate(QUIZ_RESUME_PAGE, {
				title,
				rightQuestions,
				totalQuestions,
			});
			return;
		}

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
		const {currentQuestion, remainingQuestions, totalQuestions, showQuestion} = this.state;

		return (
			<View style={commonStyles.container}>
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
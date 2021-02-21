import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {QuizQuestionSection} from './QuizQuestionSection';
import {QuizAnswerSection} from './QuizAnswerSection';
import {QUIZ_RESUME_PAGE} from '../utils/constants';
import {clearLocalNotification, saveQuizResults} from '../api/api';
import {cardShadowStyle, cardStyle, commonStyles} from '../utils/styles';
import {Blue, DarkBlue, DarkGreen, DarkSalmon} from '../utils/colors';

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
		animatedValue: new Animated.Value(0),
		animationValue: 0,
		waitingForQuestion: true,
		defaultCardColor: DarkGreen,
	};

	defaultCardColors = [DarkGreen, DarkSalmon];

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

		const {animatedValue} = this.state;
		animatedValue.addListener(({value}) => {
			this.setState({
				animationValue: value,
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
			animationValue: 0,
			waitingForQuestion: false,
		});
	};

	/**
	 * Answers the question. Increments the number of right answers and shows the next question
	 * @param correct - flag to indicate if the chosen answer for the question was right or not
	 */
	answerQuestion = correct => {
		// Waiting for net question until the flip animation has finished
		this.setState({
			waitingForQuestion: true,
			defaultCardColor: this.defaultCardColors[Math.round(Math.random())],
		});
		this.flipCard(() => {
			this.setState({
				waitingForQuestion: false, // animation has finished, the next question can be shown
			});

			// Answer the question
			if (correct) {
				this.setState((currentState) => ({
					...currentState,
					rightQuestions: currentState.rightQuestions + 1
				}), this.showNextQuestion);
			} else {
				this.showNextQuestion();
			}
		});
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

			clearLocalNotification();

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
		const {waitingForQuestion} = this.state;
		if (waitingForQuestion) {
			return;
		}

		this.setState(currentState => ({
			...currentState,
			showQuestion: !currentState.showQuestion,
		}));

		// Animate the toggle action
		this.flipCard();
	};

	/**
	 * Flips the card
	 * @param callback (opt) - callback to be executed when animation is finished
	 */
	flipCard = (callback = () => {
	}) => {
		const {animatedValue} = this.state;
		if (this.state.animationValue >= 90) {
			Animated.spring(animatedValue, {
				toValue: 0,
				friction: 8,
				tension: 10,
				useNativeDriver: true,
			}).start(() => {
				callback();
			});
		} else {
			Animated.spring(animatedValue, {
				toValue: 180,
				friction: 8,
				tension: 10,
				useNativeDriver: true,
			}).start(() => {
				callback();
			});
		}
	};

	/**
	 * Gets the interpolate value to animate the question
	 */
	getQuestionAnimationInterpolateValue = () => {
		const {animatedValue} = this.state;
		return animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg'],
		});
	};

	/**
	 * Gets the interpolate value to animate the answer
	 */
	getAnswerAnimationInterpolateValue = () => {
		const {animatedValue} = this.state;
		return animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg'],
		});
	}

	render() {
		const {currentQuestion, remainingQuestions, totalQuestions, showQuestion, waitingForQuestion, defaultCardColor} = this.state;
		return (
			<ScrollView style={[commonStyles.container, {position: 'relative'}]}>
				<View style={styles.header}>
					<Text style={styles.title}>Let's play!</Text>
					<Text style={styles.subTitle}>{totalQuestions - remainingQuestions.length}/{totalQuestions}</Text>
				</View>

				<View style={styles.cardContainer}>
					<Animated.View
						style={[styles.cardAnimatedView, {transform: [{rotateY: this.getQuestionAnimationInterpolateValue()}]}]}>
						<TouchableOpacity onPress={this.toggleQuestion}>
							{
								waitingForQuestion ?
									(
										<View style={[cardStyle.card, cardShadowStyle.shadow]}>
											<MaterialCommunityIcons name="cards-playing-outline" size={100}
											                        color={defaultCardColor}/>
										</View>
									) :
									(
										<View style={[cardStyle.card, cardShadowStyle.shadow]}>
											<Text style={cardStyle.cardIcon}>⏳</Text>
											<Text style={cardStyle.cardText}>{currentQuestion.question}</Text>
										</View>
									)
							}
						</TouchableOpacity>
					</Animated.View>
				</View>

				<View style={styles.cardContainer}>
					<Animated.View
						style={[styles.cardAnimatedView, {transform: [{rotateY: this.getAnswerAnimationInterpolateValue()}]}]}>
						<TouchableOpacity onPress={this.toggleQuestion}>
							<View style={[cardStyle.card, cardShadowStyle.shadow]}>
								<Text style={cardStyle.cardIcon}>⌛️</Text>
								<Text style={cardStyle.cardText}>{currentQuestion.answer}</Text>
							</View>
						</TouchableOpacity>
					</Animated.View>
				</View>

				<View style={styles.actionsContainer}>
					{
						waitingForQuestion || showQuestion ?
							<QuizQuestionSection waitingForQuestion={waitingForQuestion} remainingQuestions={remainingQuestions} />
							:
							<QuizAnswerSection question={currentQuestion}
							                   answerQuestionFn={this.answerQuestion}
							                   toggleQuestionFn={this.toggleQuestion}/>

					}
				</View>
			</ScrollView>
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
)(Quiz);

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	title: {
		color: DarkBlue,
		fontSize: 20,
		marginBottom: 10,
	},
	subTitle: {
		color: Blue,
		fontWeight: 'bold',
		fontSize: 15,
	},
	actionsContainer: {
		marginTop: 400,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContainer: {
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardAnimatedView: {
		backfaceVisibility: 'hidden',
		position: 'absolute',
		top: 20,
	},
});
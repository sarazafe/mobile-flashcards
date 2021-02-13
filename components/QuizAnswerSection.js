import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {cardShadowStyle, cardStyle} from "../utils/styles";
import {Blue, DarkGreen, DarkSalmon} from "../utils/colors";

/**
 * Component that represents the section of the quiz that shows the question
 * @param question - the question
 * @param answerQuestionFn - the function to answer the question
 * @param toggleQuestionFn - the function to toggle between this section and answer section
 */
export const QuizAnswerSection = ({question, answerQuestionFn, toggleQuestionFn}) => {
	return (
		<View style={cardStyle.container}>
			<TouchableOpacity onPress={() => {
				toggleQuestionFn()
			}}>
				<View style={[cardStyle.card, cardShadowStyle.shadow]}>
					<Text style={cardStyle.cardIcon}>⌛️</Text>
					<Text style={cardStyle.cardText}>{question.answer}</Text>
				</View>
			</TouchableOpacity>
			<View>
				<Text style={{color: Blue}}>Click on the card to see the question again!</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={[styles.feedbackButton, {marginRight: 2}]} onPress={() => answerQuestionFn(true)}>
					<FontAwesome name="thumbs-up" size={40} color={DarkGreen}/>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.feedbackButton, {marginLeft: 2}]} onPress={() => answerQuestionFn(false)}>
					<FontAwesome name="thumbs-down" size={40} color={DarkSalmon}/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	feedbackButton: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10,
		paddingBottom: 10,
	}
});
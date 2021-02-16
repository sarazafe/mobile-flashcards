import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Blue, DarkGreen, DarkSalmon} from "../utils/colors";

/**
 * Component that represents the section of the quiz that shows the actions related to the answer
 * @param answerQuestionFn - the function to answer the question
 */
export const QuizAnswerSection = ({answerQuestionFn}) => {
	return (
		<View>
			<View>
				<Text style={{color: Blue}}>Click on the card to see the question again!</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={[styles.feedbackButton, {marginRight: 2}]}
				                  onPress={() => answerQuestionFn(true)}>
					<FontAwesome name="thumbs-up" size={40} color={DarkGreen}/>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.feedbackButton, {marginLeft: 2}]}
				                  onPress={() => answerQuestionFn(false)}>
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
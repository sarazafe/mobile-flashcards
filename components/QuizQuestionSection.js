import React from 'react';
import {View, Text} from "react-native";
import {Button} from "./Button";

/**
 * Component that represents the section of the quiz that shows the question
 * @param question - the question
 * @param toggleQuestionFn - the function to toggle between this section and answer section
 */
export const QuizQuestionSection = ({question, toggleQuestionFn}) => {
	return (
		<View>
			<View>
				<Text>{question.question}</Text>
			</View>
			<View>
				<Button style={{padding: 10}} onPress={() => {
					toggleQuestionFn()
				}}>
					Show the answer!
				</Button>
			</View>
		</View>
	);
};
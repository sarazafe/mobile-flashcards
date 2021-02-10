import React from 'react';
import {View} from "react-native";
import {Text} from "react-native-web";
import {Button} from "./Button";
import {FontAwesome} from "@expo/vector-icons";

/**
 * Component that represents the section of the quiz that shows the question
 * @param question - the question
 * @param answerQuestionFn - the function to answer the question
 * @param toggleQuestionFn - the function to toggle between this section and answer section
 */
export const QuizQuestionSection = ({question, answerQuestionFn, toggleQuestionFn}) => {
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
			<View>
				<Button style={{padding: 20}}
				        onPress={() => answerQuestionFn(true)}>
					<FontAwesome name="thumbs-up" size={24} color="green"/> Right!
				</Button>
				<Button style={{padding: 10}}
				        onPress={() => answerQuestionFn(false)}>
					<FontAwesome name="thumbs-down" size={24} color="red"/> Wrong
				</Button>
			</View>
		</View>
	);
};
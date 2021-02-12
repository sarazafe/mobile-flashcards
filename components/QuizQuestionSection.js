import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {Button} from "./Button";
import {cardShadowStyle, cardStyle} from "../utils/styles";

/**
 * Component that represents the section of the quiz that shows the question
 * @param question - the question
 * @param toggleQuestionFn - the function to toggle between this section and answer section
 */
export const QuizQuestionSection = ({question, toggleQuestionFn}) => {
	return (
		<View style={cardStyle.container}>
			<TouchableOpacity onPress={() => {
				toggleQuestionFn()
			}}>
				<View style={[cardStyle.card, cardShadowStyle.shadow]}>
					<Text style={cardStyle.cardIcon}>⏳</Text>
					<Text style={cardStyle.cardText}>{question.question}</Text>
				</View>
			</TouchableOpacity>
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
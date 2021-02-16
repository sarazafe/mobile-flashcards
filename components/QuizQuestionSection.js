import React from 'react';
import {View, Text} from "react-native";
import {Blue} from "../utils/colors";

/**
 * Component that represents the section of the quiz that shows the actions related to the question
 */
export const QuizQuestionSection = () => {
	return (
			<View>
				<Text style={{color: Blue}}>Click on the card to see the answer!</Text>
			</View>
	);
};
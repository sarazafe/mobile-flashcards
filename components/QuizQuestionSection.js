import React from 'react';
import {View, Text} from 'react-native';
import {Blue} from '../utils/colors';

/**
 * Component that represents the section of the quiz that shows the actions related to the question
 */
export const QuizQuestionSection = ({waitingForQuestion, remainingQuestions}) => {
	return (
		<View>
			{
				waitingForQuestion ?
					remainingQuestions.length > 0 ?
						<Text style={{color: Blue}}>Next question is coming...</Text> :
						<Text style={{color: Blue}}>Results are coming...</Text>
					:
					<Text style={{color: Blue}}>Click on the card to see the answer!</Text>
			}
		</View>
	);
};
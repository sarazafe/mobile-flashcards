import React from 'react';
import {View, Text} from "react-native";

/**
 * Component that represents a quiz resume
 */
export const QuizResume = ({rightQuestions, totalQuestions}) => {
	return (
		<View>
			<Text>End of quiz!</Text>
			{
				(rightQuestions / totalQuestions) * 100 > 50 ?
					(
						<View>
							<Text>🎉 Congratulations!!!</Text>
							<Text>You got {rightQuestions} of {totalQuestions} questions right!</Text>
						</View>
					) :
					(
						<View>
							<Text>So sorry 🙁!!</Text>
							<Text>You only got {rightQuestions} of {totalQuestions} right.</Text>
							<Text>Go study and try it again when you're ready!! 💪🏻</Text>
						</View>
					)
			}
		</View>
	);
};
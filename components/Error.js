import React from 'react';
import {View, Text} from 'react-native';
import {errorStyles} from '../utils/styles';
import {Button} from './Button';

/**
 * Component that renders an error message
 * @param errorMsg - the error message
 * @param resetStateFn - the function to be called when user presses the button
 */
export const Error = ({errorMsg, resetStateFn}) => {
	return (
		<View style={errorStyles.container}>
			<Text style={errorStyles.message}>{errorMsg}</Text>
			<Button onPress={() => {
				resetStateFn()
			}}>
				Try again!
			</Button>
		</View>
	);
};
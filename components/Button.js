import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

export const Button = ({children, disabled, onPress}) => {
	const buttonStyles = [styles.button, disabled ? styles.disabledButton : ''];
	return (
		<TouchableOpacity
			onPress={onPress}
			style={buttonStyles}
			disabled={disabled}
		>
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'purple',
		padding: 5,
		borderRadius: 7,
		height: 30,
		marginLeft: 60,
		marginRight: 60,
		marginTop: 10,
	},
	disabledButton: {
		backgroundColor: 'gray',
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center'
	},
});
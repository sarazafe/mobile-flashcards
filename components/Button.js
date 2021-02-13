import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Blue, Green, White} from "../utils/colors";

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
		backgroundColor: Blue,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 6,
		paddingRight: 6,
		borderRadius: 7,
		marginLeft: 40,
		marginRight: 40,
		marginTop: 10,
	},
	disabledButton: {
		backgroundColor: Green,
	},
	buttonText: {
		color: White,
		fontSize: 16,
		textAlign: 'center'
	},
});
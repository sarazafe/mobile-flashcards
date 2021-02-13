import {Black, Blue, DarkBlue, Green, LightSalmon, White} from "./colors";
import {StyleSheet} from "react-native";

export const navigatorScreenOptions = {
	headerStyle: {
		backgroundColor: White,
		height: 60,
	},
	headerTintColor: Blue,
	headerTitleStyle: {
		fontSize: 20,
	}
};

export const commonStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: LightSalmon,
	},
});

export const cardShadowStyle = StyleSheet.create({
	shadow: {
		shadowColor: Black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 4,
	}
});

export const cardStyle = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: White,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 20,
		marginRight: 20,
		width: 250,
		height: 350,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
	},
	cardIcon: {
		fontSize: 25,
	},
	cardText: {
		fontSize: 20,
		color: DarkBlue,
		textAlign: 'center',
	},
});

export const formStyles = StyleSheet.create({
	header: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	title: {
		color: DarkBlue,
		fontSize: 18,
		marginBottom: 10,
	},
	input: {
		color: Blue,
		fontSize: 15,
		backgroundColor: White,
		borderColor: Green,
		borderWidth: 1,
		margin: 20,
		padding: 10,
	}
});
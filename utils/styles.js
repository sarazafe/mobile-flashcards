import {Black, Blue, DarkBlue, LightSalmon, White} from "./colors";
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
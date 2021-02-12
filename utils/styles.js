import {Blue, LightSalmon, White} from "./colors";
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
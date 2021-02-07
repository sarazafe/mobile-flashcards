import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DeckList from "./DeckList";
import {DeckDetail} from "./DeckDetail";

/**
 * Component for routing between views on a stack way
 */
export const Home = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={DeckList}/>
			<Stack.Screen name="Details" component={DeckDetail}/>
		</Stack.Navigator>
	);
};
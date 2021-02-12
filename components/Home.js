import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DeckList from "./DeckList";
import DeckDetail from "./DeckDetail";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import QuizResume from "./QuizResume";

/**
 * Component for routing between views on a stack way
 */
export const Home = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={DeckList}/>
			<Stack.Screen name="Details" component={DeckDetail}/>
			<Stack.Screen name="Add card" component={AddCard}/>
			<Stack.Screen name="Quiz" component={Quiz}/>
			<Stack.Screen name="Quiz resume" component={QuizResume}/>
		</Stack.Navigator>
	);
};
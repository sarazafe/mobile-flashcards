import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DeckList from "./DeckList";
import DeckDetail from "./DeckDetail";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import QuizResume from "./QuizResume";
import {ADD_CARD_PAGE, DECK_DETAILS_PAGE, HOME_TAB, QUIZ_PAGE, QUIZ_RESUME_PAGE} from "../utils/constants";

/**
 * Component for routing between views on a stack way
 */
export const Home = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen name={HOME_TAB} component={DeckList}/>
			<Stack.Screen name={DECK_DETAILS_PAGE} component={DeckDetail}/>
			<Stack.Screen name={ADD_CARD_PAGE} component={AddCard}/>
			<Stack.Screen name={QUIZ_PAGE} component={Quiz}/>
			<Stack.Screen name={QUIZ_RESUME_PAGE} component={QuizResume}/>
		</Stack.Navigator>
	);
};
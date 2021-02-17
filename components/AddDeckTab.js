import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
	ADD_DECK_PAGE,
} from '../utils/constants';
import AddDeck from './AddDeck';
import {navigatorScreenOptions} from '../utils/styles';

/**
 * Component for routing between views on a stack way
 */
export const AddDeckTab = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={navigatorScreenOptions}>
			<Stack.Screen name={ADD_DECK_PAGE} component={AddDeck}/>
		</Stack.Navigator>
	);
};
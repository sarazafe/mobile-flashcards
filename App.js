import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {decks as reducer} from './reducers';
import AddDeck from "./components/AddDeck";
import {Home} from "./components/Home";
import {ADD_DECK_PAGE, HOME_PAGE} from "./utils/constants";

export default function App() {
	const Tab = createBottomTabNavigator();
	return (
		<Provider store={createStore(reducer)}>
			<NavigationContainer style={styles.container}>
				<Tab.Navigator>
					<Tab.Screen name={HOME_PAGE} component={Home} />
					<Tab.Screen name={ADD_DECK_PAGE} component={AddDeck} />
				</Tab.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

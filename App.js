import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {decks as reducer} from './reducers';
import AddDeck from "./components/AddDeck";
import {Home} from "./components/Home";

export default function App() {
	const Tab = createBottomTabNavigator();
	return (
		<Provider store={createStore(reducer)}>
			<NavigationContainer style={styles.container}>
				<Tab.Navigator>
					<Tab.Screen name="Home" component={Home} />
					<Tab.Screen name="Add Deck" component={AddDeck} />
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

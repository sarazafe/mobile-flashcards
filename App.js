import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {StyleSheet, View} from 'react-native';
import DeckList from "./components/DeckList";
import {decks as reducer} from './reducers';

export default function App() {
	return (
		<Provider store={createStore(reducer)}>
		<View style={styles.container}>
			<DeckList/>
			<StatusBar style="auto"/>
		</View>
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

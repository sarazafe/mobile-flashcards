import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {decks as reducer} from './reducers';
import {Home} from "./components/Home";
import {AddDeckTab} from "./components/AddDeckTab";
import {ADD_DECK_TAB, HOME_TAB} from "./utils/constants";
import {Blue, Green} from "./utils/colors";

export default function App() {
	const Tab = createBottomTabNavigator();
	return (
		<Provider store={createStore(reducer)}>
			<StatusBar barStyle="light-content" backgroundColor={Blue} />
			<NavigationContainer style={styles.container}>
				<Tab.Navigator
					screenOptions={({route}) => getTabNavigatorScreeOptions(route)}
					tabBarOptions={getTabNavigatorTabBarOptions()}>
					<Tab.Screen name={HOME_TAB} component={Home}/>
					<Tab.Screen name={ADD_DECK_TAB} component={AddDeckTab}/>
				</Tab.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

/**
 * Gets the screen options for tab navigator
 * @param route - the route
 */
const getTabNavigatorScreeOptions = (route) => ({
	tabBarIcon: ({focused, color, size}) => {
		let iconName;

		if (route.name === HOME_TAB) {
			iconName = focused
				? 'cards-playing-outline'
				: 'cards-outline';
		} else if (route.name === ADD_DECK_TAB) {
			iconName = focused ? 'cards-diamond' : 'cards-diamond-outline';
		}

		return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
	},
});

/**
 * Gets tab navigator tab options
 */
const getTabNavigatorTabBarOptions = () => ({
	activeTintColor: Blue,
	inactiveTintColor: Green,
	labelStyle: {
		fontSize: 14,
		fontWeight: 'bold',
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

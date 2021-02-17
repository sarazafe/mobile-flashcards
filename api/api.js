import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from "expo-permissions";
import * as Notifications from 'expo-notifications';
import {Platform} from "react-native";

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';
const QUIZ_RESULTS_STORAGE_KEY = 'MobileFlashcards:quizResults';

/**
 * Gets all decks in storage
 * @returns {*[]} list of decks with their questions
 */
export const getDecks = () => {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then(decks => {
			return JSON.parse(decks);
		});
};

/**
 * Adds to the list of decks in storage a deck with a title
 * @param title - the title of the deck
 */
export const saveDeckTitle = title => {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: [],
		}
	}));
};

/**
 * Adds a new card to a deck in the store
 * @param title - the title of the deck
 * @param card - the card to be added to the deck
 */
export const addCartToDeck = (title, card) => {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((decks) => {
			const parsedDecks = JSON.parse(decks);
			if (parsedDecks[title]) {
				const questions = parsedDecks[title].questions;
				AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
					...parsedDecks,
					[title]: {
						...parsedDecks[title],
						questions: questions.concat(card)
					}
				}));
			}
		});
};

/**
 * Removes a deck by its title
 * @param title - the title of the deck to remove
 */
export const removeDeck = (title) => {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((decks) => {
			const parsedDecks = JSON.parse(decks)
			parsedDecks[title] = undefined
			delete parsedDecks[title]
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedDecks))
		})
};

/**
 * Saves the results of a quiz
 * @param title - the title of the deck
 * @param rightQuestions - the total of questions that the user answered correctly
 * @param totalQuestions - the total questions of the deck
 */
export const saveQuizResults = ({title, rightQuestions, totalQuestions}) => {
	AsyncStorage.getItem(QUIZ_RESULTS_STORAGE_KEY)
		.then((data) => {
			const results = JSON.parse(data);
			let previousQuizzesOfToday = [];
			if (results && results[getCurrentDate()]) {
				previousQuizzesOfToday = results[getCurrentDate()];
			}

			AsyncStorage.setItem(QUIZ_RESULTS_STORAGE_KEY, JSON.stringify({
				...results,
				[new Date().toLocaleDateString()]: [
					...previousQuizzesOfToday,
					{
						deck: title,
						rightQuestions,
						totalQuestions
					}
				]
			}));
		});
};

/**
 * Sets local notification
 */
export const setLocalNotification = () => {
	// Not apply for web
	if (Platform.OS === 'web') {
		return;
	}

	AsyncStorage.getItem(QUIZ_RESULTS_STORAGE_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (!data[getCurrentDate()]) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(
					({status}) => {
						if (status === 'granted') {
							Notifications.scheduleNotificationAsync({
								content: {
									title: "📖 Time to study!",
									body: 'Why not play some quizzes to prepare your studies?',
								},
								trigger: new Date().setHours(16, 0, 0, 0),
							}).then(
								// noop
							);

							Notifications.setNotificationHandler({
								handleNotification: async () => ({
									shouldShowAlert: true,
									shouldPlaySound: true,
									shouldSetBadge: false,
								}),
							});
						}
					}
				);
			}
		});
};

/**
 * Clears local notification when user has play at least one quiz in the day
 */
export const clearLocalNotification = () => {
	// Not apply for web
	if (Platform.OS === 'web') {
		return;
	}

	Notifications.cancelAllScheduledNotificationsAsync().then(
		// noop
	);
};

/**
 * Function to gets the formatted current date
 * @returns {string} - formatted date
 */
const getCurrentDate = () => {
	return new Date().toLocaleDateString();
}
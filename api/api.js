import AsyncStorage from '@react-native-community/async-storage';

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
 * Gets a deck in storage by id
 * @param id - the id of the deck to get
 * @returns {{}} the deck
 */
export const getDeck = (id) => {
	return {}
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
 * Saves the results of a quiz
 * @param title - the title of the deck
 * @param rightQuestions - the total of questions that the user answered correctly
 * @param totalQuestions - the total questions of the deck
 */
export const saveQuizResults = ({title, rightQuestions, totalQuestions}) => {
	return AsyncStorage.getItem(QUIZ_RESULTS_STORAGE_KEY)
		.then((data) => {
			const results = JSON.parse(data);
			let previousQuizzesOfToday = [];
			if (results && results[new Date().toLocaleDateString()]) {
				previousQuizzesOfToday = results[new Date().toLocaleDateString()];
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
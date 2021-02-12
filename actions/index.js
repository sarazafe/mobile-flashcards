export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const UPDATE_DECK = 'UPDATE_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

/**
 * Action to receive the decks
 * @param decks - the list of decks
 * @returns {{decks: *, type: string}} - the action with the deck
 */
export const receiveDecks = decks => {
	return {
		type: RECEIVE_DECKS,
		decks,
	};
};

/**
 * Action to add a deck
 * @param deck - the added deck
 * @returns {{type: string, title: *}} - the action with the deck
 */
export const addDeck = deck => {
	return {
		type: ADD_DECK,
		deck,
	};
};

/**
 * Action to update a deck
 * @param deck - the updated deck
 * @returns {{type: string, title: *}} - the action with the deck
 */
export const updateDeck = deck => {
	return {
		type: UPDATE_DECK,
		deck,
	};
};

/**
 * Action to remove a deck
 * @param deck - the title of the deck to remove
 * @returns {{type: string, title: *}} - the action with the deck
 */
export const removeDeck = deck => {
	return {
		type: REMOVE_DECK,
		deck,
	};
};
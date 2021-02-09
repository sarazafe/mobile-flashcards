export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';

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
	}
}
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

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
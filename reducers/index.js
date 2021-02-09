import {RECEIVE_DECKS, ADD_DECK} from "../actions";

/**
 * Reducer for decks
 * @param state - the state
 * @param action - the action to be processed
 * @returns {{}} - updated state
 */
export const decks = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_DECKS :
			return {
				...state,
				...action.decks,
			};
		case ADD_DECK:
			return {
				...state,
				[action.deck.title]: action.deck,
			}
		default :
			return state;
	}
};

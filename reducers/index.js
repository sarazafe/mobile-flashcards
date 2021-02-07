import {RECEIVE_DECKS} from "../actions";

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
		default :
			return state;
	}
};

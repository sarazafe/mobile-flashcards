import {RECEIVE_DECKS, ADD_DECK, UPDATE_DECK, REMOVE_DECK} from '../actions';

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
			};
		case UPDATE_DECK:
			const {questions} = state[action.deck.title];
			return {
				...state,
				[action.deck.title]: {
					...state[action.deck.title],
					questions: questions.concat(action.deck.question)
				}
			};
		case REMOVE_DECK:
			const stateCopy = {...state};
			delete stateCopy[action.deck];
			return {
				...stateCopy
			};
		default :
			return state;
	}
};

import * as ActionTypes from './ActionTypes';

export const initialState = {
	reviewList: [],
	userAnswers: {},
	chosenQuizId: undefined,
}

export const Reducer = (state = initialState, action) => {
	const { 
		UPDATE_CHOSEN_QUIZ_ID, 
		UPDATE_REVIEW_LIST, 
		UPDATE_USER_ANSWERS 
	} = ActionTypes;
	const { payload } = action;

	switch (action.type) {
		case (UPDATE_CHOSEN_QUIZ_ID):
			return {
				...state,
				chosenQuizId: payload.newQuizId
			}
		case (UPDATE_REVIEW_LIST):
			return {
				...state,
				reviewList: payload.newReviewList
			}
		case (UPDATE_USER_ANSWERS):
			return {
				...state,
				userAnswers: payload.newUserAnswers
			}
		default: 
			return state;
	}
}
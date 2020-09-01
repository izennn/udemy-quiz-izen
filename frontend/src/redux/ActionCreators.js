import * as ActionTypes from './ActionTypes';

export const updateChosenQuizId = (newQuizId) => ({
	type: ActionTypes.UPDATE_CHOSEN_QUIZ_ID,
	payload: {
		newQuizId: newQuizId
	}
})

export const updateReviewList = (newReviewList) => ({
	type: ActionTypes.UPDATE_REVIEW_LIST,
	payload: {
		newReviewList: newReviewList
	}
});

export const updateUserAnswers = (newUserAnswers) => ({
	type: ActionTypes.UPDATE_USER_ANSWERS,
	payload: {
		newUserAnswers: newUserAnswers
	}
});
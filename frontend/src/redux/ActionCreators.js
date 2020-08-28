import * as ActionTypes from './ActionTypes';

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
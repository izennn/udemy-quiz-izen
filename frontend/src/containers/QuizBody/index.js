import React from 'react';
import { connect } from 'react-redux';
import { updateReviewList, updateUserAnswers } from '../../redux/ActionCreators';
import QABody from '../../components/QABody';
import BottomBar from '../../components/BottomBar';

const quizBodyStyle = {
	width: '100%',
	height: '100%',
	padding: '2em 1em 2em 1em',
	flex: 'display',
	flexDirection: 'column',
	paddingLeft: '20%',
	paddingRight: '20%',
	// border: '1px solid blue'
}

const mockQuestionBody = {
	number: 1,
	question: "Which of these are animals?",
	answers: {
		A: "ELectric Bugaloo",
		B: "Sea Lion",
		C: "Chiropractor",
		D: "Madagascar",
		E: "Elephant"
	},
	correct: ["B", "E"]
}

const mockQuestionBody2 = {
	number: 2,
	question: "Which movie does NOT star Brad Pitt?",
	answers: {
		A: "Hateful Eight",
		B: "Se7en",
		C: "Fight Club",
		D: "Once Upon a Time in Hollywood"
	},
	correct: ["A"]
}

class QuizBody extends React.Component {
	render() {
		const { 
			reviewList, 
			userAnswers, 
			totalQuestions, 
			updateReviewList, 
			updateUserAnswers 
		} = this.props;

		return (
			<div style={quizBodyStyle}>
				<QABody 
					questionBody={mockQuestionBody} 
					userAnswers={userAnswers}
					updateUserAnswers={updateUserAnswers}
				/>
				<BottomBar 
					reviewList={reviewList} 
					totalQuestions={totalQuestions}
					updateReviewList={updateReviewList}
					questionNum={mockQuestionBody.number}
				/>
			</div>
		)
	};
}

const mapStateToProps = (state) => {
	return {
		totalQuestions: state.totalQuestions,   
		reviewList: state.reviewList,
		userAnswers: state.userAnswers
	};
}

const mapDispatchToProps = (dispatch) => ({
	updateReviewList: (newReviewList) => dispatch(updateReviewList(newReviewList)),
	updateUserAnswers: (newUserAnswers) => dispatch(updateUserAnswers(newUserAnswers))
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(QuizBody);
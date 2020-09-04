import React from 'react';
import { connect } from 'react-redux';
import { updateReviewList, updateUserAnswers } from '../../redux/ActionCreators';

import QABody from '../../components/QABody';

const quizBodyStyle = {
	width: '100%',
	height: '100%',
	padding: '2em 1em 2em 1em',
	flex: 'display',
	flexDirection: 'column',
	paddingLeft: '20%',
	paddingRight: '20%',
}

class QuizBody extends React.Component {
	constructor() {
		super();
		this.state = {
			questionBody: {
				number: undefined,
				question: '',
				answers: {},
				correct: [],
				next: '',
				prev: ''
			},
		}
		this.udpateQuestionBodyFromProps = this.udpateQuestionBodyFromProps.bind(this);
	}

	componentDidMount() {
		const { question } = this.props;

		this.udpateQuestionBodyFromProps(question)
	}

	componentDidUpdate(prevProps, prevState) {
		const { question } = this.props;

		if (prevProps.question !== this.props.question) {
			this.udpateQuestionBodyFromProps(question)
		}
	}

	udpateQuestionBodyFromProps(question) {
		// update this state's questionBody attributes to match prop's question
		if (question !== undefined) {
			const { results } = question;
			const questionData = results[0]

			var newQuestionBody = {}
			var newAnswers = {}
			var newCorrectList = []
			let key = ''

			questionData.answers.forEach((item, id) => {
				// fill newAnswers and newCorrectList from newly recieved question.results.answers
				key = String.fromCharCode(id + 65) // map id number to alphabet (e.g. 0 -> A) 
				newAnswers[key] = item.text
				if (item.correct === true)
					newCorrectList.push(key)
			})

			newQuestionBody = {
				number: question.page_number,
				question: questionData.prompt,
				answers: newAnswers,
				correct: newCorrectList,
				next: question.links.next,
				prev: question.links.prev
			}

			this.setState({
				...this.state,
				questionBody: newQuestionBody
			})
		}
	}

	render() {
		const { 
			totalQuestions,
			reviewList, 
			userAnswers, 
			updateReviewList, 
			updateUserAnswers,
			chosenQuizId,
			fetchPaginatedQuestion 
		} = this.props;
		const {
			questionBody
		} = this.state;

		return (
			<div style={quizBodyStyle}>
				<QABody 
					totalQuestions={totalQuestions}
					questionBody={questionBody} 
					userAnswers={userAnswers}
					updateUserAnswers={updateUserAnswers}
					reviewList={reviewList} 
					updateReviewList={updateReviewList}
					chosenQuizId={chosenQuizId}
					fetchPaginatedQuestion={fetchPaginatedQuestion}
				/>
			</div>
		)
	};
}

const mapStateToProps = (state) => {
	return {
		reviewList: state.reviewList,
		userAnswers: state.userAnswers,
		chosenQuizId: state.chosenQuizId
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
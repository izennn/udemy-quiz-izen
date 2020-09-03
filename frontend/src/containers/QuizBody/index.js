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

const mockQuestionBody3 = {
    "count": 5,
    "next": "http://localhost:8000/api/v2/quizzes/1/questions/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "quiz": 1,
            "prompt": "Which of these is a reptile?",
            "answers": [
                {
                    "id": 1,
                    "text": "Homo Sapians",
                    "correct": false
                },
                {
                    "id": 2,
                    "text": "Red Pandas",
                    "correct": false
                },
                {
                    "id": 3,
                    "text": "Water Bears",
                    "correct": false
                },
                {
                    "id": 4,
                    "text": "Komodo Dragon",
                    "correct": true
                }
            ]
        }
    ]
}

class QuizBody extends React.Component {
	constructor() {
		super();
		this.state = {
			questionBody: {
				number: undefined,
				question: '',
				answers: {},
				correct: []
			}
		}
		this.udpateQuestionBodyFromProps = this.udpateQuestionBodyFromProps.bind(this);
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
				correct: newCorrectList
			}

			this.setState({
				...this.state,
				questionBody: newQuestionBody
			})
		}
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

	render() {
		const { 
			question,
			totalQuestions,
			reviewList, 
			userAnswers, 
			updateReviewList, 
			updateUserAnswers 
		} = this.props;
		const {
			questionBody
		} = this.state;

		console.log(questionBody)
		return (
			<div style={quizBodyStyle}>
				<QABody 
					questionBody={questionBody} 
					userAnswers={userAnswers}
					updateUserAnswers={updateUserAnswers}
				/>
				<BottomBar 
					totalQuestions={totalQuestions}
					reviewList={reviewList} 
					updateReviewList={updateReviewList}
					questionNum={question.page_number}
				/>
			</div>
		)
	};
}

const mapStateToProps = (state) => {
	return {
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
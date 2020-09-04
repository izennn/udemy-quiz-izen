import React from 'react';
import { connect } from 'react-redux';
import { updateChosenQuizId } from './redux/ActionCreators';

import ChooseQuiz from './components/ChooseQuiz';
import QuizBody from './containers/QuizBody';

import { Header, Dimmer, Loader } from 'semantic-ui-react';

const hostname = 'http://127.0.0.1:8000';
const apiv = '/api/v2';

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			url_header: `${hostname}${apiv}`,
			quizzes: [],
			totalQuestions: undefined,
			question: undefined,
			isFetchingQuizzes: true,
			isFetchingQuestion: false
		}
		this.fetchQuizzes = this.fetchQuizzes.bind(this);
		this.fetchPaginatedQuestion = this.fetchPaginatedQuestion.bind(this);
	}

	async componentDidMount() {
		this.fetchQuizzes()
	}

	async componentDidUpdate(prevProps, prevState) {
		// if quiz ID updated then fetch first paginated question 

		if (prevProps.chosenQuizId !== this.props.chosenQuizId) {
			this.setState({
				isFetchingQuestion: true
			})
			this.fetchPaginatedQuestion(this.props.chosenQuizId, 1, null)
		}
	}
	async fetchQuizzes() {
		const { url_header } = this.state

		// fetch all quizzes
		try {
			const res = await fetch(`${url_header}/quizzes/`)
			const quizzes_body = await res.json();
			if (quizzes_body !== undefined) {
				this.setState({
					quizzes: quizzes_body,
					isFetchingQuizzes: false
				})				
			}
		} catch (error) {
			console.log(error)
		}
	}

	// fetches specified paginated question under given quiz id
	async fetchPaginatedQuestion(quiz_id, pageNumber, nextOrPrevURL) {
		const { url_header } = this.state;

		const url = (nextOrPrevURL === null) ? 
			`${url_header}/quizzes/${quiz_id}/questions/?page=${pageNumber}` :
			nextOrPrevURL;

		try {
			const res = await fetch(url)
			const question = await res.json()
			if (question !== undefined) {
				this.setState({
					question: question,
					totalQuestions: question.count,
					isFetchingQuestion: false
				})
			}
		} catch(error) {
			console.log(error)
		}
	}

	render() {
		const { chosenQuizId, updateChosenQuizId } = this.props;
		const { 
			quizzes, 
			totalQuestions,
			question,
			isFetchingQuizzes, 
			isFetchingQuestion
		} = this.state;
		const overallAppStyle = {
			height: '100%', 
			width: '100%', 
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
		}

		return (
			<div className="App" style={overallAppStyle}>
				<Header 
					as='h1' 
					style={{textAlign: 'center'}}
					content={chosenQuizId === undefined ? "Choose Quiz" : quizzes[chosenQuizId - 1].title}
				/>
				<Dimmer active={isFetchingQuizzes} inverted>
					<Loader inverted>Fetching Quizzes</Loader>
				</Dimmer>
				{ (!isFetchingQuizzes && chosenQuizId === undefined) ?
					<ChooseQuiz 
						quizzes={quizzes} 
						updateChosenQuizId={updateChosenQuizId}
					/> : (!isFetchingQuestion && question !== undefined) ? 
					<QuizBody 
						totalQuestions={totalQuestions}
						question={question}
						fetchPaginatedQuestion={this.fetchPaginatedQuestion}
					/>
					: <div></div>
				}
			</div>       
		);    
	}
}

const mapStateToProps = (state) => {
	return {
		chosenQuizId: state.chosenQuizId
	};
}

const mapDispatchToProps = (dispatch) => ({
	updateChosenQuizId: (newQuizId) => dispatch(updateChosenQuizId(newQuizId))
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(App);

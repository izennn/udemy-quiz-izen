import React from 'react';
import { connect } from 'react-redux';

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
	}

	async componentDidMount() {
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

	// fetches first paginated question under given quiz id
	async fetchPaginatedQuestions(quiz_id) {
		const { url_header } = this.state;

		try {
			const res = await fetch(`${url_header}/quizzes/${quiz_id}/questions/`)
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

	componentDidUpdate(prevProps, prevState) {
		// if quiz ID updated then fetch first paginated question 
		if (prevProps.chosenQuizId !== this.props.chosenQuizId) {
			this.setState({
				isFetchingQuestion: true
			})
			this.fetchPaginatedQuestions(this.props.chosenQuizId)
		}
	}

	render() {
		const { chosenQuizId } = this.props;
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
					content={chosenQuizId === undefined ? "Choose Quiz" : "Quiz Website"}
				/>
				<Dimmer active={isFetchingQuizzes} inverted>
					<Loader inverted>Fetching Quizzes</Loader>
				</Dimmer>
				{ (!isFetchingQuizzes && chosenQuizId === undefined) ?
					<ChooseQuiz 
						quizzes={quizzes} 
					/> : (!isFetchingQuestion && question !== undefined) ? 
					<QuizBody 
						totalQuestions={totalQuestions}
						question={question}
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

export default connect(
	mapStateToProps, 
	null
)(App);

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
			isFetchingQuizzes: true
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

	componentDidUpdate(prevProps, prevState) {
	}

	render() {
		const { chosenQuizId } = this.props;
		const { quizzes, isFetchingQuizzes, } = this.state;

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
					/> : 
					<div>
						Chosen quiz: {chosenQuizId}
					</div>
				}
				{/* <QuizBody /> */}
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

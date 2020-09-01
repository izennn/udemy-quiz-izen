import React from 'react';
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
			quiz_chosen: undefined,
			isFetchingQuizzes: true
		}
		this.setQuizChosen = this.setQuizChosen.bind(this);
	}

	setQuizChosen = (quiz_id) => {
		this.setState({
			quiz_chosen: quiz_id
		})
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
		const { quiz_chosen } = this.state
	}

	render() {
		const { quizzes, isFetchingQuizzes, quiz_chosen } = this.state
		const overallAppStyle = {
			height: '100%', 
			width: '100%', 
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
				// border: '1px solid blue'
		}

		return (
			<div className="App" style={overallAppStyle}>
				<Header 
					as='h1' 
					style={{textAlign: 'center'}}
					content={quiz_chosen === undefined ? "Choose Quiz" : "Quiz Website"}
				/>
				<Dimmer active={isFetchingQuizzes} inverted>
					<Loader inverted>Fetching Quizzes</Loader>
				</Dimmer>
				{ !isFetchingQuizzes &&
					<ChooseQuiz 
						quizzes={quizzes} 
						setQuizChosen={() => this.setQuizChosen()}
					/>				
				}

				{/* <QuizBody /> */}
			</div>       
		);    
	}
}

export default App;

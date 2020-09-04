import React from 'react';
import BottomBar from '../BottomBar';

import { Header, Menu } from 'semantic-ui-react';

const RenderQuestions = (props) => {
	const { answers, userInput, handleClick } = props;
	const keys = Object.keys(answers);

	return (
		<Menu vertical fluid>
			{ keys.map((key, keyID) => {
				return (
					<Menu.Item
						key={keyID}
						onClick={() => handleClick(key)}
						active={userInput.includes(key)}
					>
						{key}. {answers[key]}
					</Menu.Item>
				)
			})}
		</Menu>
	)
}

class QABody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: [],
			hasMultipleAnsewrs: false
		}
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.handleSingleChoice = this.handleSingleChoice.bind(this);
		this.handleMultChoice = this.handleMultChoice.bind(this);
	}

	// on question change, update local state userInput to Redux store's userAnswers[questionNum]
	componentDidUpdate(prevProps) {
		const { questionBody, userAnswers } = this.props;

		if (prevProps.questionBody !== this.props.questionBody) {
			var previousUserInput = []

			if (userAnswers[questionBody.number - 1]) {
				previousUserInput = userAnswers[questionBody.number - 1]
			}

			this.setState({ 
				userInput: previousUserInput,
				hasMultipleAnsewrs: this.props.questionBody.correct.length > 1
			})
		}
	}

	handleSingleChoice(inputAnswer) {
		const { userInput } = this.state;
		const newUserInput = [];

		// 2 scenarios: user has not input yet, or user has already inputted something
		if (userInput.length === 0) {
			newUserInput.push(inputAnswer);
		} else {
			newUserInput[0] = inputAnswer
		}

		this.setState({
			userInput: newUserInput
		})
	}

	handleMultChoice(inputAnswer) {
		const { questionBody } = this.props;
		const { userInput } = this.state;
		const { correct } = questionBody;
		var newUserInput = []
		newUserInput.push(...userInput);

		// for mult choice if user clicks the same answer, that answer is removed from user input list
		const inputAnswerIndex = newUserInput.indexOf(inputAnswer);
		if (inputAnswerIndex !== -1) {
			newUserInput.splice(inputAnswerIndex, 1);
		} else {
			// only push input answer if user input length < correct length
			if (userInput.length < correct.length) {
				newUserInput.push(inputAnswer)
			}     
		}

		this.setState({
			userInput: newUserInput
		})
	}

	handleAnswerClick(inputAnswer) {
		const { hasMultipleAnsewrs } = this.state;

		// 2 separate cases: single choice vs multiple choice
		if (!hasMultipleAnsewrs) {
			this.handleSingleChoice(inputAnswer)
		} else {
			this.handleMultChoice(inputAnswer)
		}
	}

	render() {
		const { 
			totalQuestions,
			reviewList,
			updateReviewList,
			userAnswers,
			updateUserAnswers,
			chosenQuizId,
			fetchPaginatedQuestion,
		} = this.props;
		const {
			number,
			question,
			answers,
			correct,
			next,
			prev
		} = this.props.questionBody;
		const { 
			userInput, 
			hasMultipleAnsewrs 
		} = this.state;

		return (
			<div>
				<div id="questionPromptDiv" style={{minHeight: '70px', maxHeight: '70px', overflowY: 'auto'}}>
					<Header as='h3'>
					{number}. {question}
					{ hasMultipleAnsewrs && 
						<Header.Subheader>(Choose {correct.length}.)</Header.Subheader>
					}
					</Header>
				</div>
				<div
					style = {{
						marginTop: '0.5em',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<div style={{minHeight: '180px'}}>
						<RenderQuestions 
							number={number} 
							answers={answers} 
							userInput={userInput} 
							handleClick={this.handleAnswerClick} 
						/>							
					</div>

					<BottomBar 
						questionNum={number}
						totalQuestions={totalQuestions}
						reviewList={reviewList}
						updateReviewList={updateReviewList}
						userInput={userInput}
						userAnswers={userAnswers}
						updateUserAnswers={updateUserAnswers}
						nextLink={next}
						prevLink={prev}
						chosenQuizId={chosenQuizId}
						fetchPaginatedQuestion={fetchPaginatedQuestion}
					/>					
				</div>

			</div>
		);
	}
}

export default QABody;
import React from 'react';
import { Header, Menu } from 'semantic-ui-react';

const RenderQuestions = ({number, answers, userInput, handleClick}) => {
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
		}
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.handleSingleChoice = this.handleSingleChoice.bind(this);
		this.handleMultChoice = this.handleMultChoice.bind(this);
	}

	// on question change, update local state userInput to Redux store's userAnswers[questionNum]
	componentDidUpdate(prevProps, prevState) {
		const { userAnswers } = this.props;

		if (prevProps.questionBody.number !== this.props.questionBody.number) {
			this.setState({ 
				userInput: userAnswers[this.props.questionBody.number]
			})
		}
	}

	handleSingleChoice(inputAnswer) {
		const { questionBody, userAnswers, updateUserAnswers } = this.props;
		const { correct, number } = questionBody;
		const { userInput } = this.state;
		const newUserInput = [];

		// 3 scenarios: user has not input yet, user clicked the same choice, and user changing choice
		if (userInput.length === 0) {
			newUserInput.push(inputAnswer);
		} else if (userInput[0] === inputAnswer){
			newUserInput.push(...userInput);
		} else {
			newUserInput[0] = inputAnswer
		}

		// update Redux store's userAnswer
		const newUserAnswers = {...userAnswers};
		newUserAnswers[number] = newUserInput;
		updateUserAnswers(newUserAnswers)
	}

	handleMultChoice(inputAnswer) {
		const { questionBody, userAnswers, updateUserAnswers } = this.props;
		const { correct, number } = questionBody;
		const { userInput } = this.state;
		const newUserInput = []
		newUserInput.push(...userInput);

		// for mult choice if user clicks the same answer, that answer is removed from user input list
		const inputAnswerIndex = newUserInput.indexOf(inputAnswer);
		if (inputAnswerIndex !== -1) {
			newUserInput.splice(inputAnswerIndex, 1);
		} else {
			// when input answer is NOT already in user input, we have to beware of userInput.length vs correct.length
			if (userInput.length < correct.length) {
			// just add it!
			newUserInput.push(inputAnswer)
			} // otherwise we just do nothing!    
		}

		// update redux store's user answers
		const newUserAnswers = {...userAnswers};
		newUserAnswers[number] = newUserInput;
		updateUserAnswers(newUserAnswers)
	}

	handleAnswerClick(inputAnswer) {
		const { questionBody } = this.props;

		// 2 separate cases: single choice vs multiple choice
		if (questionBody.correct.length === 1) {
			this.handleSingleChoice(inputAnswer)
		} else {
			this.handleMultChoice(inputAnswer)
		}
	}

	render() {
		const {
			number,
			question,
			answers,
			correct
		} = this.props.questionBody;
		const { userInput } = this.state;

		return (
			<div>
				<div>
					<Header>
					{number}. {question}
					{correct.length > 1 && <Header.Subheader>(CHOOSE {correct.length}.)</Header.Subheader>}
					</Header>
				</div>
				<RenderQuestions 
					number={number} 
					answers={answers} 
					userInput={userInput} 
					handleClick={this.handleAnswerClick} 
				/>
			</div>
		);
	}
}

export default QABody;
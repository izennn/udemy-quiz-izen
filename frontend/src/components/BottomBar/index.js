import React from 'react';
import BottomMenu from '../BottomMenu';
import { Button, Label } from 'semantic-ui-react';

const RenderNavAndMenuButtons = (props) => {
	const {
		chosenQuizId,
		questionNum,
		totalQuestions,
		reviewList,
		nextLink,
		prevLink,
		userAnswers,
		updateUserAnswersAndFetch
	} = props;	
	
	return (
		<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
			<Button 
				id="prevButton"
				icon='angle double left' 
				disabled={questionNum === 1} 
				onClick={() => updateUserAnswersAndFetch(null, null, prevLink)}
			/>
			<div style={{width: '0.5em'}} />
			<BottomMenu 
				chosenQuizId={chosenQuizId}
				totalQuestions={totalQuestions}
				questionNum={questionNum} 
				reviewList={reviewList} 
				updateUserAnswersAndFetch={updateUserAnswersAndFetch}
				userAnswers={userAnswers}
			/>
			<div style={{width: '0.5em'}} />
			<Button 
				id="nextButton"
				icon='angle double right' 
				disabled={questionNum === totalQuestions}
				onClick={() => updateUserAnswersAndFetch(null, null, nextLink)}
			/>
		</div>
	)
}

const RenderFlagAndSubmit = (props) => {
	const {
		handleFlagClick,
		hoveringOverFlag,
		setHoveringOverFlag,
		reviewList,
		questionNum
	} = props

	return (
		<div 
			style={{
				dispaly: 'flex', 
				flexDirection: 'row', 
				justifyContent: 'space-between',
			}}
		>
			<Button 
				id="reviewFlagButton"
				icon='flag outline'             
				onClick={() => handleFlagClick(questionNum)}
				onMouseOver={() => setHoveringOverFlag(true)}
				onMouseLeave={() => setHoveringOverFlag(false)}
				style={{backgroundColor: reviewList.includes(questionNum) ? 'orange' : null}}
			/>
			<Button
				id='submitButton'
				content='Submit'
				onClick={() => console.log("Submit!")}
			/>
		</div>
	)
}


class BottomBar extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			hoveringOverFlag: false
		}
		this.handleFlagClick = this.handleFlagClick.bind(this);
		this.setHoveringOverFlag = this.setHoveringOverFlag.bind(this);
	}

	// toggle review detail for specific question number
	handleFlagClick = (questionNum) => {
		const { reviewList, updateReviewList } = this.props;
		const newReviewList = [];
		const indexOfQuestion = reviewList.indexOf(questionNum);

		newReviewList.push(...reviewList);
		if (indexOfQuestion !== -1) {
			newReviewList.splice(indexOfQuestion, 1);
		} else {
			newReviewList.push(questionNum)
		}

		updateReviewList(newReviewList)
	}

	setHoveringOverFlag = (value) => {
		this.setState({
			hoveringOverFlag: value
		});
	}

	updateUserAnswersAndFetch = (quiz_id, pageNumber, nextOrPrevLink) => {
		const {
			userInput,
			userAnswers,
			updateUserAnswers,
			questionNum,
			fetchPaginatedQuestion
		} = this.props;

		var newUserAnswers = {...userAnswers}
		newUserAnswers[questionNum - 1] = userInput
		updateUserAnswers(newUserAnswers)			
		fetchPaginatedQuestion(quiz_id, pageNumber, nextOrPrevLink)
	}

	render() {
		const { 
			totalQuestions,
			questionNum, 
			nextLink,
			prevLink,
			reviewList, 
			chosenQuizId,
			userAnswers,
		} = this.props;
		const { hoveringOverFlag } = this.state;

		return (
			<div 
				style={{
					marginTop: '1.5em', 
					display: 'flex', 
					flexDirection: 'row', 
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div style={{width: '60%'}}>
					<RenderNavAndMenuButtons
						chosenQuizId={chosenQuizId}
						questionNum={questionNum}
						totalQuestions={totalQuestions}
						reviewList={reviewList}
						handleFlagClick={this.handleFlagClick}
						hoveringOverFlag={hoveringOverFlag}
						setHoveringOverFlag={this.setHoveringOverFlag}
						nextLink={nextLink}
						prevLink={prevLink}
						userAnswers={userAnswers}
						updateUserAnswersAndFetch={this.updateUserAnswersAndFetch}
					/>
				</div>
				<div>
					<RenderFlagAndSubmit
						handleFlagClick={this.handleFlagClick}
						hoveringOverFlag={hoveringOverFlag}
						setHoveringOverFlag={this.setHoveringOverFlag}
						reviewList={reviewList}
						questionNum={questionNum}
					/>					
				</div>
			
			</div>
		);    
	}
}

export default BottomBar;
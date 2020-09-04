import React from 'react';
import BottomMenu from '../BottomMenu';
import { Button } from 'semantic-ui-react';

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
		userInput,
		userAnswers,
		updateUserAnswers,
		handleFlagClick,
		reviewList,
		questionNum,
		setIsConfirmModalOpen
	} = props

	function updateUnserAnswersAndOpenModal() {
		var newUserAnswers = {...userAnswers}
		newUserAnswers[questionNum - 1] = userInput
		updateUserAnswers(newUserAnswers)
		setIsConfirmModalOpen(true)
	}

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
				style={{backgroundColor: reviewList.includes(questionNum) ? 'orange' : null}}
			/>
			<Button
				id='submitButton'
				content='Submit'
				onClick={() => {
					updateUnserAnswersAndOpenModal()
				}}
			/>
		</div>
	)
}


class BottomBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFlagClick = this.handleFlagClick.bind(this);
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
			userInput,
			userAnswers,
			updateUserAnswers,
			setIsConfirmModalOpen
		} = this.props;

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
						nextLink={nextLink}
						prevLink={prevLink}
						userAnswers={userAnswers}
						updateUserAnswersAndFetch={this.updateUserAnswersAndFetch}
					/>
				</div>
				<div>
					<RenderFlagAndSubmit
						userInput={userInput}
						userAnswers={userAnswers}
						updateUserAnswers={updateUserAnswers}
						handleFlagClick={this.handleFlagClick}
						reviewList={reviewList}
						questionNum={questionNum}
						setIsConfirmModalOpen={setIsConfirmModalOpen}
					/>					
				</div>
			
			</div>
		);    
	}
}

export default BottomBar;
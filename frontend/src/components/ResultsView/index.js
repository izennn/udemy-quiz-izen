import React from 'react'

class ResultsView extends React.Component {
	render() {
		const { 
			allQuestions, 
			userAnswers 
		} = this.props;

		return (
			<div>
				{allQuestions.map((question) => {
					return (
						<div key={question.id}>{question.prompt}</div>
					)
				})}
			</div>
		)
	}
}

export default ResultsView;
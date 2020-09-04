import React from 'react';

import { Card } from 'semantic-ui-react';

const RenderQuizCards = (props) => {
	const { quizzes, updateChosenQuizId } = props
	
	return (
		<React.Fragment>
			{ 	
				quizzes.map((quiz) => {
					return (
						<Card key={quiz.id} onClick={() => updateChosenQuizId(quiz.id)}>
							<Card.Content>
								<Card.Header>{quiz.title}</Card.Header>
								<Card.Meta>
									{`By ${quiz.author_fullname}`}
								</Card.Meta>
								<Card.Description>
									{`Total questions: ${quiz.total_questions}`}
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								Created on {quiz.created_at.slice(0, 10)}
							</Card.Content>
						</Card>
					);
				})
			}		
		</React.Fragment>	
	)
}

class ChooseQuiz extends React.Component {
	render() {
		const { quizzes, updateChosenQuizId } = this.props;

		return (
			<div
				style = {{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					overflowY: 'auto',
				}}
			>
				<div className="cards-div" style={{padding: '1em'}}>
					{ quizzes !== undefined && 
						<RenderQuizCards 
							quizzes={quizzes} 
							updateChosenQuizId={updateChosenQuizId}
						/>
					}
				</div>
			</div>
		);
	}
}

export default ChooseQuiz;

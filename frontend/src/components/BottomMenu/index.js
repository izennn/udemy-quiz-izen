import React from 'react';
import { Menu } from 'semantic-ui-react';

class BottomMenu extends React.Component {
	constructor() {
		super();
		this.state = {
			activeItem: null
		}
	}

	render() {
		const { 
			totalQuestions,
			questionNum, 
			reviewList, 
			chosenQuizId,
			updateUserAnswersAndFetch,
		} = this.props;

		var iterateArray = []
		for (var i = 1; i <= totalQuestions; i++) {
			iterateArray.push(i);    
		}

		return (
			<Menu>
				{ iterateArray.map((i) => {
					return (
						<Menu.Item 
							key={i}
							name={`${i}`} 
							active={questionNum === i} 
							onClick={() => updateUserAnswersAndFetch(chosenQuizId, i, null)}
							style={{
								backgroundColor: reviewList.includes(i) ? 'orange' : null
							}}
						/>
					)
				})}
			</Menu>
		)
	}
}

export default BottomMenu;
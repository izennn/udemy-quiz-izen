import React from 'react';
import { Menu } from 'semantic-ui-react';

const RenderMenuItems = ({questionNum, totalQuestions, reviewList}) => {
	const iterateArray = []
	for (var i = 1; i <= totalQuestions; i++) {
		iterateArray.push(i);    
	}

	return (
		<React.Fragment>
			{ iterateArray.map((i) => {
			return (
				<Menu.Item name={`${i}`} key={i} active={questionNum === i} color={reviewList.includes(i) ? 'orange' : null} />
			)
			})}
		</React.Fragment>
	)
}

class BottomMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: null,
		}
	}

	render() {
		const { questionNum, reviewList, totalQuestions } = this.props;
		const { activeItem } = this.state;

		return (
			<Menu>
			<RenderMenuItems questionNum={questionNum} totalQuestions={totalQuestions} reviewList={reviewList} />
			</Menu>
		)
	}
}

export default BottomMenu;
import React from 'react';
import BottomMenu from '../BottomMenu';
import { Container, Button, Label } from 'semantic-ui-react';

class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hoveringOverFlag: false
    }
    this.handleFlagClick = this.handleFlagClick.bind(this);
  }

  // toggle the input question number for review
  handleFlagClick(questionNum) {
    const { reviewList, updateReviewList } = this.props;
    const newReviewList = [];
    newReviewList.push(...reviewList);

    const indexOfQuestion = reviewList.indexOf(questionNum);
    if (indexOfQuestion !== -1) {
      newReviewList.splice(indexOfQuestion, 1);
    } else {
      newReviewList.push(questionNum)
    }

    updateReviewList(newReviewList);
  }

  render() {
    const { reviewList, questionNum, totalQuestions } = this.props;
    const { hoveringOverFlag } = this.state;

    return (
      <Container style={{marginTop: '1.5em', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
          <BottomMenu questionNum={questionNum} reviewList={reviewList} totalQuestions={totalQuestions}/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>
            <Button 
              size='large' 
              icon='flag outline'             
              color={reviewList.includes(questionNum) ? "orange" : null} 
              onClick={() => this.handleFlagClick(questionNum)}
              onMouseOver={() => this.setState({hoveringOverFlag: true})}
              onMouseLeave={() => this.setState({hoveringOverFlag: false})}
            />
            <Button 
              size='large' 
              disabled={questionNum === 1} 
              icon='angle double left' 
            />
            { questionNum === totalQuestions ?
              <Button
                size='large'
                content='Submit'
              /> : 
              <Button 
                size='large' 
                icon='angle double right' 
              />   
            }
          </div>
          { hoveringOverFlag && <Label basic color='orange' style={{marginTop: '1em'}}>Mark for Review</Label>}
        </div>
      </Container>
    );    
  }
}

export default BottomBar;
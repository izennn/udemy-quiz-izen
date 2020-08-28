import React from 'react';
import QuizBody from './containers/QuizBody';
import { Header } from 'semantic-ui-react';

class App extends React.Component {

  render() {
    const overallAppStyle = {
      height: '100vh', 
      width: '100vw', 
      paddingTop: '2em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }

    return (
      <div className="App" style={overallAppStyle}>
        <Header as='h1' style={{textAlign: 'center'}}>Izen's Udemy Coding Challenge</Header>
        <QuizBody />
      </div>       
    );    
  }
}

export default App;

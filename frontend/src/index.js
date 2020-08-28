import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { unregister } from './serviceWorker';

const target = document.querySelector('#root');
document.body.style.overflow = 'hidden';

const store = ConfigureStore()

class Index extends React.Component {
    render() {
        return (
            <Provider store={store}>
			    <App />            
            </Provider>
        );
    }
}

ReactDOM.render(<Index />, target);
unregister();
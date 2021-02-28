import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { useHistory, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from './redux/store';

const RealApp = () => {
  const history = useHistory();
  return (
    <Provider store={appStore(history)}>
      <App />
    </Provider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <RealApp />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

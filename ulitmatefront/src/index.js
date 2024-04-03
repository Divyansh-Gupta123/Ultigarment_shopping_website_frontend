import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootReducer from './Components/Storage/RootReducer';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store=createStore(RootReducer)


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

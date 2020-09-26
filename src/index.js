import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const globalState = {
  dataoption : [],
  datapenerimas:[],
  datadonasis:[],
}

const rootReducer = (state = globalState, action) => {
  
  if(action.type === 'UPDATEOPTION'){
    return{
      ... state,
      dataoption:action.dataoptions
    } 
  }

  if(action.type === 'UPDATEPENERIMA'){
    return{
      ... state,
      datapenerimas:action.datapenerimas
    } 
  }

  if(action.type === 'UPDATEDONASI'){
    return{
      ... state,
      datadonasis:action.datadonasis
    } 
  }
  
  return state;

}

const storeRedux = createStore(rootReducer);

ReactDOM.render(
  <Provider store={storeRedux}>
    <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

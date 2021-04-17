import React, { useState } from 'react';
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import MainScreen from './src/screens/MainScreen'
import resourceReducer from './src/store/reducers/saveResourceInfo.reducer'

const rootReducer = combineReducers({
  resources: resourceReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
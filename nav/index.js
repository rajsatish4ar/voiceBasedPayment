import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'; // 1.3.0
import App from './App';
import Splash from '../src/Splash';
import Success from '../src/Success';
export default createAppContainer(
  createSwitchNavigator(
    {
      Splash,
      App,
      Success,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);

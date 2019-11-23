import React from 'react';
import Checkout from '../src/Checkout';
import InputScreen from '../src';
import {createStackNavigator, createAppContainer} from 'react-navigation';
export default createAppContainer(
  createStackNavigator(
    {
      Checkout,
      InputScreen,
    },
    {
      initialRouteName: 'Checkout',
      headerMode: 'screen',
      defaultNavigationOptions: {
        header: null,
      },
    },
  ),
);

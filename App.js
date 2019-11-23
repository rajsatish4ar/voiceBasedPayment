import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Application from './src';
const App = () => {
  return (
    <View style={{backgroundColor: 'red'}}>
      <Application />
    </View>
  );
};

export default App;

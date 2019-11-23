import React, {useEffect} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('App');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2EC0BE" />
      <Text style={styles.heading}>{`Reactor`}</Text>
      <Text
        style={
          styles.details
        }>{`Voice Based And Intuitive Payment Interface in UPI`}</Text>
      <LottieView
        source={require('../assets/loader.json')}
        autoPlay
        loop
        style={styles.loader}
      />
    </View>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {fontWeight: 'bold', fontSize: 45, color: '#2EC0BE'},
  details: {
    fontSize: 16,
    width: 300,
    textAlign: 'center',
    marginTop: 20,
    color: '#2EC0BE',
  },
  loader: {position: 'absolute', height: 250, bottom: 0},
});

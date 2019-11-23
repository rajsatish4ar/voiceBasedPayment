import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
const Success = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2EC0BE" />
      <Text style={styles.heading}>{`Success`}</Text>
      <LottieView
        source={require('../assets/success.json')}
        autoPlay
        loop={false}
        style={styles.loader}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate('Success')}>
        <Text style={styles.btnText}>{`Try Again`}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Success;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    position: 'absolute',
    top: 20,
    color: '#2EC0BE',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    height: 45,
    backgroundColor: '#2EC0BE',
    width: '96%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {color: 'white', fontSize: 20},
  name: {fontSize: 20, fontWeight: 'bold'},
  price: {fontSize: 20, fontWeight: '600'},
});

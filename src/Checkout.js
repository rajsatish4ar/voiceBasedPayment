import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
const Checkout = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2EC0BE" />
      <Text style={styles.heading}>{`Checkout`}</Text>
      <Image source={require('../assets/tshirt.png')} />
      <Text style={styles.name}>{`Fine Tshirt`}</Text>
      <Text style={styles.price}>{`₹100.00`}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate('InputScreen')}>
        <Text style={styles.btnText}>{`Procced to Payment`}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Checkout;

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

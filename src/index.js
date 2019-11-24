import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Tts from 'react-native-tts';
import CreditCard from 'react-native-credit-card';
import LottieView from 'lottie-react-native';
const {height, width} = Dimensions.get('window');
const ERROR_SPEAK = 'There is something wrong please try again.';
import {INPUTS, checkCardValidtion} from './utils/Configs';
let isValidating = false;
import RazorpayCheckout from 'react-native-razorpay';
let speakType = undefined;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      number: '1234567887654321',
      cvc: '123',
      expiry: '1234',
      name: 'satish rajbhar',
      type: '',
      isUserSpeaking: false,
      stepNum: 0,
    };
    Dialogflow.setConfiguration(
      '6a0663ee1ea64a10b3419d96cc6a570d',
      Dialogflow.LANG_ENGLISH,
    );
  }

  componentDidMount() {
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {
      console.log('finish', event);
      if (speakType === undefined) return;
      if (speakType === 'question') this.dialogflow();
      else if (speakType === 'error') this.askToUser();
    });
    Tts.getInitStatus().then(
      () => {
        // this.askToUser();
      },
      err => {
        Alert.alert('', 'No text to speech engine installed on Android');
      },
    );
  }

  dialogflow() {
    this.setState({isUserSpeaking: true});
    isValidating = false;
    Dialogflow.startListening(
      result => {
        this.setState({isUserSpeaking: false});

        const {stepNum} = this.state;
        if (stepNum === 4) {
          setTimeout(() => {
            this.doPayment();
          }, 3000);
        }
        const data = INPUTS[stepNum];
        if (result && result.result && result.result.resolvedQuery) {
          this.setState({result: result.result.resolvedQuery});
          if (!isValidating) {
            console.log('result ', result);
            isValidating = true;
            const res = checkCardValidtion(result.result.resolvedQuery, data);
            if (res) {
              if (stepNum === 0) this.setState({number: res, stepNum: 1});
              else if (stepNum === 1) this.setState({name: res, stepNum: 2});
              else if (stepNum === 2) this.setState({expiry: res, stepNum: 3});
              else if (stepNum === 3) this.setState({cvc: res, stepNum: 4});
              speakType = 'question';
              this.askToUser();
            } else {
              speakType = 'error';
              Tts.stop();
              Tts.speak(data.errorMsg);
            }
          } else {
            // skip multiple query
          }
        } else {
          speakType = 'error';
          Tts.stop();
          Tts.speak(ERROR_SPEAK);
        }
      },
      error => {
        this.setState({isUserSpeaking: false});
        speakType = 'error';
        Tts.stop();
        Tts.speak(ERROR_SPEAK);
      },
    );
  }

  askToUser = () => {
    this.setState({result: ''});
    const {stepNum} = this.state;
    const data = INPUTS[stepNum];
    const {speak} = data;
    if (stepNum === 4) {
      speakType = undefined;
      Tts.stop();
      Tts.speak(speak);
      return;
    }

    speakType = 'question';
    Tts.stop();
    Tts.speak(speak);
  };

  doPayment = () => {
    const {number, cvc, expiry, name, type} = this.state;
    const expMonth = expiry.substring(0, 2);
    const expYear = expiry.substring(1, 3);
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: '10000',
      name: 'foo',
      method: 'card',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name,
        'card[number]': number,
        'card[expiry_month]': expMonth,
        'card[expiry_year]': expYear,
        'card[cvv]': cvc,
      },
      theme: {color: '#2EC0BE'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        this.props.navigation.navigate('Success', {
          orderId: data.razorpay_payment_id,
        });
      })
      .catch(error => {
        console.log('TCL: doPayment -> error', error);
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  resetAll() {
    Tts.stop();
    speakType = undefined;
    isValidating = false;
    this.setState({
      stepNum: 0,
      number: '',
      cvc: '',
      expiry: '',
      result: '',
      name: '',
      isUserSpeaking: false,
    });
  }
  resetField() {
    Tts.stop();
    isValidating = false;
    const {stepNum} = this.state;
    if (stepNum === 0) this.setState({number: ''});
    else if (stepNum === 1) this.setState({name: ''});
    else if (stepNum === 2) this.setState({expiry: ''});
    else if (stepNum === 3) this.setState({cvc: ''});
    this.setState({isUserSpeaking: false});
  }

  render() {
    const {isUserSpeaking, result, stepNum} = this.state;
    const isValidResult = result && result.length > 0 ? true : false;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2EC0BE" />
        <View style={styles.resetView}>
          <TouchableOpacity
            onPress={() => {
              this.resetAll();
            }}
            style={styles.resetBnt}>
            <Text style={styles.resetText}>{`Reset All`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 5}}
            onPress={() => {}}
            style={styles.resetBnt}>
            <Text style={styles.resetText}>{`Reset Field`}</Text>
          </TouchableOpacity>
        </View>
        {isValidResult && (
          <Text
            style={{
              width: '70%',
              textAlign: 'center',
              marginBottom: 20,
            }}>{`Input Result : ${result ? result : ''}`}</Text>
        )}
        <View style={{height: 180}}>
          <CreditCard
            type={this.state.type}
            imageFront={require('../assets/card-front.png')}
            imageBack={require('../assets/card-back.png')}
            style={{backgroundColor: '#f5f6f7'}}
            focused={this.state.focused}
            number={this.state.number}
            name={this.state.name}
            expiry={this.state.expiry}
            cvc={this.state.cvc}
          />
        </View>
        <Text
          style={{
            width: '70%',
            marginTop: 20,
          }}>{`** Listen to the query asked to you and tell your answer after the beep.`}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => (stepNum > 3 ? this.proccedBtn() : this.askToUser())}
          style={styles.proccedBtn}>
          <Text
            style={[
              styles.resetText,
              {color: 'white', alignSelf: 'center'},
            ]}>{`${stepNum > 3 ? 'Procced to Payment' : 'Start '}`}</Text>
        </TouchableOpacity>

        <LottieView
          source={require('../assets/voice.json')}
          autoPlay
          loop
          style={{
            position: 'absolute',
            height: 200,
            width,
            bottom: 0,
            opacity: isUserSpeaking ? 1 : 0,
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height,
    flex: 1,
    backgroundColor: '#f5f6f7',
  },
  resetText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  resetView: {position: 'absolute', right: 16, top: 100},
  proccedBtn: {
    backgroundColor: '#2EC0BE',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    minWidth: '70%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  resetBnt: {
    backgroundColor: '#3b3b3a',
    borderRadius: 6,
    paddingRight: 8,
    paddingStart: 8,
    marginTop: 16,
  },
});

export default App;

import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Tts from 'react-native-tts';
import CreditCard from 'react-native-credit-card';
import LottieView from 'lottie-react-native';
const {height, width} = Dimensions.get('window');
const ERROR_SPEAK = 'There is something wrong please try again.';
import {INPUTS, checkCardValidtion} from './utils/Configs';
let isValidating = false;
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
      isUserSpeaking: true,
      stepNum: 0,
    };
    Dialogflow.setConfiguration(
      '6a0663ee1ea64a10b3419d96cc6a570d',
      Dialogflow.LANG_ENGLISH,
    );
  }

  componentDidMount() {}

  dialogflow() {
    setTimeout(() => {
      this.setState({isUserSpeaking: true});
      isValidating = false;
      Dialogflow.startListening(
        result => {
          this.setState({isUserSpeaking: false});

          const {stepNum} = this.state;
          const data = INPUTS[stepNum];
          if (result && result.result && result.result.resolvedQuery) {
            if (!isValidating) {
              console.log('result ', result);
              isValidating = true;
              const res = checkCardValidtion(result.result.resolvedQuery, data);
              if (res) {
                if (stepNum === 0) this.setState({number: res, stepNum: 1});
                else if (stepNum === 1) this.setState({name: res, stepNum: 1});
                else if (stepNum === 2) this.setState({cvc: res, stepNum: 1});
                else if (stepNum === 3)
                  this.setState({expiry: res, stepNum: 1});
                else if (stepNum === 4) this.setState({pin: res, stepNum: 1});
                this.askToUser();
              } else {
                Tts.stop();
                Tts.speak(data.errorMsg);
                setTimeout(() => {
                  this.askToUser();
                }, 3000);
              }
            } else {
              // skip multiple query
            }
          } else {
            Tts.stop();
            Tts.speak(ERROR_SPEAK);
          }
        },
        error => {
          this.setState({isUserSpeaking: false});
          Tts.stop();
          Tts.speak(ERROR_SPEAK);
          setTimeout(() => {
            this.askToUser();
          }, 3000);
        },
      );
    }, 10);
  }

  openAssitant() {
    this.askToUser();
  }

  askToUser = () => {
    const {stepNum} = this.state;
    const data = INPUTS[stepNum];
    const {speak} = data;
    Tts.getInitStatus().then(
      () => {
        Tts.stop();
        Tts.speak(speak);
        this.dialogflow();
      },
      err => {
        Alert.alert('', 'No text to speech engine installed on Android');
      },
    );
  };

  render() {
    const {isUserSpeaking} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2EC0BE" />

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
        {/* <Button
          title="Open Assistant"
          onPress={() => {
            this.openAssitant();
          }}
        /> */}

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
});

export default App;

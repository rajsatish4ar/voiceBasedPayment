export const INPUTS = [
  {
    inputType: 'Card Number',
    regex: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
    speak: 'Hello, Can I have your 16 digit Card number please ',
    errorMsg: 'Hey, This is not a valid card number. Please try again.',
    id: 100,
  },
  {
    inputType: 'Name on Card',
    regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    speak: 'Please tell the name on the card',
    errorMsg: 'Invalid Name. Please try again',
    id: 101,
  },
  {
    inputType: 'CVV',
    regex: /^[0-9]{3,4}$/,
    speak: 'May I know your 3 digit CVV, please',
    errorMsg: 'Oh ho! Invalid CVV, Lets give another try.',
    id: 102,
  },
  {
    inputType: 'Expiry Date',
    regex: /^[0-9]{4}$/,
    speak:
      'Please speak the card expiry date. Like if it is December 2019, say 1219',
    errorMsg: 'This is not valid. Please try again.',
    id: 103,
  },
  {
    inputType: 'PIN',
    regex: /^[0-9]{4}$/,
    speak:
      'Great! One more and then we are good to go with the payment. Please tell your PIN',
    errorMsg: 'Invalid Invalid. Please try again.',
    id: 104,
  },
];

export const checkCardValidtion = (txt = '', data = INPUTS[0]) => {
  while (txt.includes('-') || txt.includes('+') || txt.includes(' ')) {
    txt = txt.replace('-', '');
    txt = txt.replace('+', '');
    txt = txt.replace(' ', '');
  }
  if (data.id === 101) {
    while (txt.includes(' ')) {
      txt = txt.replace(' ', '');
    }
  }
  txt = txt.trim();
  console.log('TCL: validate ', data.inputType, txt);
  // var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  if (data.regex.test(txt)) return txt;
  else return;
};

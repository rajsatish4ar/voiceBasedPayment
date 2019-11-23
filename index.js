import {AppRegistry} from 'react-native';
import Route from './nav';
import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Route);

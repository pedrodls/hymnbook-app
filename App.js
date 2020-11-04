/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { SafeAreaView } from 'react-native';

import Hymnscreen from './src/screens/hymnscreen'

export default class App extends Component {

  render(){
    return(
        <Hymnscreen />
    );
  }
}
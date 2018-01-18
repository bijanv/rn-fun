import React from 'react';
import { AppRegistry, StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import Main from './Components/main.js';
import CameraView from './Components/camera';

const InToBeer = StackNavigator({ 
  Home: { screen: Main, },
  CameraScreen: {screen: CameraView},
},{
  headerMode: 'none',
});

export default class App extends React.Component {
  render() {
    return <InToBeer />;
  }
}

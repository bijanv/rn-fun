import React from 'react';
import { StyleSheet, View  } from 'react-native';
import CameraView from './camera.js';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class Main extends React.Component {

  takePicture(){
    this.props.navigation.navigate('CameraScreen');
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (        
      <Container style={styles.container}>
        {/* <Header /> */}
        <Content>
          <Text style={styles.paragraph}>Take a pic of the beer list</Text>
          <Button block bottom icon onPress={this.takePicture.bind(this)}>
            <Icon name="camera" style={{fontSize: 30}}/>
          </Button>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph:{
    paddingTop: 200, 
    paddingBottom: 20, 
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent:'center',
    color: '#FFF',
  }
});
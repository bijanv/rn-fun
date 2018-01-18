import React from 'react';
import { Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Camera, FileSystem, Permissions } from 'expo';

export default class CameraView extends React.Component {
    
  static navigationOptions = {
    title: 'Take a Pic!',
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
          this.props.navigation.goBack();          
        });
      });
    }
  };
  
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                  style={
                      { flex: 1,
                          alignSelf: 'flex-end',
                          alignItems: 'center', }
                  }
                  onPress={this.takePicture.bind(this)}>
                  <Text style={{color: 'white',fontSize: 15}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

module.exports = CameraView;
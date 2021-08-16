import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './CaptureButton.js'


export default class Camera extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identifedAs: '',
            loading: false
        }
    }

    takePicture = async function () {

        if (this.camera) {

            // Pause the camera's preview
            // this.camera.pausePreview();

            // Set the activity indicator
            this.setState((previousState, props) => ({
                loading: true
            }));


            const data = await this.camera.takePictureAsync()

            this.props.navigation.navigate('ARExplorer', { targetImage: data.uri });
        }
    }


    render() {
        return (
            <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
            <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
                <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
            </RNCamera>
        );
    }
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    loadingIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

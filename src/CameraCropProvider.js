import React from 'react';
import { StyleSheet } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';


export default class Camera extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // add possible state
        }
    }

    componentDidMount() {
        this.initCamera()
    }

    async initCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            freeStyleCropEnabled: true
            // cropperToolbarTitle //TODO: add text like crop only object 
        }).then(image => {
            setTimeout(() => {
                // here store image.path + linked word in redux for example to use after 
               
                // this is for testing purpose
                this.props.navigation.navigate('ARExplorer', { targetImage: image.path });
            }, 1000);
        }).catch(error => console.log('error', error));
    }

    render() {
        return (
            null
        );
    }
}

const styles = StyleSheet.create({});

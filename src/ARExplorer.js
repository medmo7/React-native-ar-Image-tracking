import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroFlexView,
  ViroSpotLight,
  ViroQuad,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroBox,
  ViroDirectionalLight,
  ViroAnimations,
  ViroNode,
  ViroButton
} from '@viro-community/react-viro';



function initARAssets(imageTarget) {
  ViroARTrackingTargets.createTargets(
    {
      testImage: {
        source: { uri: imageTarget },
        orientation: "Up",
        physicalWidth: 0.165 // real world width in meters
      }
    }
  );

  ViroAnimations.registerAnimations({
    scaleUp: {
      properties: { scaleX: 1, scaleY: 1, scaleZ: 1, },
      duration: 500, easing: "bounce"
    },
    scaleDown: {
      properties: { scaleX: 0, scaleY: 0, scaleZ: 0, },
      duration: 200,
    },
    scaleButton: {
      properties: { scaleX: .09, scaleY: .09, scaleZ: .09, },
      duration: 500, easing: "bounce"
    },
    scaleSphereUp: {
      properties: { scaleX: .8, scaleY: .8, scaleZ: .8, },
      duration: 50, easing: "easeineaseout"
    },
    scaleSphereDown: {
      properties: { scaleX: 1, scaleY: 1, scaleZ: 1, },
      duration: 50, easing: "easeineaseout"
    },
    tapAnimation: [["scaleSphereUp", "scaleSphereDown"],]
  });
}

export default class ARExplorer extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      animateButton: false
    };
    this._onInitialized = this._onInitialized.bind(this);
    this.MainScene = this.MainScene.bind(this)

  }

  componentDidMount() {
    initARAssets(this.props.route.params.targetImage)
  }


  onAnchorFound = () => {
    console.log('target found ======*******************')
    this.setState({ animateButton: true })

  }
  toggleButton = () => {
    alert("button pressed")
    console.log('button pressed ===========')
    // setAnimName(animName == "scaleUp" ? "scaleDown" : "scaleUp");
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "target found"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }


  MainScene() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} anchorDetectionTypes={'PlanesHorizontal'} onAnchorFound={this.onAnchorFound} pauseUpdates={false}>
        <ViroARImageMarker target={"testImage"} >
          <ViroNode
            onClick={() => console.log('button pressed ===========')}
            width={.1}
            height={.1}
            style={styles.node}
            rotation={[-100, 90, 0]}>
            {/* <ViroFlexView
                style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
              width={.1}
              height={.1}
              // position={[0, 0, 0]}
              > */}
            <ViroText text={this.state.text}
              // width={.1}
              // height={.1}
              scale={[.1, .1, .1]}
              style={styles.text} />
            {/* </ViroFlexView> */}
          </ViroNode>
          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={.7} />

          {/* <ViroQuad
              rotation={[-90, 0, 0]}
              position={[0, -0.001, 0]}
              width={2.5} height={2.5}
              arShadowReceiver={true} /> */}
        </ViroARImageMarker>
      </ViroARScene>
    );
  }





  render() {
    return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: this.MainScene,
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

var styles = StyleSheet.create({
  containerAvail: {
    // flexDirection: 'column',
    backgroundColor: "#E98300",
    alignItems: 'center',
    justifyContent: 'center',
    padding: .2,
  },
  node: {
    backgroundColor: 'red'
  },
  containerNotAvail: {
    // flexDirection: 'column',
    backgroundColor: "#e91530",
    alignItems: 'center',
    justifyContent: 'center',
    padding: .2,
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: 'yellow',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
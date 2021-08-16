import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import AdBanner from 'ui/ads/AdBanner';
import ARExplorer from '../ARExplorer/';
import CameraProvider from '../CameraProvider';





const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTintColor:"white", headerStyle:{backgroundColor:'black'}}}  initialRouteName="CameraProvider">
        <Stack.Screen name="ARExplorer" component={ARExplorer} />
        <Stack.Screen name="CameraProvider" component={CameraProvider} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

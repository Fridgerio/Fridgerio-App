import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { BarcodeFrame } from '../components/styled-components/Scanner';

function CameraScreen({ navigation }) {
  /* State Hooks and functions to change these states */
  const [hasCameraPermission, toggleCameraPermission] = useState(null);
  const [scanned, toggleScanned] = useState(false);
  /* Lifecycle method to check camera permission first */
  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      toggleCameraPermission(status === 'granted');
    };
    askPermission();
  }, []);
  /* Alert with barcode type and number */
  const handleBarCodeScanned = ({ type, data }) => {
    toggleScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned.`);
  };
  if (hasCameraPermission === null) {
    /* Render this if camera permission has not been checked */
    return <Text>Frage Kameraerlaubnis ab.</Text>;
  } else if (hasCameraPermission === false) {
    /* Render this if camera permission is denied */
    return <Text>Kein Zugriff auf Kamera.</Text>;
  }
  /* Render this if camera permission is granted */
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <BarcodeFrame source={require('../../assets/img/barcode-frame.png')} />
      {scanned && (
        <PrimaryButton
          title={'Nochmals scannen'}
          style={{
            width: '70%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
          onPress={() => toggleScanned(false)}
        />
      )}
      {/* Go to product input form if this button is tapped */}
      <PrimaryButton
        title={'Manuell eingeben'}
        style={{
          width: '70%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        onPress={() => navigation.navigate('ProductFormScreen')}
      />
    </View>
  );
}

/* Navigation options */
CameraScreen.navigationOptions = {
  title: 'Scanne einen Barcode',
};

export default CameraScreen;

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { BarcodeFrame } from '../components/svg/BarcodeFrame';

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
  const fetchProduct = async code => {
    try {
      const url = `https://products.sklinkusch.now.sh/?${code}`;
      const response = await fetch(url);
      const data = await response.json();
      const {
        status,
        product: { product_name, quantity },
      } = await data;
      if (status === 1) {
        alert(`Bar code ${code} erkannt, entspricht ${product_name} ${quantity}`);
      } else {
        alert(`Bar code ${code} is not in the database`);
      }
    } catch (error) {
      alert(`${error.message}`);
    }
  };
  /* Alert with barcode type and number */
  const handleBarCodeScanned = ({ type, data }) => {
    if (type === 32 || type === 64) {
      fetchProduct(data);
      toggleScanned(true);
    } else {
      toggleScanned(false);
    }
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
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean8,
          BarCodeScanner.Constants.BarCodeType.ean13,
        ]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          flex: 2,
        }}
      />
      <BarcodeFrame />
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

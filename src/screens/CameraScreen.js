import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

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
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={'Nochmals scannen'}
          onPress={() => toggleScanned(false)}
        />
      )}
      {/* Go to product input form if this button is tapped */}
      <Button
        title={'Manuell eingeben'}
        onPress={() => navigation.navigate('ProductFormScreen')}
      />
    </View>
  );
}
/* Styles - unused */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

/* Navigation options */
CameraScreen.navigationOptions = {
  title: 'CameraScreen',
};

export default CameraScreen;

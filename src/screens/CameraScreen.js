import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

function CameraScreen({ navigation }) {
  const [hasCameraPermission, toggleCameraPermission] = useState(null);
  const [scanned, toggleScanned] = useState(false);
  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      toggleCameraPermission(status === 'granted');
    };
    askPermission();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    toggleScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned.`);
  };
  if (hasCameraPermission === null) {
    return <Text>Frage Kameraerlaubnis ab.</Text>;
  } else if (hasCameraPermission === false) {
    return <Text>Kein Zugriff auf Kamera.</Text>;
  }
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
      <Button
        title={'Manuell eingeben'}
        onPress={() => navigation.navigate('ProductFormScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

CameraScreen.navigationOptions = {
  title: 'CameraScreen',
};

export default CameraScreen;

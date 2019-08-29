import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function CameraScreen() {
  // // const [flash, setFlash] = useState(false);
  // const [type] = useState('back');
  // // const toggleFlash = () => setFlash(!flash);
  // // const renderTopBar = () => (
  // // <View>
  // // <TouchableOpacity onPress={toggleFlash}>
  // // <Ionicons name={'ion-flash'} size={32} color="white" />
  // // </TouchableOpacity>
  // // </View>
  // // );
  // const renderCamera = () => (
  //   <View style={{ flex: 1 }}>
  //     <Camera
  //       ref={ref => {
  //         const camera = ref;
  //       }}
  //       type={type}
  //       // flashMode={flash}
  //     >
  //       {/* {renderTopBar()} */}
  //     </Camera>
  //   </View>
  // );
  // return <View style={styles.container}>{renderCamera()}</View>;
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
          title={'Tap to Scan Again'}
          onPress={() => toggleScanned(false)}
        />
      )}
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

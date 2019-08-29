import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarCodeScanner } from 'expo';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function CameraScreen() {
  // // const [barcodeScanning, setBarcodeScanning] = useState(false);
  // // const [flash, setFlash] = useState(false);
  // // const [ratio] = useState('16:9');
  // const [type] = useState('back');
  // // const toggleFlash = () => setFlash(!flash);
  // // const toggleBarcodeScanning = () => setBarcodeScanning(!barcodeScanning);
  // // const onBarCodeScanned = code => {
  // // toggleBarcodeScanning();
  // // Alert.alert(`Barcode found: ${code.data}`);
  // // };
  // // const handleMountError = ({ message }) => console.error(message);
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
  //       // ratio={ratio}
  //       // onMountError={handleMountError}
  //       // barCodeScannerSettings={{
  //       // barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
  //       // }}
  //       // onBarCodeScanned={barcodeScanning ? onBarCodeScanned : undefined}
  //     >
  //       {/* {renderTopBar()} */}
  //     </Camera>
  //   </View>
  // );
  // return <View style={styles.container}>{renderCamera()}</View>;
  const [hasCameraPermission, toggleCameraPermission] = useState(null);
  const [type] = useState(Camera.Constants.Type.back);
  const [autoFocus] = useState(true);
  const [zoom] = useState(0);
  const [whiteBalance] = useState('auto');
  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      toggleCameraPermission(status === 'granted');
    };
    askPermission();
  }, []);
  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        autoFocus={autoFocus}
        zoom={zoom}
        whiteBalance={whiteBalance}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        />
      </Camera>
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

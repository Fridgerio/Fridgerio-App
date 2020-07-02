import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Platform, Image, Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { PrimaryButton } from '../components/styled-components/Buttons';
import HelpText from '../components/CameraHelpText';
import { NavigationEvents } from 'react-navigation';
import { Elementbox } from '../components/styled-components/Boxes';
import { Colors } from '../components/styled-components/Variables';

function CameraScreen({ navigation }) {
  /* State Hooks and functions to change these states */
  const [hasCameraPermission, toggleCameraPermission] = useState(null);
  const [scanned, toggleScanned] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Lifecycle method to check camera permission first */
  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      toggleCameraPermission(status === 'granted');
    };
    askPermission();
    setHelpTimer();
  }, []);

  /* Show help text after 8 seconds without successfull scan */
  const setHelpTimer = () =>
    setTimeout(() => {
      setShowHelp(true);
    }, 8000);

  /* method to build a product name from the API data */
  const generateName = (brand, name, quantity) => {
    let pbrand;
    /* only take the brand if it is different from the name */
    if (brand === name) {
      pbrand = '';
    } else {
      pbrand = brand;
    }
    let identifier = 0; // identifier tells which data is present
    identifier += pbrand === '' || pbrand === undefined ? 0 : 4;
    identifier += name === '' || name === undefined ? 0 : 2;
    identifier += quantity === '' || quantity === undefined ? 0 : 1;
    /* switch statement generates the optimal productName */
    switch (identifier) {
      case 0:
      case 1:
        return '';
      case 2:
        return name;
      case 3:
        return `${name} ${quantity}`;
      case 4:
        return pbrand;
      case 5:
        return `${pbrand} ${quantity}`;
      case 6:
        return `${pbrand} ${name}`;
      default:
        return `${pbrand} ${name} ${quantity}`;
    }
  };
  /* method to fetch the API data */
  const fetchProduct = async code => {
    try {
      Vibration.vibrate();
      setLoading(true);
      setShowHelp(false);
      const url = `https://products.fridgerio.now.sh/?${code}`;
      const response = await fetch(url);
      const data = await response.json();
      /* destructuring important data */
      const {
        status,
        product: { brand, product_name, quantity, categories },
      } = await data;
      if (status === 1) {
        /* if the product is found in the database */
        /* (1) generate a product name */
        const productName = generateName(brand, product_name, quantity);
        const productCategory = categories ? categories[0] : undefined;
        if (
          productName === '' ||
          productName === undefined ||
          productName === null
        ) {
          alert('Produkt nicht in der Datenbank');
          navigation.navigate('ProductFormScreen');
        } else {
          /* (2) set the product in the state */
          setProduct({ productName, productCategory });
          /* (3) show the modal */
          toggleModal(true);
        }
      } else {
        /* if product is not in the database */
        /* (1) make an alert */
        alert('Produkt nicht in der Datenbank.');
        /* (2) navigate to the empty form screen */
        navigation.navigate('ProductFormScreen');
      }
    } catch (error) {
      /* show error message in an alert if there is an error */
      alert(`${error.message}`);
    }
  };
  const redirectRight = () => {
    toggleModal(false);
    toggleScanned(true);
    setLoading(false);
    const { productName, productCategory } = product;
    navigation.navigate('ProductFormScreen', {
      productName,
      productCategory,
    });
  };
  const redirectFalse = () => {
    toggleModal(false);
    toggleScanned(true);
    setLoading(false);
    navigation.navigate('ProductFormScreen');
  };
  const handleBarCodeScanned = Platform.select({
    ios: ({ data }) => handleBarCodeIOS(data),
    android: ({ type, data }) => handleBarCodeAndroid(type, data),
  });
  const handleBarCodeIOS = data => {
    fetchProduct(data); // fetch the data from the products API
    toggleScanned(true); // set scanned to true, to avoid multiple scanning
  };
  const handleBarCodeAndroid = (type, data) => {
    /* if it is ean13 or ean8 */
    if (type === 32 || type === 64) {
      fetchProduct(data); // fetch the data from the products API
      toggleScanned(true); // set scanned to true, to avoid multiple scanning
    } else {
      toggleScanned(false); // scanned remains false for qr codes etc.
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
      <Image
        source={require('../../assets/BarcodeScannerWindow.png')}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
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
          zIndex: -10,
        }}
      />
      <NavigationEvents
        onDidBlur={() => {
          toggleScanned(true);
          setShowHelp(false);
        }}
        onDidFocus={() => {
          toggleScanned(false);
          setHelpTimer();
        }}
      />
      {!showHelp && !loading && <HelpText />}
      {showHelp && <HelpText title="Barcode mittig positionieren" />}
      {loading && <HelpText title="Barcode wurde erkannt. Bitte warten..." />}
      {/* Go to product input form if this button is tapped */}
      <PrimaryButton
        title={'Manuell\neingeben'}
        size={'16px'}
        style={{
          opacity: 0.8,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        onPress={() => {
          navigation.navigate('ProductFormScreen');
        }}
      />
      <Modal animationType={'slide'} visible={showModal}>
        <View style={{ marginVertical: 120, marginHorizontal: 25 }}>
          <View>
            {product && (
              <Text
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 36 }}
              >
                Produkt erkannt: {product.productName}
              </Text>
            )}
            <Elementbox>
              <PrimaryButton
                onPress={redirectFalse}
                title={'Abbrechen'}
                color={Colors.PrimaryUtilityColor}
              />
              <PrimaryButton onPress={redirectRight} title={'Weiter'} />
            </Elementbox>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* Navigation options */
CameraScreen.navigationOptions = {
  title: 'Scanne einen Barcode',
};

export default CameraScreen;

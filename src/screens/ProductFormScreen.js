import React, { useState, useContext } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';

import CategoryPicker from '../components/CategoryPicker';
import AddLabels from '../components/AddLabels';
import NumberPicker from '../components/NumberPicker';
import BestBeforeDatePicker from '../components/BestBeforeDatePicker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Input } from '../components/styled-components/Inputs';
import { Context } from '../context/Context';
import { BlockText } from '../components/styled-components/Text';

function ProductFormScreen({ navigation }) {
  /* get data from CameraScreen */
  const product = navigation.state.params;
  const name = product ? product.productName : undefined;
  const category = product ? product.productCategory : undefined;
  /* some states */
  const [productName, setProductName] = useState(name);
  const [amount, setAmount] = useState(1);
  const [productCategory, setProductCategory] = useState(category);
  const [bestBeforeDate, setBestBeforeDate] = useState(dateOfToday());
  const [pushNotificationDate, setPushNotificationDate] = useState(null);
  const [customNote, setCustomNote] = useState(null);
  const [error, setError] = useState(null);
  /* add function from Context */
  const { addProduct } = useContext(Context);
  /* calculate the date for the notification */
  const getNotificationDate = days => {
    const notificationDate = new Date(bestBeforeDate - days * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE');
    setPushNotificationDate(notificationDate);
  };
  /* calculate the date of today */
  const dateOfToday = () => {
    const date = new Date(Date.now());
    return date.toLocaleDateString('de-DE');
  };
  /* clear the form (cancel button at the end of the form) */
  const clearForm = () => {
    /* reset all states to original values */
    setProductName(productName);
    setAmount(1);
    setProductCategory(productCategory);
    setBestBeforeDate(dateOfToday());
    setPushNotificationDate(null);
    setCustomNote(null);
    /* navigate back to HomeScreen */
    navigation.navigate('HomeScreen');
  };
  /* function to add or edit a product (save button) */
  const addEditProduct = () => {
    /* check for empty required form fields */
    if (
      productName === null ||
      productName === undefined ||
      productName === ''
    ) {
      setError('Es wurde kein Name angegeben.');
    } else if (amount === null || amount === undefined || amount === '') {
      setError('Es wurde keine Menge angegeben.');
    } else {
      setError(null);
    }
    /* go on if there is no error */
    if (error === null) {
      /* add product to the list */
      addProduct(
        productName,
        amount,
        productCategory,
        bestBeforeDate,
        pushNotificationDate,
        customNote,
        null
      );
      /* navigate to the list */
      navigation.navigate('ListScreen');
    }
  };
  // console.log(product);
  return (
    <ScrollView>
      {/* Large category icon */}
      <MaterialCommunityIcons
        name="food-apple"
        style={{
          color: '#7da10d',
          fontSize: 150,
          width: 150,
          height: 150,
          paddingRight: 15,
          backgroundColor: '#1b4e55',
          alignSelf: 'flex-end',
          margin: 10,
        }}
      />

      <Input
        inputLabel="Name"
        placeholder="z.B. Apfel"
        defaultValue={name}
        editable
        onChangeText={text => setProductName(text)}
      />

      <CategoryPicker category={category} onValueChange={setProductCategory} />

      <NumberPicker
        title="Menge"
        defaultValue={amount || 1}
        maxNum={50}
        onValueChange={setAmount}
      />

      <BestBeforeDatePicker onValueChange={setBestBeforeDate} />

      <NumberPicker
        title="Benachrichtigung"
        maxNum={14}
        onValueChange={getNotificationDate}
      />

      <Input
        inputLabel="Notiz"
        placeholder="Add custom note"
        multiline
        editable
        textAlignVertical="top"
        onChangeText={text => setCustomNote(text)}
      />

      {error && (
        <BlockText color={'red'} weight={'bold'}>
          {error}
        </BlockText>
      )}

      <FlatList
        data={[
          { key: 'x', name: 'Abbrechen', function: () => clearForm() },
          {
            key: 'v',
            name: 'Speichern',
            function: () => addEditProduct(),
          },
        ]}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <PrimaryButton title={item.name} onPress={item.function} />
        )}
      />
    </ScrollView>
  );
}

ProductFormScreen.navigationOptions = ({ navigation }) => ({
  title:
    navigation.dangerouslyGetParent().state.routeName == 'Add'
      ? 'Neues Produkt'
      : 'Produkt Bearbeiten',
  headerRight: (
    <Text>
      <Ionicons name="md-trash" size={22} color="white" />
    </Text>
  ),
});

export default ProductFormScreen;

import React, { useState, useContext } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';

import CategoryPicker from '../components/CategoryPicker';
import AddLabels from '../components/AddLabels';
import NumberPicker from '../components/NumberPicker';
import BestBeforeDatePicker from '../components/BestBeforeDatePicker';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Input } from '../components/styled-components/Inputs';
import { Row } from '../components/styled-components/Links';
import { Colors } from '../components/styled-components/Variables';
import { Textbox, Elementbox } from '../components/styled-components/Boxes';
import { Context } from '../context/Context';
import { BlockText, StyledText } from '../components/styled-components/Text';
import { StyledIonicon } from '../components/styled-components/Icons';

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
  const [pushNotificationDate, setPushNotificationDate] = useState(3);
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
  function dateOfToday() {
    const date = new Date(Date.now());
    let day = date.getDate();
    day = day < 10 ? `0${day}` : `${day}`;
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : `${month}`;
    const year = date.getFullYear();
    return [year, month, day].join('-');
  }
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
    let errorCode = 0;
    if (
      productName === null ||
      productName === undefined ||
      productName === ''
    ) {
      setError('Es wurde kein Name angegeben.');
      errorCode = 1;
    } else if (amount === null || amount === undefined || amount === '') {
      setError('Es wurde keine Menge angegeben.');
      errorCode = 1;
    } else {
      setError(null);
      errorCode = 0;
    }
    /* go on if there is no error */
    if (errorCode === 0) {
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
    }
    if (errorCode === 0) {
      /* navigate to the list */
      navigation.navigate('ListScreen');
    }
  };
  // console.log(product);
  return (
    <ScrollView>
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <Input
          inputLabel="Name"
          placeholder="z.B. Apfel"
          defaultValue={name}
          editable
          onChangeText={text => setProductName(text)}
          borderWidth="0"
        />
      </Textbox>

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
        defaultValue={3}
        type={'notification'}
      />

      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <Input
          inputLabel="Notiz"
          placeholder="Füge eine eigene Notiz hinzu"
          multiline
          editable
          textAlignVertical="top"
          borderWidth="0"
          onChangeText={text => setCustomNote(text)}
        />
      </Textbox>

      {error && (
        <BlockText color={'red'} weight={'bold'}>
          {error}
        </BlockText>
      )}

      <Elementbox>
        <PrimaryButton
          title="Abbrechen"
          onPress={() => clearForm()}
          flex="1"
          margin="3px"
        />
        <PrimaryButton
          title="Speichern"
          onPress={() => addEditProduct()}
          flex="1"
          margin="3px"
        />
      </Elementbox>
    </ScrollView>
  );
}

ProductFormScreen.navigationOptions = ({ navigation }) => ({
  title:
    navigation.dangerouslyGetParent().state.routeName == 'Add'
      ? 'Neues Produkt'
      : 'Produkt Bearbeiten',
  headerRight: (
    <StyledIonicon
      name="md-trash"
      color={Colors.LightColor}
      margin="0 10px"
      padding="5px"
    />
  ),
});

export default ProductFormScreen;

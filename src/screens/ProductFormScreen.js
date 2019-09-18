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
import { Textbox } from '../components/styled-components/Boxes';
import { Context } from '../context/Context';
import { StyledText } from '../components/styled-components/Text';
import { StyledIonicon } from '../components/styled-components/Icons';

function ProductFormScreen({ navigation }) {
  const product = navigation.state.params;
  const [name, setName] = useState(product ? product.productName : null);
  const [amount, setAmount] = useState(null);
  const [categories, setCategories] = useState(product ? product.categories : []);
  const [expiryDate, setExpiryDate] = useState(null);
  const [notification, setNotification] = useState(null);
  const [customNote, setCustomNote] = useState(null);
  const { addProduct } = useContext(Context);
  const getNotificationDate = days => {
    const notificationDate = new Date(expiryDate - days * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE');
    setNotification(notificationDate);
  };
  const dateOfToday = () => {
    const date = new Date(Date.now());
    return date.toLocaleDateString('de-DE');
  };
  const clearForm = () => {
    setName(product ? product.name : null);
    setAmount(null);
    setCategories(product ? product.categories : []);
    setExpiryDate(dateOfToday());
    setNotification(null);
    setCustomNote(null);
  };
  const addEditProduct = () => {
    addProduct(
      name,
      amount,
      categories,
      expiryDate,
      notification,
      customNote,
      null
    );
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
          onChangeText={text => setName(text)}
          borderWidth='0'
        />
      </Textbox>

      <CategoryPicker category={categories[0]} onValueChange={setCategories} />

      <NumberPicker title="Menge" maxNum={10} onValueChange={setAmount} />

      <BestBeforeDatePicker onValueChange={setExpiryDate} />

      <NumberPicker
        title="Benachrichtigung"
        maxNum={14}
        onValueChange={getNotificationDate}
      />

      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <Input
          inputLabel="Notiz"
          placeholder="Add custom note"
          multiline
          editable
          textAlignVertical="top"
          borderWidth='0'
          onChangeText={text => setCustomNote(text)}
        />
      </Textbox>

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
    <StyledIonicon name="md-trash" color={Colors.LightColor} margin="0 10px" padding="5px" />
  ),
});

export default ProductFormScreen;

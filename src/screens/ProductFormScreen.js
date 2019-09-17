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

function ProductFormScreen({ navigation }) {
  const product = navigation.state.params;
  const [name, setName] = useState(product ? product.name : null);
  const [amount, setAmount] = useState(null);
  const [label, setLabel] = useState(null);
  const [categories, setCategories] = useState(product ? product.categories : []);
  const [expiryDate, setExpiryDate] = useState(null);
  const [notification, setNotification] = useState(null);
  const [customNote, setCustomNote] = useState(null);
  const { addProduct, updateProduct } = useContext(Context);
  const getNotificationDate = days => {
    const notificationDate = new Date(expiryDate - days * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE');
    setNotification(notificationDate);
  };
  const clearForm = () => {
    const fields = [
      inputField,
      categorySelector,
      amountField,
      dateSelector,
      notificationSelector,
      labelSelector,
      notesField,
    ];
    fields.forEach(field => (field.current.value = ''));
  };
  const addEditProduct = parentRoute => {
    // console.warn(
    //   name,
    //   amount,
    //   categories,
    //   label,
    //   expiryDate,
    //   notification,
    //   customNote
    // );
    parentRoute.state.routeName === 'Add'
      ? addProduct(
          name,
          amount,
          categories,
          label,
          expiryDate,
          notification,
          customNote,
          null
        )
      : updateProduct(
          name,
          amount,
          categories,
          label,
          expiryDate,
          notification,
          customNote,
          null
        );
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
        onChangeText={text => setName(text)}
      />

      <CategoryPicker category={categories[0]} onValueChange={setCategories} />

      <NumberPicker title="Menge" maxNum={10} onValueChange={setAmount} />

      <BestBeforeDatePicker onValueChange={setExpiryDate} />

      <NumberPicker
        title="Benachrichtigung"
        maxNum={14}
        onValueChange={getNotificationDate}
      />

      <AddLabels onPress={setLabel} />

      <Input
        inputLabel="Notiz"
        placeholder="Add custom note"
        multiline
        editable
        textAlignVertical="top"
        onChangeText={text => setCustomNote(text)}
      />

      <FlatList
        data={[
          { key: 'x', name: 'Abbrechen', function: { clearForm } },
          {
            key: 'v',
            name: 'Speichern',
            function: () => addEditProduct(navigation.dangerouslyGetParent()),
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

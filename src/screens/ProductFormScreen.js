import React, { useState } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';

import CategoryPicker from '../components/CategoryPicker';
import AddLabels from '../components/AddLabels';
import NumberPicker from '../components/NumberPicker';
import BestBeforeDatePicker from '../components/BestBeforeDatePicker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Input } from '../components/styled-components/Inputs';

function ProductFormScreen({ navigation }) {
  const product = navigation.state.params;
  const [name, setName] = useState(product ? product.name : null);
  const [categories, setCategories] = useState(product ? product.categories : null);
  console.log(product);
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
      />

      <CategoryPicker />

      <NumberPicker title="Menge" maxNum={10} />

      <BestBeforeDatePicker />

      <NumberPicker title="Benachrichtigung" maxNum={14} />

      <AddLabels />

      <Input
        inputLabel="Notiz"
        placeholder="Add custom note"
        multiline
        editable
        textAlignVertical="top"
      />

      <FlatList
        data={[
          { key: 'x', name: 'Abbrechen' },
          { key: 'v', name: 'Speichern' },
        ]}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <PrimaryButton title={item.name} />}
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

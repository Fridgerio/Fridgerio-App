import React from 'react';
import {
  ScrollView,
  Text,
  FlatList,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
} from 'react-native';

import CategoryPicker from '../components/CategoryPicker';
import AddLabels from '../components/AddLabels';
import NumberPicker from '../components/NumberPicker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { Textbox } from '../components/styled-components/Boxes';
import { Input } from '../components/styled-components/Inputs';

// BBDatePicker returns the date picker compatible with the OS
function BBDatePickerIOS() {
  return (
    <DatePickerIOS
      initialDate={new Date()}
      minimumDate={new Date()}
      mode="date"
    />
  );
}

function BBDatePickerAndroid() {
  // DatePickerAndroid.open({
  //   date: new Date(),
  // });
  return <Text>Not available yet</Text>;
}

const BBDatePicker = Platform.select({
  ios: () => BBDatePickerIOS,
  android: () => BBDatePickerAndroid,
})();

function ProductFormScreen() {
  return (
    <ScrollView>
      <Input inputLabel="Name" placeholder="z.B. Apfel" editable />

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
        }}
      />

      <CategoryPicker />

      <NumberPicker title="Menge" maxNum={10} />

      <Textbox>
        <Text>Mindesthaltbarkeitsdatum</Text>
        <BBDatePicker />
      </Textbox>

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

ProductFormScreen.navigationOptions = {
  title: 'Neues Produkt',
  headerRight: (
    <Text>
      <Ionicons name="md-trash" size={22} color="white" />
    </Text>
  ),
};

export default ProductFormScreen;

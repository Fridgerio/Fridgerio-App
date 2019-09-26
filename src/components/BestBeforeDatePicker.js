import React from 'react';
import { Text, DatePickerIOS, DatePickerAndroid, Platform } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';

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

export default function BestBeforeDatePicker() {
  const OSPicker = Platform.select({
    ios: () => BBDatePickerIOS,
    android: () => BBDatePickerAndroid,
  })();

  return (
    <React.Fragment>
      <Textbox>
        <Text>Mindesthaltbarkeitsdatum</Text>
      </Textbox>
      <OSPicker />
    </React.Fragment>
  );
}

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showDateTimePicker = () => {
    this.setState({ visible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ visible: false });
  };

  handleDatePicked = date => {
    console.warn('A date has been picked: ', date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <Textbox>
            <Text>Mindesthaltbarkeitsdatum</Text>
          </Textbox>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.visible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </React.Fragment>
    );
  }
}

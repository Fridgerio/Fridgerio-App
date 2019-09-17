import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      date: new Date(),
    };
  }

  showDateTimePicker = () => {
    this.setState({ visible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ visible: false });
  };

  handleDatePicked = date => {
    this.setState({ date: date });
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : `${month}`;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : `${day}`;
    const fullDate = [year, month, day];
    const formattedDate = fullDate.join('-');
    console.warn('A date has been picked: ', formattedDate);
    this.props.onValueChange(formattedDate);
    this.hideDateTimePicker();
  };

  render() {
    const { date, visible } = this.state;
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <Textbox>
            <Text>Mindesthaltbarkeitsdatum</Text>
            <Text>{date.toLocaleDateString('de-DE')}</Text>
          </Textbox>
        </TouchableOpacity>
        <DateTimePicker
          titleIOS="Wähle das Datum"
          date={date}
          isVisible={visible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </React.Fragment>
    );
  }
}

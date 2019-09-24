import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { StyledText } from './styled-components/Text';
import { Row } from './styled-components/Links';
import { Colors, FontSize } from './styled-components/Variables';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';

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
    // console.warn('A date has been picked: ', formattedDate);
    this.props.onValueChange(formattedDate);
    this.hideDateTimePicker();
  };

  render() {
    const { date, visible } = this.state;
    return (
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <Row>
          <StyledText>Mindesthaltbarkeitsdatum</StyledText>
        </Row>
        <Row>
          <TouchableOpacity onPress={this.showDateTimePicker}>
            <StyledText 
              color="#C7C7CD"
              size={FontSize.small}
            >
              {date.toLocaleDateString('de-DE')}
            </StyledText>
          </TouchableOpacity>
          <Ionicons name="ios-arrow-down" size={24} />
        </Row>
          <DateTimePicker
            titleIOS="Wähle das Datum"
            date={date}
            isVisible={visible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
      </Textbox>
    );
  }
}

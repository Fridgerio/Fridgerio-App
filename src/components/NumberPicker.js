import React from 'react';
import { Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import RNPickerSelect from 'react-native-picker-select';

export default class NumberPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [{ value: 1, label: '1' }],
      maxNum: props.maxNum,
      title: props.title,
    };
  }

  componentDidMount() {
    this.CreateNumberPicker();
  }

  // Accepts a maximum number and returns a picker with ascending numbers from 1 to maximum
  CreateNumberPicker = () => {
    const numbers = [];
    for (let i = 1; i <= this.state.maxNum; i++) {
      numbers.push({ label: `${i}`, value: i });
    }
    this.setState({ numbers: numbers });
    return numbers;
  };

  render() {
    const { title, numbers } = this.state;
    return (
      <React.Fragment>
        <Textbox>
          <Text>{title}</Text>
        </Textbox>
        <RNPickerSelect
          value={this.props.defaultValue}
          onValueChange={value => this.props.onValueChange(value)}
          items={numbers}
          placeholder={{ label: 'Bitte wähle eine Zahl', value: null }}
        />
      </React.Fragment>
    );
  }
}

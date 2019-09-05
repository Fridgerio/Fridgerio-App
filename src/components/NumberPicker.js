import React from 'react';
import { Text, Picker, TouchableHighlight } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';

export default class NumberPicker extends React.Component {
  state = {
    visible: false,
  };

  // Accepts a maximum number and returns a picker with ascending numbers from 1 to maximum
  CreateNumberPicker(maxNum) {
    const numPicker = [];
    for (let i = 1; i <= maxNum; i++) {
      numPicker.push(<Picker.Item label={`${i}`} value={i} key={i} />);
    }
    return numPicker;
  }

  render() {
    const { title, maxNum } = this.props;
    return (
      <React.Fragment>
        <TouchableHighlight
          onPress={() => {
            console.log(this.state.visible);
            return this.setState(prev => ({ visible: !prev.visible }));
          }}
        >
          <Textbox>
            <Text>{title}</Text>
          </Textbox>
        </TouchableHighlight>
        <Picker prompt={title} selectedValue={1}>
          {this.CreateNumberPicker(maxNum)}
        </Picker>
      </React.Fragment>
    );
  }
}

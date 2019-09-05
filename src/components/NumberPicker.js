import React from 'react';
import { Text, Picker, TouchableHighlight, View, Modal } from 'react-native';
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
          onPress={() => this.setState(prev => ({ visible: !prev.visible }))}
        >
          <Textbox>
            <Text>{title}</Text>
          </Textbox>
        </TouchableHighlight>
        <Modal
          visible={this.state.visible}
          transparent
          onRequestClose={() => this.setState({ visible: false })}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              height: 200,
              backgroundColor: 'whitesmoke',
            }}
          >
            <Picker prompt={title} selectedValue={1}>
              {this.CreateNumberPicker(maxNum)}
            </Picker>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

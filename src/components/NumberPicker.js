import React, { Component, Fragment } from 'react';
import { Platform, Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { StyledText } from './styled-components/Text';
import { Row } from './styled-components/Links';
import { Colors } from './styled-components/Variables';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [
        {
          value: this.props.defaultValue,
          label: `${this.props.defaultValue} ${
            this.props.type === 'notification' ? 'Tage vorher' : ''
          }`,
        },
      ],
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
      if (this.props.type === 'notification') {
        if (i === 1) {
          numbers.push({ label: `${i} Tag vorher`, value: i });
        } else {
          numbers.push({ label: `${i} Tage vorher`, value: i });
        }
      } else {
        numbers.push({ label: `${i}`, value: i });
      }
    }
    this.setState({ numbers: numbers });
    return numbers;
  };

  ComponentIOS = () => {
    const { title, numbers } = this.state;
    return (
      <Textbox bottomLine={Colors.PrimaryUtilityColor}>
        <Row>
          <StyledText>{title}</StyledText>
        </Row>
        <Row>
          <RNPickerSelect
            onValueChange={value => this.props.onValueChange(value)}
            items={numbers}
            placeholder={{}}
          />
          <Ionicons name="ios-arrow-down" size={24} />
        </Row>
      </Textbox>
    );
  };

  ComponentAndroid = () => {
    const { title, numbers } = this.state;
    return (
      <Fragment>
        <Textbox>
          <Text>{title}</Text>
        </Textbox>
        <RNPickerSelect
          onValueChange={value => this.props.onValueChange(value)}
          items={numbers}
          placeholder={{}}
        />
      </Fragment>
    );
  };

  render() {
    const Component = Platform.select({
      ios: () => this.ComponentIOS,
      android: () => this.ComponentAndroid,
    })();
    return <Component />;
  }
}

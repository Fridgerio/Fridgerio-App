import React from 'react';
import { Picker, Modal, View } from 'react-native';

import { Input } from '../components/styled-components/Inputs';
import { TouchableHighlight } from 'react-native-gesture-handler';

const categories = [
  { id: '1', name: 'Alle', icon: 'food' },
  { id: '2', name: 'Obst&Gemüse', icon: 'food-apple' },
  { id: '3', name: 'Milchprodukte', icon: 'food-croissant' },
  { id: '4', name: 'Nudeln, Reis usw.', icon: 'food-fork-drink' },
  { id: '5', name: 'Getränke', icon: 'food-variant' },
];

// Returns picker with category names
export default class CategoryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <TouchableHighlight
          onPress={() => {
            console.log(this.state.visible);
            return this.setState(prev => ({ visible: !prev.visible }));
          }}
        >
          <Input
            inputLabel="Kategorie"
            placeholder="Bitte wähle eine Kategorie"
            editable={false}
            defaultValue={categories[1].name}
          />
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
            <Picker
              prompt="Kategorie"
              selectedValue={categories[1].id}
              onValueChange={itemValue => {
                console.warn(`Category ${itemValue} selected`);
                return this.setState({ visible: false });
              }}
            >
              <Picker.Item label="Bitte wähle eine Kategorie" value="0" />
              {categories.map(category => (
                <Picker.Item
                  label={category.name}
                  value={category.id}
                  key={category.id}
                />
              ))}
            </Picker>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

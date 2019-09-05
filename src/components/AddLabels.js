import React from 'react';
import { TouchableOpacity, Text, FlatList } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Textbox, Elementbox } from '../components/styled-components/Boxes';

const labels = [
  { id: '1', color: 'red', chosen: false },
  { id: '2', color: 'hotpink', chosen: true },
  { id: '3', color: 'orange', chosen: false },
  { id: '4', color: 'yellow', chosen: false },
  { id: '5', color: 'green', chosen: false },
  { id: '6', color: 'blue', chosen: false },
];

// Returns a list of colored labels
export default function AddLabels() {
  return (
    <React.Fragment>
      <Textbox>
        <Text>Füge ein Label hinzu</Text>
      </Textbox>
      <Elementbox>
        <FlatList
          horizontal
          data={labels}
          keyExtractor={label => label.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.warn('clicked')}>
              <Ionicons
                name={item.chosen ? 'md-checkbox' : 'md-square'}
                style={{ color: item.color, fontSize: 32, paddingRight: 10 }}
              />
            </TouchableOpacity>
          )}
        />
      </Elementbox>
    </React.Fragment>
  );
}

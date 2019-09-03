import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { name: 'food', id: '1' },
  { name: 'food-apple', id: '2' },
  { name: 'food-croissant', id: '3' },
  { name: 'food-fork-drink', id: '4' },
  { name: 'food-variant', id: '5' },
  { name: 'food', id: '6' },
  { name: 'food-apple', id: '7' },
  { name: 'food-croissant', id: '8' },
  { name: 'food-fork-drink', id: '9' },
  { name: 'food-variant', id: '10' },
];

function CategoryFilter() {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={category => category.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => console.warn('clicked')}>
          <MaterialCommunityIcons
            name={item.name}
            style={{ color: '#1b4e55', fontSize: 28, paddingRight: 25 }}
          />
        </TouchableOpacity>
      )}
    />
  );
}

export default CategoryFilter;

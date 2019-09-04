import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { CategoryIcon } from './styled-components/Icons';
import { StyledIonicon } from '../components/styled-components/Icons';
import { Colors } from '../components/styled-components/Variables';
import { Elementbox } from '../components/styled-components/Boxes';

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
    <Elementbox>
      <StyledIonicon name="ios-arrow-back" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={category => category.id}
        style={{ marginHorizontal: 22 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.warn('clicked')}>
            <CategoryIcon name={item.name} />
          </TouchableOpacity>
        )}
      />
      <StyledIonicon name="ios-arrow-forward" />
    </Elementbox>
  );
}

export default CategoryFilter;

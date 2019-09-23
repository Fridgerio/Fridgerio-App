import React, { useContext } from 'react';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { CategoryIcon } from './styled-components/Icons';
import { StyledIonicon } from '../components/styled-components/Icons';
import { Colors } from '../components/styled-components/Variables';
import { Elementbox } from '../components/styled-components/Boxes';
import { Context } from '../context/Context';

const categories = [
  { name: 'all', path: require('../../assets/img/all.png') },
  { name: 'bread', path: require('../../assets/img/bread-pastry.png') },
  { name: 'canned', path: require('../../assets/img/canned.png') },
  { name: 'dairy', path: require('../../assets/img/dairy.png') },
  { name: 'drinks', path: require('../../assets/img/drinks.png') },
  { name: 'frozen', path: require('../../assets/img/frozen.png') },
  {
    name: 'fruits',
    path: require('../../assets/img/fruits-vegetables.png'),
  },
  { name: 'meat', path: require('../../assets/img/meat.png') },
  { name: 'pasta', path: require('../../assets/img/pasta.png') },
  {
    name: 'sauces',
    path: require('../../assets/img/sauces-oils-spices.png'),
  },
  {
    name: 'snacks',
    path: require('../../assets/img/snacks-sweets.png'),
  },
  {
    name: 'uncategorized',
    path: require('../../assets/img/uncategorized.png'),
  },
];

function CategoryFilter() {
  const { activeCategoryFilter, setActiveCategoryFilter } = useContext(Context);

  return (
    <Elementbox>
      <StyledIonicon name="ios-arrow-back" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={category => category.name}
        style={{ marginHorizontal: 22 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setActiveCategoryFilter(item.name)}>
            <Image
              source={item.path}
              style={{
                height: 30,
                width: 30,
                marginRight: 20,
                opacity: activeCategoryFilter === item.name ? 1 : 0.6,
              }}
            />
          </TouchableOpacity>
        )}
      />
      <StyledIonicon name="ios-arrow-forward" />
    </Elementbox>
  );
}

export default CategoryFilter;

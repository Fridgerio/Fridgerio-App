import React, { useContext } from 'react';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { CategoryIcon } from './styled-components/Icons';
import { StyledIonicon } from '../components/styled-components/Icons';
import { Colors } from '../components/styled-components/Variables';
import { Elementbox } from '../components/styled-components/Boxes';
import { Context } from '../context/Context';

import { All, Bread, Canned, Dairy, Drinks, Frozen, Fruits, Meat, Pasta, Sauces, Snacks, Uncategorized } from '../components/svg/CategoryIcons';

const categories = [
  { name: 'all' },
  { name: 'bread' },
  { name: 'canned' },
  { name: 'dairy' },
  { name: 'drinks' },
  { name: 'frozen' },
  { name: 'fruits' },
  { name: 'meat' },
  { name: 'pasta' },
  { name: 'sauces' },
  { name: 'snacks' },
  { name: 'uncategorized' }
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

            { (item.name == "all") && <All /> }
            { (item.name == "bread") && <Bread /> }
            { (item.name == "canned") && <Canned /> }
            { (item.name == "dairy") && <Dairy /> }
            { (item.name == "drinks") && <Drinks /> }
            { (item.name == "frozen") && <Frozen /> }
            { (item.name == "fruits") && <Fruits /> }
            { (item.name == "meat") && <Meat /> }
            { (item.name == "pasta") && <Pasta /> }
            { (item.name == "sauces") && <Sauces /> }
            { (item.name == "snacks") && <Snacks /> }
            { (item.name == "uncategorized") && <Uncategorized /> }
            
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

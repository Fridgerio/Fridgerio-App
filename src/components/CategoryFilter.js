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

            { (item.name == "all") && <All active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "bread") && <Bread active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "canned") && <Canned active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "dairy") && <Dairy active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "drinks") && <Drinks active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "frozen") && <Frozen active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "fruits") && <Fruits active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "meat") && <Meat active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "pasta") && <Pasta active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "sauces") && <Sauces active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "snacks") && <Snacks active={activeCategoryFilter === item.name} filterIcon /> }
            { (item.name == "uncategorized") && <Uncategorized active={activeCategoryFilter === item.name} filterIcon /> }
            
          </TouchableOpacity>
        )}
      />
      <StyledIonicon name="ios-arrow-forward" />
    </Elementbox>
  );
}

export default CategoryFilter;

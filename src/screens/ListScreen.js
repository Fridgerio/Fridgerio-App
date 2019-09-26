import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortingTabs from '../components/ListSort';
import Product from '../components/ProductListItem';

function ListScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <CategoryFilter />
        <SortingTabs />
        <View>
          <Product navigation={navigation} />
          <Product navigation={navigation} />
          <Product navigation={navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

ListScreen.navigationOptions = {
  headerTitle: <SearchBar />,
};

export default ListScreen;

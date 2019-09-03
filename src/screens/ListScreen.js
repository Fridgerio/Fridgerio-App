import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortingTabs from '../components/ListSort';
import Product from '../components/ProductListItem';
import { ProductEdit, ProductDelete } from '../components/ProductListActions';

function ListScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View>
          <Ionicons name="ios-arrow-back" size={28} color="lightgray" />
          <CategoryFilter />
          <Ionicons name="ios-arrow-forward" size={28} color="lightgray" />
        </View>
        <SortingTabs />
        <View style={{ marginTop: 10 }}>
          <Product navigation={navigation} />
          <ProductEdit navigation={navigation} />
          <Product navigation={navigation} />
          <ProductDelete navigation={navigation} />
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

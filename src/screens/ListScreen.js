import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={'Suche nach Produkt...'}
        /* callback fn is executed both when user hits return on device keyboard and when keyboard is dismissed - triggered by the TouchableWithoutFeedback wrapper - by clicking anywhere else on the screen */
        onEndEditing={() => console.warn('submitted/dismissed')}
      />
      <Ionicons name="ios-search" style={styles.searchIcon} />
    </View>
  );
}

function CategoryFilter() {
  return (
    <FlatList
      style={styles.categoryList}
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

function Product() {
  return (
    <View style={styles.product}>
      <MaterialCommunityIcons
        name="food-apple"
        style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
      />
      <Text>Random Food</Text>
    </View>
  );
}

function ProductEdit() {
  return (
    <View style={styles.productEdit}>
      <View style={styles.edit}>
        <Text style={{ color: 'white' }}>Edit</Text>
      </View>
      <MaterialCommunityIcons
        name="food-fork-drink"
        style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
      />
      <Text>Random Food</Text>
    </View>
  );
}

function ProductDelete() {
  return (
    <View style={styles.product}>
      <MaterialCommunityIcons
        name="food-croissant"
        style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
      />
      <Text>Random Food</Text>
      <View style={styles.delete}>
        <Text style={{ color: 'white' }}>Delete</Text>
      </View>
    </View>
  );
}

function ListScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.categoryListContainer}>
          <Ionicons name="ios-arrow-back" size={28} color="lightgray" />
          <CategoryFilter />
          <Ionicons name="ios-arrow-forward" size={28} color="lightgray" />
        </View>
        <Product />
        <ProductEdit />
        <Product />
        <ProductDelete />
        <Product />
      </View>
    </TouchableWithoutFeedback>
  );
}

// const width = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 35,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 28,
    color: '#1b4e55',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginTop: 3,
  },
  categoryListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },
  categoryList: {
    marginHorizontal: 22,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 15,
  },
  productEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  edit: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginRight: 15,
  },
  delete: {
    position: 'absolute',
    right: 0,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

ListScreen.navigationOptions = {
  headerTitle: <SearchBar />,
  headerStyle: {
    backgroundColor: '#51c1c9',
    height: 50,
    marginHorizontal: 30,
  },
};

export default ListScreen;

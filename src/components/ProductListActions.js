import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export function ProductEdit({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen')}
    >
      <View style={styles.productEdit}>
        <View style={styles.edit}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </View>
        <MaterialCommunityIcons
          name="food-fork-drink"
          style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
        />
        <Text>Random Food</Text>
        <Text style={{ position: 'absolute', right: 15 }}>02. Oktober</Text>
      </View>
    </TouchableOpacity>
  );
}

export function ProductDelete({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen')}
    >
      <View style={styles.product}>
        <MaterialCommunityIcons
          name="food-croissant"
          style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
        />
        <Text>Random Food</Text>
        <Text style={{ color: 'gray', paddingLeft: 20 }}>+2</Text>
        <View style={styles.delete}>
          <Text style={{ color: 'white' }}>Delete</Text>
          <Text style={{ position: 'absolute', right: 95 }}>11. Juli</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  sortingTabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
});

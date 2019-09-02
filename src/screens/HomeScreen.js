import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Product() {
  return (
    <View style={styles.product}>
      <MaterialCommunityIcons
        name="food-apple"
        style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
      />
      <Text>Random Food</Text>
      <Text style={{ color: 'gray', paddingLeft: 20 }}>+4</Text>
      <Text style={{ position: 'absolute', right: 15 }}>20. September</Text>
    </View>
  );
}

function Expire() {
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Text style={{ fontWeight: 'bold' }}>
        Deine Produkte, die in der nächsten Zeit ablaufen:
      </Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <Expire />
        <Product />
        <Product />
        <Product />
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// });

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
  sortingTabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
});

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;

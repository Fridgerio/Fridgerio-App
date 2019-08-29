import React from 'react';
import { Dimensions, View, StyleSheet, Text, TextInput } from 'react-native';

function Header() {
  return (
    <View>
      <TextInput style={styles.searchBar} value={'Suche nach Produkt...'} />
    </View>
  );
}

function ListScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from List</Text>
    </View>
  );
}

const width = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchBar: {
    height: 35,
    width: width,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 20,
    color: 'darkgray',
  },
});

ListScreen.navigationOptions = {
  headerTitle: <Header />,
  headerStyle: {
    height: 60,
    backgroundColor: 'hotpink',
  },
};

export default ListScreen;

import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context } from '../context/Context';

/* Product entries in the list */
function Product() {
  // just for testing purposes atm
  const { products } = useContext(Context);

  return (
    <View style={styles.product}>
      <MaterialCommunityIcons
        name="food-apple"
        style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
      />
      <Text>{products[0].name}</Text>
      <Text style={{ color: 'gray', paddingLeft: 20 }}>+4</Text>
      <Text style={{ position: 'absolute', right: 15 }}>20. September</Text>
    </View>
  );
}

/* Title for the three product entries (Your products that will expire next) */
function Expire() {
  return (
    <View style={styles.expireView}>
      <Text style={styles.expireText}>
        Deine Produkte, die in der nächsten Zeit ablaufen:
      </Text>
    </View>
  );
}

/* Statistics */
function Statistics() {
  const numbers = [4, 14, 26];
  const labels = ['abgelaufen', 'in 7 Tagen', 'insgesamt'];
  return (
    <React.Fragment>
      <View style={styles.numbersContainer}>
        {numbers.map((number, index) => (
          <Text key={index} style={styles.statNumbers}>
            {number}
          </Text>
        ))}
      </View>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text key={index} style={styles.statLabels}>
            {label}
          </Text>
        ))}
      </View>
    </React.Fragment>
  );
}

/* Total Home Screen */
function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <Expire />
        <Product />
        <Product />
        <Product />
        <Statistics style={styles.statistics} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 15,
  },
  expireView: {
    paddingHorizontal: 15,
  },
  expireText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  statistics: {
    marginTop: 120,
  },
  numbersContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  statNumbers: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  labelsContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  statLabels: {
    fontSize: 14,
  },
});

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;

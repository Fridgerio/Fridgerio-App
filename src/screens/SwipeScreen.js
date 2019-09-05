import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import Swipeable from 'react-native-swipeable';

function SwipeableItem({ navigation, product, onDelete }) {
  return (
    <Swipeable
      leftActionActivationDistance={170}
      leftContent={
        <View style={styles.leftSwipeItem}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </View>
      }
      // write comment about difference between onLeftActionActivate and onLeftActionRelease
      onLeftActionRelease={() => navigation.navigate('DummyScreen')}
      rightActionActivationDistance={170}
      rightContent={
        <View style={styles.rightSwipeItem}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </View>
      }
      onRightActionRelease={() => onDelete(product)}
    >
      <View style={styles.listItem}>
        <Text>{product}</Text>
      </View>
    </Swipeable>
  );
}

export default function SwipeScreen({ navigation }) {
  const [products, setProducts] = useState([
    'banana',
    'eggs',
    'chocolate',
    'green tea',
    'frozen pizza',
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDelete = productName => {
    const updatedProducts = products.filter(product => product !== productName);
    setProducts(updatedProducts);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setProducts(['banana', 'eggs', 'chocolate', 'green tea', 'frozen pizza']);
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pull to reset</Text>
      <FlatList
        data={products}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <SwipeableItem
            product={item}
            navigation={navigation}
            onDelete={handleDelete}
          />
        )}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>No products in your list</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkseagreen',
    marginVertical: 2,
  },
  heading: {
    textAlign: 'center',
    fontWeight: '700',
    marginVertical: 40,
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: 'green',
    marginVertical: 2,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'red',
    marginVertical: 2,
  },
  listEmpty: {
    textAlign: 'center',
  },
});

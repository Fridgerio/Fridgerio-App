import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, FlatList } from 'react-native';
import Swipeable from 'react-native-swipeable';

function SwipeableItem({ navigation, product, onDelete }) {
  /* dynamically calculate width for different mobile screen sizes; variable is used to set the ActionActivationDistance prop; current value will trigger action when swiping horizontally 45% of the screen width */
  const width = Dimensions.get('window').width * 0.45;

  return (
    <Swipeable
      leftActionActivationDistance={width}
      // element revealed by swipe gesture
      leftContent={
        <View style={styles.leftSwipeItem}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </View>
      }
      /* use onLeftActionActivate if the action should not be triggered automatically by lifting the thumb */
      onLeftActionRelease={() => navigation.navigate('DummyScreen')}
      rightActionActivationDistance={width}
      // element revealed by swipe gesture
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
  // dummy data
  const [products, setProducts] = useState([
    'banana',
    'eggs',
    'chocolate',
    'green tea',
    'frozen pizza',
  ]);
  // toggle value for refreshing prop to enable pull-to-refresh feature
  const [isRefreshing, setIsRefreshing] = useState(false);

  // delete product from list
  const handleDelete = productName => {
    const updatedProducts = products.filter(product => product !== productName);
    setProducts(updatedProducts);
  };

  /* reset screen with initial, complete item list; this is just for testing purposes */
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
        // pull-to-refresh
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        // element to be rendered when list is empty
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
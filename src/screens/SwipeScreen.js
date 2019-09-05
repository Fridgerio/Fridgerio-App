import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-swipeable';

function SwipeableItem({ navigation }) {
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
      onRightActionRelease={() => navigation.navigate('DummyScreen')}
    >
      <View style={styles.listItem}>
        <Text>Swipe me!</Text>
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
  return (
    <View>
      <Text style={styles.heading}>Pull to reset</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

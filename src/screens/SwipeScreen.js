import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-swipeable';

function SwipeableItem({ navigation }) {
  return (
    <Swipeable
      leftActionActivationDistance={200}
      leftContent={
        <View style={styles.leftSwipeItem}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </View>
      }
      // write comment about difference between onLeftActionActivate and onLeftActionRelease
      onLeftActionRelease={() => navigation.navigate('DummyScreen')}
    >
      <View style={styles.listItem}>
        <Text>Example 3</Text>
      </View>
    </Swipeable>
  );
}

export default function SwipeScreen() {
  return (
    <ScrollView>
      <SwipeableItem />
      <SwipeableItem />
      <SwipeableItem />
      <SwipeableItem />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkseagreen',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: 'green',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});

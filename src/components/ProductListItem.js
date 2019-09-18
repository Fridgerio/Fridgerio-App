import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcon } from './styled-components/Icons';
import { Elementbox } from './styled-components/Boxes';
import { StyledText } from './styled-components/Text';
import Swipeable from 'react-native-swipeable';

function Product({ navigation, product, onDelete }) {
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
      onLeftActionRelease={() => navigation.navigate('ProductFormScreen')}
      rightActionActivationDistance={width}
      // element revealed by swipe gesture
      rightContent={
        <View style={styles.rightSwipeItem}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </View>
      }
      onRightActionRelease={() => onDelete(product.id)}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductFormScreen')}
        // prop to control opacity value
        activeOpacity={0.7}
      >
        <Elementbox withBottomLine>
          <MaterialCommunityIcon
            name="food-apple"
            padding="0 15px 0 0"
            flex="1"
          />
          <StyledText flex="4">{product.productName}</StyledText>
          <StyledText flex="2">{product.bestBeforeDate}</StyledText>
        </Elementbox>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default Product;

const styles = StyleSheet.create({
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

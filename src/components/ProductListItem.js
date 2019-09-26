import React, { useContext, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Elementbox } from './styled-components/Boxes';
import { StyledText } from './styled-components/Text';
import Swipeable from 'react-native-swipeable';
import { Context } from '../context/Context';
import { dateFormat } from '../helper/helper';
import {
  All,
  Bread,
  Canned,
  Dairy,
  Drinks,
  Frozen,
  Fruits,
  Meat,
  Pasta,
  Sauces,
  Snacks,
  Uncategorized,
} from '../components/svg/CategoryIcons';
import { Colors } from '../components/styled-components/Variables';

/* function accepts product and checks if it is already expired*/
const getExpired = product => {
  /* timestamp of now */
  const todayDateObject = new Date(Date.now());
  let day = todayDateObject.getDate();
  let month = todayDateObject.getMonth() + 1;
  const year = todayDateObject.getFullYear();
  month = month < 10 ? `0${month}` : `${month}`;
  day = day < 10 ? `0${day}` : `${day}`;

  /* set reference time always to midnight */
  const todayObject = new Date(`${year}-${month}-${day}T00:00:00`);

  /* today and expiry date as timestamp */
  const today = Number((todayObject.getTime() / 1000).toFixed(0));
  const expDate = Number((new Date(`${product.bestBeforeDate}T00:00:00`).getTime() / 1000).toFixed(0));

  if (expDate < today) {
    /* return true if the expiry date is before today */
    return true;
  }
};

function Product({ navigation, product }) {
  const { deleteProduct } = useContext(Context);
  const [dateColor, setDateColor] = useState(Colors.QuaternaryColor);

  useEffect(() => {
    const isItemExpired = getExpired(product);
    if (isItemExpired) {
      setDateColor(Colors.WarningColor);
    }
  }, []);

  /* dynamically calculate width for different mobile screen sizes; variable is used to set the ActionActivationDistance prop; current value will trigger action when swiping horizontally 45% of the screen width */
  const width = Dimensions.get('window').width * 0.45;
  return (
    <Swipeable
      leftActionActivationDistance={width}
      // element revealed by swipe gesture
      leftContent={
        <View style={styles.leftSwipeItem}>
          <Text style={{ color: 'white' }}>Bearbeiten</Text>
        </View>
      }
      /* use onLeftActionActivate if the action should not be triggered automatically by lifting the thumb */
      onLeftActionRelease={() => navigation.navigate('ProductFormScreen')}
      rightActionActivationDistance={width}
      // element revealed by swipe gesture
      rightContent={
        <View style={styles.rightSwipeItem}>
          <Text style={{ color: 'white' }}>Löschen</Text>
        </View>
      }
      onRightActionRelease={() => deleteProduct(product.id)}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductFormScreen')}
        // prop to control opacity value
        activeOpacity={0.7}
      >
        <Elementbox withBottomLine>
          {product.productCategory === 'all' && <All />}
          {product.productCategory === 'bread' && <Bread />}
          {product.productCategory === 'canned' && <Canned />}
          {product.productCategory === 'dairy' && <Dairy />}
          {product.productCategory === 'drinks' && <Drinks />}
          {product.productCategory === 'frozen' && <Frozen />}
          {product.productCategory === 'fruits' && <Fruits />}
          {product.productCategory === 'meat' && <Meat />}
          {product.productCategory === 'pasta' && <Pasta />}
          {product.productCategory === 'sauces' && <Sauces />}
          {product.productCategory === 'snacks' && <Snacks />}
          {product.productCategory === 'uncategorized' && <Uncategorized />}
          <StyledText flex="4">{product.productName}</StyledText>
          <StyledText flex="2" color={dateColor}>
            {dateFormat(product.bestBeforeDate)}
          </StyledText>
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

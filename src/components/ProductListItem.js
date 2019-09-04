import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcon } from './styled-components/Icons';
import { Elementbox } from './styled-components/Boxes';
import { StyledText } from './styled-components/Text';

function Product({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen')}
    >
      <Elementbox withBottomLine>
        <MaterialCommunityIcon
          name="food-apple"
          padding="0 15px 0 0"
          flex="1"
        />
        <StyledText flex="4">RandomFood</StyledText>
        <StyledText flex="2">20.09.2019</StyledText>
      </Elementbox>
    </TouchableOpacity>
  );
}

export default Product;

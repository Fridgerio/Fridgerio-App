import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Product({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen')}
    >
      <View>
        <MaterialCommunityIcons
          name="food-apple"
          style={{ color: '#1b4e55', fontSize: 28, paddingRight: 15 }}
        />
        <Text>Random Food</Text>
        <Text style={{ color: 'gray', paddingLeft: 20 }}>+4</Text>
        <Text style={{ position: 'absolute', right: 15 }}>20. September</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Product;

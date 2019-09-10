import React, { useContext } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortingTabs from '../components/ListSort';
import Product from '../components/ProductListItem';
import { Context } from '../context/Context';

function ListScreen({ navigation }) {
  const { products, setProducts } = useContext(Context);

  // delete product from list
  const handleDelete = productId => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    // handleSnackBar();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <CategoryFilter />
        <SortingTabs />
        <View>
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Product
                product={item}
                navigation={navigation}
                onDelete={handleDelete}
              />
            )}
            // element to be rendered when list is empty
            ListEmptyComponent={() => (
              <Text style={styles.listEmpty}>No products in your list</Text>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

ListScreen.navigationOptions = {
  headerTitle: <SearchBar />,
};

export default ListScreen;

const styles = StyleSheet.create({
  listEmpty: {
    textAlign: 'center',
  },
});

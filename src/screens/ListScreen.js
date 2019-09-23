import React, { useState, useContext, useEffect } from 'react';
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
import SnackBar from 'react-native-snackbar-component';

function ListScreen({ navigation }) {
  const {
    productsSortedByDate,
    productsSortedByName,
    deleteProduct,
    isSnackBarVisible,
    addLastDeletedProduct,
    sortMethod,
    activeCategoryFilter,
  } = useContext(Context);

  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const products =
      sortMethod === 'productName'
        ? productsSortedByName
        : productsSortedByDate;

    setSortedProducts(products);
  }, [sortMethod, productsSortedByDate, productsSortedByName]);

  const filterProducts = () => {
    if (activeCategoryFilter !== 'all') {
      const filtered = sortedProducts.filter(ele => ele.productCategory === activeCategoryFilter);
      return filtered;
    }
    return sortedProducts;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* View needs to stretch over entire screen for the snackbar to pop up at the very bottom */}
      <View style={styles.container}>
        <CategoryFilter />
        <SortingTabs />
        <FlatList
          data={filterProducts()}
          extraData={sortMethod}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Product product={item} navigation={navigation} />
          )}
          // element to be rendered when list is empty
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>
              {activeCategoryFilter === 'all'
                ? 'Keine Produkte in deiner Liste.'
                : 'Keine Produkte in dieser Kategorie.'}
            </Text>
          )}
        />
        <SnackBar
          visible={isSnackBarVisible}
          textMessage="Produkt gelöscht!"
          // Function to be called when the right button (Rückgängig) is pressed
          actionHandler={() => addLastDeletedProduct()}
          actionText="Rückgängig"
          backgroundColor={'#50C1C9'}
          accentColor={'#1C4E55'}
          // The color of main message text, default is	#FFFFFF
          messageColor={'#fff'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

ListScreen.navigationOptions = {
  headerTitle: <SearchBar />,
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  listEmpty: {
    textAlign: 'center',
  },
});

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
import SnackBar from 'react-native-snackbar-component';

function ListScreen({ navigation }) {
  const {
    productsSortedByDate,
    deleteProduct,
    isSnackBarVisible,
    addLastDeletedProduct,
  } = useContext(Context);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* View needs to stretch over entire screen for the snackbar to pop up at the very bottom */}
      <View style={styles.container}>
        <CategoryFilter />
        <SortingTabs />
        <FlatList
          data={productsSortedByDate}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Product
              product={item}
              navigation={navigation}
              onDelete={deleteProduct}
            />
          )}
          // element to be rendered when list is empty
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>No products in your list</Text>
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
  listEmpty: {
    textAlign: 'center',
  },
});

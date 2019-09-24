import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import Product from '../components/ProductListItem';
import { Context } from '../context/Context';
import SnackBar from 'react-native-snackbar-component';
import { PrimaryButton } from '../components/styled-components/Buttons';
import { StyledText } from '../components/styled-components/Text';
import { FontSize } from '../components/styled-components/Variables';

/* Title for the three product entries (Your products that will expire next) */
function Expire() {
  return (
    <View style={styles.expireView}>
      <StyledText size={FontSize.large} fontWeight="bold">Demnächst laufen ab:</StyledText>
    </View>
  );
}

/* Statistics */
function Statistics({ products }) {
  const getExpired = id => {
    const normDate = new Date(Date.now() + id * 24 * 60 * 60 * 1000);
    const today = new Date(Date.now());
    let number;
    if (products && products.length > 0) {
      number = products.reduce((num, current) => {
        const expDate = Number((new Date(current.date).getTime() / 1000).toFixed(0));
        if (id === 0) {
          return expDate < normDate ? num + 1 : num;
        }
        return expDate < normDate && expDate > today ? num + 1 : num;
      }, 0);
    } else {
      number = 0;
    }
    return number;
  };
  const expiredItems = getExpired(0);
  const nextWeekItems = getExpired(7);
  const numbers = [expiredItems, nextWeekItems, products.length];
  const labels = ['abgelaufen', 'in 7 Tagen', 'insgesamt'];
  return (
    <React.Fragment>
      <View style={styles.numbersContainer}>
        {numbers.map((number, index) => (
          <Text key={index} style={styles.statNumbers}>
            {number}
          </Text>
        ))}
      </View>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text key={index} style={styles.statLabels}>
            {label}
          </Text>
        ))}
      </View>
    </React.Fragment>
  );
}

/* Total Home Screen */
function HomeScreen({ navigation }) {
  const {
    products,
    productsSortedByDate,
    isSnackBarVisible,
    addLastDeletedProduct,
    deleteAll,
    sendNotification,
  } = useContext(Context);

  return (
    <View style={styles.container}>
      <Statistics style={styles.statistics} products={products} />
      <Expire />
      {/* wait for productsSortedByDate to receive data via the useEffect hook in Context */}
      {productsSortedByDate && (
        <React.Fragment>
          <View>
            <FlatList
              data={productsSortedByDate.slice(0, 3)}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Product product={item} navigation={navigation} />
              )}
              // element to be rendered when list is empty
              ListEmptyComponent={() => (
                <Text style={styles.listEmpty}>
                  Deine Liste enthält keine Produkte.
                </Text>
              )}
            />
          </View>
        </React.Fragment>
      )}
      {products.length > 0 && (
        <Button
          title={'Alle Produkte'}
          onPress={() => navigation.navigate('ListScreen')}
        />
      )}
      <PrimaryButton
        title={'Mitteilung'}
        color={'orange'}
        onPress={() => sendNotification()}
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
        // to figure out
        distanceCallback={distance => 60}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  expireView: {
    paddingHorizontal: 15,
    marginTop: 60,
    marginBottom: 15,
  },
  statistics: {
    marginTop: 120,
  },
  numbersContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  statNumbers: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  labelsContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  statLabels: {
    fontSize: 14,
  },
  listEmpty: {
    textAlign: 'center',
  },
});

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;

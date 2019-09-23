import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import Product from '../components/ProductListItem';
import { Context } from '../context/Context';
import SnackBar from 'react-native-snackbar-component';
import { PrimaryButton } from '../components/styled-components/Buttons';

/* Title for the three product entries (Your products that will expire next) */
function Expire() {
  return (
    <View style={styles.expireView}>
      <Text style={styles.expireText}>Demnächst laufen ab:</Text>
    </View>
  );
}

/* Statistics */
function Statistics({ products }) {
  /* get the number of expired products (by now or after a week) */
  const getExpired = id => {
    /* timestamp of now */
    const todayDateObject = new Date(Date.now());
    let day = todayDateObject.getDate();
    let month = todayDateObject.getMonth() + 1;
    const year = todayDateObject.getFullYear();
    month = month < 10 ? `0${month}` : `${month}`;
    day = day < 10 ? `0${day}` : `${day}`;
    const todayObject = new Date(`${year}-${month}-${day}T00:00:00`);
    const today = Number((todayObject.getTime() / 1000).toFixed(0));
    /* reference date (now or in 7 days etc.) as a timestamp */
    const normDate = today + id * 24 * 60 * 60;
    let number;
    if (products && products.length > 0) {
      number = products.reduce((num, current) => {
        /* expiry date as a timestamp */
        const expDate = Number((
            new Date(`${current.bestBeforeDate}T00:00:00`).getTime() / 1000
          ).toFixed(0));
        if (id === 0) {
          /* add 1 if the expiry date is before today */
          return expDate < today ? num + 1 : num;
        }
        /* add 1 if the expiry date is between today and next week */
        return expDate < normDate && expDate >= today ? num + 1 : num;
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
          )}
          // element to be rendered when list is empty
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>
              Deine Liste enthält keine Produkte
            </Text>
          )}
        />
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
      </View>
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
  expireText: {
    fontWeight: 'bold',
    fontSize: 18,
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

import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Alle', icon: 'food' },
  { id: '2', name: 'Obst&Gemüse', icon: 'food-apple' },
  { id: '3', name: 'Milchprodukte', icon: 'food-croissant' },
  { id: '4', name: 'Nudeln, Reis usw.', icon: 'food-fork-drink' },
  { id: '5', name: 'Getränke', icon: 'food-variant' },
];

const labels = [
  { id: '1', color: 'red', chosen: false },
  { id: '2', color: 'hotpink', chosen: true },
  { id: '3', color: 'orange', chosen: false },
  { id: '4', color: 'yellow', chosen: false },
  { id: '5', color: 'green', chosen: false },
  { id: '6', color: 'blue', chosen: false },
];

const products = [
  {
    id: '1',
    amount: 2,
    date: '08/09/2019',
    notificationTime: '3',
    activeLabels: [3, 4],
    note: '',
  },
  {
    id: '2',
    amount: 6,
    date: '10/09/2019',
    notificationTime: '3',
    activeLabels: [1],
    note: 'Granny Smith Äpfel aus Florida',
  },
];

function ShowActionButtons(color = 'white') {
  return (
    <FlatList
      horizontal
      data={['create', 'add', 'trash']}
      style={{ alignSelf: 'flex-end' }}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Ionicons
            name={`md-${item}`}
            style={{ color: color, fontSize: 22, paddingLeft: 10 }}
          />
        </TouchableOpacity>
      )}
    />
  );
}

function ShowProducts() {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        const { amount, date, notificationTime, activeLabels, note } = item;
        return (
          <View
            style={{
              backgroundColor: 'whitesmoke',
              padding: 10,
              margin: 10,
              borderRadius: 5,
            }}
          >
            <FlatList
              style={{ alignSelf: 'flex-end' }}
              data={activeLabels}
              keyExtractor={label => label}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <Ionicons
                    name="md-square"
                    style={{
                      color: labels[item].color,
                      fontSize: 32,
                      paddingRight: 10,
                    }}
                  />
                </TouchableOpacity>
              )}
            />

            <Text>Menge</Text>
            <Text>{amount}</Text>

            <Text>Mindesthaltbarkeitsdatum</Text>
            <Text>{date}</Text>

            <Text>Benachrichtigung</Text>
            <Text>{notificationTime} Tage vor Ablauf</Text>

            <Text>Note</Text>
            <Text>{note}</Text>

            {ShowActionButtons('black')}
          </View>
        );
      }}
    />
  );
}

function ProductDetailScreen() {
  return (
    <ScrollView>
      <Text>Name</Text>
      <Text>Apfel</Text>

      <MaterialCommunityIcons
        name={categories[1].icon}
        style={{
          color: '#7da10d',
          fontSize: 150,
          width: 150,
          height: 150,
          paddingRight: 15,
          backgroundColor: '#1b4e55',
          alignSelf: 'flex-end',
        }}
      />

      <Text>Kategorie</Text>
      <Text>{categories[1].name}</Text>

      {ShowProducts()}
    </ScrollView>
  );
}

ProductDetailScreen.navigationOptions = {
  title: 'Apfel',
  headerRight: ShowActionButtons(),
};

export default ProductDetailScreen;

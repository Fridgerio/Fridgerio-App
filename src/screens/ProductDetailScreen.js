import React from 'react';
import { ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';

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

      <Text>Menge</Text>
      <Text>6</Text>

      <Text>Mindesthaltbarkeitsdatum</Text>
      <Text>10/09/2019</Text>

      <Text>Benachrichtigung</Text>
      <Text>3 Tage vor Ablauf</Text>

      <Text>Labels</Text>
      <FlatList
        horizontal
        data={labels}
        keyExtractor={label => label.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            {item.chosen && (
              <Ionicons
                name="md-square"
                style={{ color: item.color, fontSize: 32, paddingRight: 10 }}
              />
            )}
          </TouchableOpacity>
        )}
      />

      <Text>Note</Text>
      <Text>Granny Smith Äpfel aus Florida</Text>
    </ScrollView>
  );
}

ProductDetailScreen.navigationOptions = {
  title: 'ProductDetailScreen',
};

export default ProductDetailScreen;

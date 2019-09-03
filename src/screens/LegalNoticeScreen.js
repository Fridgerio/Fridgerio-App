import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';

function LegalNoticeScreen() {
  /* a few states */
  const [legal, setLegal] = useState(null); // fetched data
  const [error, setError] = useState(null); // error
  /* lifecycle method, such as componentDidMount */
  useEffect(() => {
    fetchLegal();
  }, []);
  /* method to fetch the legal notice information */
  const fetchLegal = async () => {
    try {
      const url = `https://impressum-api.sklinkusch.now.sh/impressum`;
      const response = await fetch(url);
      const data = await response.json();
      setLegal(data);
    } catch (err) {
      setError(err);
    }
  };
  /* render the component */
  return (
    <ScrollView>
      <Textbox>
        {/* render the error message if an error occurs*/}
        {error && <Text>{error.message}</Text>}
        {/* map over the titles */}
        {legal &&
          legal.title.map((subtitle, index) => (
            <View key={`title-${index}`}>
              {/* overall wrapper with a key */}
              <View style={styles.titleWrapper}>
                {/* only to make the text a block element  */}
                <Text style={styles.title}>{subtitle}</Text>
              </View>
              {typeof legal.content[index] === 'string' ? (
                <View>
                  {/* only to make the text a block element */}
                  <Text>{legal.content[index]}</Text>
                </View>
              ) : (
                legal.content[index].map((paragraph, subindex) => (
                  <View
                    style={styles.paraWrapper}
                    key={`para-${index}-${subindex}`}
                  >
                    <Text>{paragraph}</Text>
                  </View>
                ))
              )}
            </View>
          ))}
      </Textbox>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleWrapper: {
    marginTop: 15,
  },
  paraWrapper: {
    marginVertical: 5,
  },
});

LegalNoticeScreen.navigationOptions = {
  title: 'Impressum',
};

export default LegalNoticeScreen;

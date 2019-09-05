import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { H2, BlockText } from '../components/styled-components/Text';

function PrivacyPolicyScreen() {
  /* a few states */
  const [privacy, setPrivacy] = useState(null); // fetched data
  const [error, setError] = useState(null); // error
  const [loading, setLoading] = useState(false); // loading status
  /* lifecycle method, such as componentDidMount */
  useEffect(() => {
    fetchPrivacy();
  }, []);
  /* method to fetch the privacy policy information */
  const fetchPrivacy = async () => {
    setLoading(true);
    try {
      const url = `https://impressum-api.sklinkusch.now.sh/datenschutz`;
      const response = await fetch(url);
      const data = await response.json();
      setPrivacy(data);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  const loadMessage = 'Lade Daten...';
  return (
    <ScrollView>
      <Textbox>
        {/* render the loading message if the data is loading */}
        {loading && <Text>{loadMessage}</Text>}
        {/* render the error message if an error occurs*/}
        {error && <Text>{error.message}</Text>}
        {/* map over the titles */}
        {privacy &&
          privacy.title.map((subtitle, index) => (
            <View key={`title-${index}`}>
              {/* overall wrapper with a key */}
              {/* only to make the text a block element  */}
              <H2>{subtitle}</H2>
              {typeof privacy.content[index] === 'string' ? (
                <View>
                  {/* only to make the text a block element */}
                  <BlockText>{privacy.content[index]}</BlockText>
                </View>
              ) : (
                privacy.content[index].map((paragraph, subindex) => (
                  <View key={`para-${index}-${subindex}`}>
                    <BlockText>{paragraph}</BlockText>
                  </View>
                ))
              )}
            </View>
          ))}
      </Textbox>
    </ScrollView>
  );
}

PrivacyPolicyScreen.navigationOptions = {
  title: 'Datenschutzerklärung',
};

export default PrivacyPolicyScreen;

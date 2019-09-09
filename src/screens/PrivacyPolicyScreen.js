import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, AsyncStorage } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { Heading, BlockText } from '../components/styled-components/Text';

function PrivacyPolicyScreen() {
  /* a few states */
  const [privacy, setPrivacy] = useState(null); // fetched data
  const [error, setError] = useState(null); // error
  const [loading, setLoading] = useState(false); // loading status
  /* lifecycle method, such as componentDidMount */
  useEffect(() => {
    const timestamp = fetchTime();
    fetchPrivacy(timestamp);
  }, []);
  /* method to evaluate timestamp information */
  const fetchTime = async () => {
    /* get old timestamp from AsyncStorage */
    const oldTimestampRaw = AsyncStorage.getItem('timestamp') || '0';
    const oldTimestamp = JSON.parse(oldTimestampRaw);
    /* fetch new timestamp from the web */
    const timeUrl = 'https://impressum-api.sklinkusch.now.sh/timestamp';
    const timeResponse = await fetch(timeUrl);
    const timeData = await timeResponse.json();
    const { timestamp: newTimestamp } = await timeData;
    /* return the new timestamp if newer, otherwise 0 */
    if (newTimestamp > oldTimestamp) {
      return newTimestamp;
    }
    return 0;
  };
  /* method to fetch the privacy policy information */
  const fetchPrivacy = async timestamp => {
    setLoading(true);
    if (timestamp === 0) {
      /* load privacy data from AsyncStorage if no newer available */
      const oldPrivacyRaw = await AsyncStorage.getItem('privacy');
      const oldPrivacy = await JSON.parse(oldPrivacyRaw);
      setPrivacy(oldPrivacy);
    } else {
      /* fetch privacy data from the web */
      try {
        const url = `https://impressum-api.sklinkusch.now.sh/datenschutz`;
        const response = await fetch(url);
        const data = await response.json();
        setPrivacy(data);
        /* store it in AsyncStorage */
        const dataRaw = JSON.stringify(data);
        AsyncStorage.setItem('privacy', dataRaw);
        setError(null);
        /* store the new timestamp */
        AsyncStorage.setItem('timestamp', JSON.stringify(timestamp));
      } catch (err) {
        setError(err);
      }
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
              <Heading title={subtitle} />
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

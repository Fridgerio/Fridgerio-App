import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, AsyncStorage } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { Heading, BlockText } from '../components/styled-components/Text';

function LegalNoticeScreen() {
  /* a few states */
  const [legal, setLegal] = useState(null); // fetched data
  const [error, setError] = useState(null); // error
  const [loading, setLoading] = useState(false); // loading status;
  /* lifecycle method, such as componentDidMount */
  useEffect(() => {
    const timestamp = fetchTime();
    fetchLegal(timestamp);
  }, []);
  /* method to fetch the timestamp */
  const fetchTime = async () => {
    /* get old timestamp from AsyncStorage */
    const oldTimestamp = AsyncStorage.getItem('ltimestamp') || '0';
    // const oldTimestamp = JSON.parse(oldTimestampRaw);
    /* get new timestamp from the web */
    const timeUrl = 'https://impressum-api.sklinkusch.now.sh/timestamp';
    const timeResponse = await fetch(timeUrl);
    const timeData = await timeResponse.json();
    const { timestamp: newTimestamp } = await timeData;
    /* compare timestamps */
    if (newTimestamp >= oldTimestamp) {
      return newTimestamp;
    }
    return 0;
  };
  /* method to fetch the legal notice information */
  const fetchLegal = async timestamp => {
    setLoading(true);
    if (timestamp === 0) {
      const oldLegalRaw = await AsyncStorage.getItem('legal');
      const oldLegal = await JSON.parse(oldLegalRaw);
      console.warn(timestamp);
      setLegal(oldLegal);
    } else {
      try {
        const url = `https://impressum-api.sklinkusch.now.sh/impressum`;
        const response = await fetch(url);
        const data = await response.json();
        setLegal(data);
        const dataRaw = JSON.stringify(data);
        AsyncStorage.setItem('legal', dataRaw);
        AsyncStorage.setItem('ltimestamp', JSON.stringify(timestamp));
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
  };
  const loadMessage = 'Lade Daten...';
  /* render the component */
  return (
    <ScrollView>
      <Textbox>
        {/* render the loadMessage if the data is loading */}
        {loading && <Text>{loadMessage}</Text>}
        {/* render the error message if an error occurs*/}
        {error && <Text>{error.message}</Text>}
        {/* map over the titles */}
        {legal &&
          legal.title.map((subtitle, index) => (
            <View key={`title-${index}`}>
              {/* overall wrapper with a key */}
              {/* only to make the text a block element  */}
              <Heading title={subtitle} />
              {typeof legal.content[index] === 'string' ? (
                <View>
                  {/* only to make the text a block element */}
                  <BlockText>{legal.content[index]}</BlockText>
                </View>
              ) : (
                legal.content[index].map((paragraph, subindex) => (
                  <View key={`para-${index}-${subindex}`}>
                    <BlockText>{paragraph}</BlockText>
                  </View>
                ))
              )}
            </View>
          ))}
        {legal && <BlockText margin="25px 0 0 0">{legal.source}</BlockText>}
      </Textbox>
    </ScrollView>
  );
}

LegalNoticeScreen.navigationOptions = {
  title: 'Impressum',
};

export default LegalNoticeScreen;

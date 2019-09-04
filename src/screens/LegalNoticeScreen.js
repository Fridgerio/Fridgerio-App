import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import { H2, BlockText } from '../components/styled-components/Text';

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
              {/* only to make the text a block element  */}
              <H2>{subtitle}</H2>
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

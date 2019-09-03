import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';

function LegalNoticeScreen() {
  const [legal, setLegal] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchLegal();
  }, []);
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
  return (
    <ScrollView>
      <Textbox>
        {error && <Text>{error.message}</Text>}
        {legal &&
          legal.title.map((subtitle, index) => (
            <View key={`title-${index}`}>
              <View>
                <Text>{subtitle}</Text>
              </View>
              {typeof legal.content[index] === 'string' ? (
                <View>
                  <Text>{legal.content[index]}</Text>
                </View>
              ) : (
                legal.content[index].map((paragraph, subindex) => (
                  <View>
                    <Text key={`para-${index}-${subindex}`}>{paragraph}</Text>
                  </View>
                ))
              )}
            </View>
          ))}
      </Textbox>
    </ScrollView>
  );
}

LegalNoticeScreen.navigationOptions = {
  title: 'Impressum',
};

export default LegalNoticeScreen;

import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';

function LegalNoticeScreen() {
  const [legal, setLegal] = useState(null);
  useEffect(() => {
    fetchLegal();
  }, []);
  const fetchLegal = async () => {
    const url = `https://impressum-api.sklinkusch.now.sh`;
    const response = await fetch(url);
    const data = await response.json();
    setLegal(data);
  };
  return (
    <ScrollView>
      <Textbox>
        <Text>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </Text>
      </Textbox>
    </ScrollView>
  );
}

LegalNoticeScreen.navigationOptions = {
  title: 'Impressum',
};

export default LegalNoticeScreen;

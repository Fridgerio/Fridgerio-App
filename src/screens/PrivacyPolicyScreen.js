import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';
import axios from 'axios';

function PrivacyPolicyScreen() {
  /* a few states */
  const [privacy, setPrivacy] = useState(null); // fetched data
  const [error, setError] = useState(null); // error
  /* lifecycle method, such as componentDidMount */
  useEffect(() => {
    fetchPrivacy();
  }, []);
  /* method to fetch the legal notice information */
  const fetchPrivacy = async () => {
    try {
      const url = `https://impressum-api.sklinkusch.now.sh/datenschutz`;
      const data = await axios(url);
      setPrivacy(data);
    } catch (err) {
      setError(err);
    }
  };
  /* render the component */
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

PrivacyPolicyScreen.navigationOptions = {
  title: 'Datenschutzerklärung',
};

export default PrivacyPolicyScreen;

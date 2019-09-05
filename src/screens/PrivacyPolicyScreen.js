import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Textbox } from '../components/styled-components/Boxes';

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
    } catch (err) {
      setError(err);
    }
    setLoading(false);
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

PrivacyPolicyScreen.navigationOptions = {
  title: 'Datenschutzerklärung',
};

export default PrivacyPolicyScreen;

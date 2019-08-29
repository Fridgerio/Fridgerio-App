import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

function LegalNoticeScreen() {
  return (
    <ScrollView>
      <Wrapper>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </Wrapper>
    </ScrollView>
  );
}

LegalNoticeScreen.navigationOptions = {
  title: 'Impressum',
};

export default LegalNoticeScreen;

const Wrapper = styled.Text`
  padding: 15px;
`;

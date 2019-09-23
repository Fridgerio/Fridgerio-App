import React, { useContext } from 'react';
import { Elementbox } from './styled-components/Boxes';
import { PrimaryButton } from './styled-components/Buttons';
import { Context } from '../context/Context';
import { Text } from 'react-native';

function SortingTabs() {
  console.log('We are here');
  const { sortMethod, setSortMethod } = useContext(Context);

  const sortByDate = () => {
    setSortMethod('bestBeforeDate');
  };

  const sortByName = () => {
    setSortMethod('productName');
  };

  return (
    <Elementbox>
      <PrimaryButton
        onPress={sortByName}
        color="transparent"
        title="A-Z"
        active={sortMethod === 'productName'}
      />
      <PrimaryButton
        onPress={sortByDate}
        color="transparent"
        title="Datum"
        active={sortMethod === 'bestBeforeDate'}
      />
    </Elementbox>
  );
}

export default SortingTabs;

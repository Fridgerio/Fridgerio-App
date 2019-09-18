import React, { useContext } from 'react';
import { Elementbox } from './styled-components/Boxes';
import { PrimaryButton } from './styled-components/Buttons';
import { Context } from '../context/Context';

function SortingTabs() {
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
        style={{ flex: 1 }}
      />
      <PrimaryButton
        onPress={sortByDate}
        color="transparent"
        title="Datum"
        active={sortMethod === 'bestBeforeDate'}
        style={{ flex: 1 }}
      />
    </Elementbox>
  );
}

export default SortingTabs;

import React from 'react';
import { Elementbox } from './styled-components/Boxes';
import { PrimaryButton } from './styled-components/Buttons';

function SortingTabs() {
  return (
    <Elementbox>
      <PrimaryButton color="transparent" title="A-Z" style={{ flex: 1 }} />
      <PrimaryButton color="transparent" title="Datum" style={{ flex: 1 }} />
    </Elementbox>
  );
}

export default SortingTabs;

import React from 'react';
import styled from 'styled-components/native';
import { Colors } from './Variables';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// Category icons
const StyledCategoryIcon = styled(MaterialCommunityIcons)`
  color: ${Colors.QuinaryColor};
  font-size: 28px;
  padding-right: 25px;
`;
export const CategoryIcon = props => <StyledCategoryIcon {...props} />;

// Category icons
const StyledIon = styled(Ionicons)`
  color: ${Colors.PrimaryUtilityColor};
  font-size: 28px;
  padding-right: 25px;
`;
export const StyledIonicon = props => <StyledIon {...props} />;

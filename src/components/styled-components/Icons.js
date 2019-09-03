import React from 'react';
import styled from 'styled-components/native';
import { Colors } from './Variables';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// Category icons
const StyledCategoryIcon = styled(MaterialCommunityIcons)`
  color: ${Colors.TertiaryColor};
  font-size: 28px;
  padding-right: 25px;
`;
export const CategoryIcon = props => <StyledCategoryIcon name={props.name} />;

// Ionicon icons
const StyledIon = styled(Ionicons)`
  color: ${Colors.PrimaryUtilityColor};
  font-size: 28px;
`;
export const StyledIonicon = props => <StyledIon name={props.name} />;

// Search icon
const StyledSearchIcon = styled(Ionicons)`
  color: ${Colors.TertiaryColor};
  font-size: 28px;
  align-self: center;
  margin: 3px 15px 0 15px;
`;
export const SearchIcon = () => <StyledSearchIcon name="ios-search" />;

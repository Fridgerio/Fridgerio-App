import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const barcodeFrameWidth = width * 0.7;
const barcodeFrameHeight = barcodeFrameWidth * 0.6;

// Barcode scanner
const StyledBarcodeFrame = styled.Image`
  width: ${barcodeFrameWidth};
  height: ${barcodeFrameHeight};
  align-self: center;
`;
export const BarcodeFrame = props => <StyledBarcodeFrame {...props} />;

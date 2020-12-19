import React from 'react';
import { Image } from 'react-native';

export const EmptyList = () => {
  return (
    <Image
      source={require('../../assets/images/empty.png')}
      style={{ width: 300, height: 250 }}
    />
  );
};

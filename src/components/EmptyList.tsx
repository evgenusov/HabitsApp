import React from 'react';
import styled from 'styled-components/native';
import { BoldText, Container } from './Helpers';
import { Text } from 'react-native-paper';

export const EmptyListView = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

export const EmptyList = () => {
  return (
    <Container>
      <EmptyListView>
        <BoldText>Not Found</BoldText>
        <Text>
          You don't have any habits right now. Please touch button 'Add new
          habit' to create new one
        </Text>
      </EmptyListView>
    </Container>
  );
};

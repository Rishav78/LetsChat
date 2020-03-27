import React from 'react';
import {
  Appbar
} from 'react-native-paper';

const ChatsHeader = () => {
  return (
    <Appbar.Header>
      <Appbar.Content
        title="LetsChat"
      />
      <Appbar.Action 
        icon="magnify" />
      <Appbar.Action 
        icon="dots-vertical" />
    </Appbar.Header>
  );
}

export default ChatsHeader;
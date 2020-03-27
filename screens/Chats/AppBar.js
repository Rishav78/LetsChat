import React from 'react';
import {
  Appbar
} from 'react-native-paper';

const ChatsAppBar = ({ search }) => {
  return (
    <Appbar.Header>
      <Appbar.Content
        title="LetsChat"
      />
      <Appbar.Action 
        icon="magnify"
        onPress={search} />
      <Appbar.Action 
        icon="dots-vertical" />
    </Appbar.Header>
  );
}

export default ChatsAppBar;
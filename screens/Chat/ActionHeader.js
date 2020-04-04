import React, { useState, useContext, useEffect } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import { Text} from 'react-native';

const ActionHeader = ({ count, onDelete, onBack }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => onBack()}
      />
      <Appbar.Content
        title={count}
      />
      <Appbar.Action
        onPress={() => onDelete()}
        icon="delete" />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            size={20}
            color="#FFF"
            onPress={() => setVisible(true)}
          />
        }>
        <Menu.Item
          onPress={() => { }}
          title={<Text>Copy</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Info</Text>} />
      </Menu>
    </Appbar.Header>
  );
}

export default ActionHeader;
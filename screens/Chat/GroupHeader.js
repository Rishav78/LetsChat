import React, { useState, useContext, useEffect } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import { Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SocketContext } from '../../src/contexts/Socket';

const GroupHeader = ({ data }) => {
  
  const { socket } = useContext(SocketContext);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    socket.emit('user-status', { id: data.id }, ({ status }) => {
      setState(status ? 1 : 0);
    });
    socket.on('user-status', ({ id, status }) => {
      if(data.id === id) {
        setState(status ? 1 : 0);
      }
    })
    return () => {
      socket.removeAllListeners('user-status');
    }
  }, []);

  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => navigation.popToTop()}
      />
      <Appbar.Content
        title={data.group.name}
      />
      <Appbar.Action
        icon="phone-plus" />
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
          title={<Text>New group</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>New broadcast</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>LetsChat Web</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Starred messages</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Settings</Text>} />
      </Menu>
    </Appbar.Header>
  );
}

export default GroupHeader;
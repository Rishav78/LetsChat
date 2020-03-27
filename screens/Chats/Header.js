import React, { useState } from 'react';
import {
  Text
} from 'react-native';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import Header from '../../src/components/Header';


const ChatsAppBar = ({ search }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  return (
    <Appbar.Header>
      <Appbar.Content
        title="LetsChat"
      />
      <Appbar.Action
        icon="account-plus"
        onPress={() => navigation.navigate('AddFriend')} />
      <Appbar.Action
        icon="magnify"
        onPress={search} />
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

export default () => <Header AppBar={ChatsAppBar} />
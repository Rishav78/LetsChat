//@ts-check
import React, { useState } from 'react';
import {
  Text
} from 'react-native';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Searchbar from '../../src/components/SearchBar';


const ChatsAppBar = ({ value, onChange, count, refresh }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState(false);
  const [visible, setVisible] = useState(false);

  const hideSearchBar = () => {
    onChange('');
    setSearch(false);
  }

  return (
    search ?
      <Searchbar
        value={value}
        onChange={onChange}
        onBack={hideSearchBar} /> :
      <Appbar.Header>
        <Appbar.Content
          title="Select Friend"
          subtitle={`${count} Friends`}
        />
        <Appbar.Action
          icon="account-plus"
          onPress={() => navigation.navigate('AddFriend')} />
        <Appbar.Action
          icon="magnify"
          onPress={() => setSearch(prevState => !prevState)} />
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
            title={<Text>Invite a friend</Text>} />
          <Menu.Item
            onPress={() => { }}
            title={<Text>Contacts</Text>} />
          <Menu.Item
            onPress={refresh}
            title={<Text>Refresh</Text>} />
          <Menu.Item
            onPress={() => { }}
            title={<Text>Help</Text>} />
        </Menu>
      </Appbar.Header>
  );
}

export default ChatsAppBar;
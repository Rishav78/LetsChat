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


const ChatsAppBar = ({ value, onChange, logout }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState(false);
  const [visible, setVisible] = useState(false);

  const hideSearchBar = () => {
    onChange('');
    setSearch(false);
  }

  const CreateGroup = () => {
    setVisible(false);
    navigation.navigate('CreateGroup')
  }

  return (
    search ?
      <Searchbar
        value={value}
        onChange={onChange}
        onBack={hideSearchBar} /> :
      <Appbar.Header>
        <Appbar.Content
          title="LetsChat"
        />
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
            onPress={CreateGroup}
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
          <Menu.Item
            onPress={() => logout()}
            title={<Text>Logout</Text>} />
        </Menu>
      </Appbar.Header>
  );
}

export default ChatsAppBar;
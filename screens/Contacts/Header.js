//@ts-check
import React, { useState } from 'react';
import {
  Text, StyleSheet
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
        <Appbar.BackAction
          onPress={navigation.goBack}
        />
        <Appbar.Content
          title="Select contact"
          subtitle={`${count} Contacts`}
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
            onPress={() => { }}
            title={<Text style={styles.options}>New group</Text>} />
          <Menu.Item
            onPress={() => { }}
            title={<Text style={styles.options}>Invite a friend</Text>} />
          <Menu.Item
            onPress={() => { }}
            title={<Text style={styles.options}>Contacts</Text>} />
          <Menu.Item
            onPress={refresh}
            title={<Text style={styles.options}>Refresh</Text>} />
          <Menu.Item
            onPress={() => { }}
            title={<Text style={styles.options}>Help</Text>} />
        </Menu>
      </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  options: {
    letterSpacing: 1
  }
})

export default ChatsAppBar;
import React, { useState } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import {
  Text,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Searchbar from '../../src/components/SearchBar';

const AddFriendsAppBar = ({ value, onChange }) => {
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
          title="Add Friend"
        />

        <Appbar.Action
          icon="magnify"
          onPress={() => setSearch( prevState => !prevState)}
        />

      </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  items: {
    paddingHorizontal: 25
  }
})

export default AddFriendsAppBar;
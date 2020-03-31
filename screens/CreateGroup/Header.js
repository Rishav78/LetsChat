import React, { useState } from 'react';
import {
  Appbar
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Searchbar from '../../src/components/SearchBar';

const Header = ({ select, value, onChange, total, subject }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState(false);

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
          title="New group"
          subtitle={ subject ? 'Add subject' : select === 0 ? 'Add participants' : `${select} of ${total} selected`}
        />

        { !subject && <Appbar.Action
          icon="magnify"
          onPress={() => setSearch(prevState => !prevState)} 
        />}

      </Appbar.Header>
  )
}

export default Header;
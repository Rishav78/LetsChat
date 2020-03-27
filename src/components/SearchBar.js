import React from 'react';
import {
  Searchbar
} from 'react-native-paper';

const SearchBar = ({ onChange, onBack, value }) => {
  return (
    <Searchbar
      placeholder="Search..."
      icon="arrow-left"
      value={value ? value : ''}
      onChangeText={onChange}
      style={{ paddingVertical: 5 }}
      onIconPress={onBack} />
  );
}

export default SearchBar;
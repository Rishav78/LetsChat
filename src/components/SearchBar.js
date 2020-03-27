import React from 'react';
import {
  Searchbar
} from 'react-native-paper';

const SearchBar = ({ onChange, onBack }) => {
  return (
    <Searchbar
      placeholder="Search..."
      icon="arrow-left"
      onChangeText={onChange}
      style={{ paddingVertical: 5 }}
      onIconPress={onBack} />
  );
}

export default SearchBar;
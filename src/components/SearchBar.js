import React from 'react';
import {
  Searchbar
} from 'react-native-paper';

const SearchBar = ({ onChange, onBack }) => {
  return (
    <Searchbar
      placeholder="Search..."
      onChangeText={onChange}
      onIconPress={onBack} />
  );
}

export default SearchBar;
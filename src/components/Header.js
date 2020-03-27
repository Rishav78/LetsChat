import React, { useState } from 'react';
import SearchBar from './SearchBar';

const Header = ({ AppBar }) => {
  const [search, setSearch] = useState(false);
  return !search ?
    <AppBar
      search={() => setSearch(search => !search)} /> :
    <SearchBar
      search={() => setSearch(search => !search)}
      onChange={() => { }}
      onBack={() => setSearch(false)} />
}

export default Header;
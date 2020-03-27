import React, { useState } from 'react';
import ChatsAppBar from './AppBar';
import SearchBar from '../../src/components/SearchBar';


const Header = () => {
  const [search, setSearch] = useState(false);
  return !search ?
    <ChatsAppBar
      search={() => setSearch(search => !search)} /> :
    <SearchBar
      search={() => setSearch(search => !search)}
      onChange={() => { }}
      onBack={() => setSearch(false)} />
}

export default Header;
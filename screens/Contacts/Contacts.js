import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import { ContactsContext } from '../../src/contexts/Contacts';
import Header from './Header';

const Contacts = () => {
  const [search, setSearch] = useState('');
  const { contacts, loading, refresh } = useContext(ContactsContext);
  const contactArray = Object.values(contacts).sort((a, b) => a.name > b.name);

  return (
    loading ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView>
        <Header 
          value={search} 
          onChange={setSearch}
          count={contactArray.length}
          refresh={refresh} />
        <View>
          <FlatList
            data={!search ? contactArray : contactArray.filter(e => new RegExp(searchValue, 'i').test(e.name))}
            renderItem={(data) => <Text>{data.item.name} {data.item.number}</Text>}
            keyExtractor={(data) => data.phone}
          />
        </View>
      </SafeAreaView>
  );
}

export default Contacts;
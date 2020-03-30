import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ContactsContext } from '../../src/contexts/Contacts';
import Header from './Header';
import User from '../../src/components/User';

const Contacts = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { contacts, loading, refresh } = useContext(ContactsContext);
  const contactArray = Object.values(contacts).sort((a, b) => a.name > b.name);

  const startChat = (index) => {
    console.log(contactArray[index])
    const data = {
      id: uuidv4(),
      chattype: 'personal',
      member: {
        number: contactArray[index].number,
        countrycode: contactArray[index].countrycode
      }
    }
    navigation.navigate('Chat', { data });
  }

  return (
    loading ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Header
          value={search}
          onChange={setSearch}
          count={contactArray.length}
          refresh={refresh} />
        <View>
          <FlatList
            data={!search ? contactArray : contactArray.filter(e => new RegExp(search, 'i').test(e.name))}
            renderItem={(data) =>
              <User
                data={data.item}
                onPress={() => startChat(data.index)} 
              />}
            keyExtractor={(data) => data.number}
          />
        </View>
      </SafeAreaView>
  );
}

export default Contacts;
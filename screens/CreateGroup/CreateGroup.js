import React, { useState, useContext } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import { FAB } from 'react-native-paper';
import Header from './Header';
import { ContactsContext } from '../../src/contexts/Contacts';
import User from '../../src/components/User';
import Select from '../../src/components/Select';

const CreateGroup = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const { contacts } = useContext(ContactsContext);
  const [contactsArray, setContactsArray] = useState(Object.values(contacts));

  const sortedContacts = contactsArray.sort((a, b) => (a.name > b.name));

  const moveToAddSubject = () => {
    if(selectedContacts.length === 0) {
      return ToastAndroid.showWithGravity(
        'At least 1 contact must be selected',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    navigation.navigate('AddSubject', { selected: selectedContacts });
  }

  const markSelected = index => {
    setSelectedContacts(prevState => [...prevState, contactsArray[index]]);
    setContactsArray(prevState => prevState.filter((e, i) => (i !== index)));
  }

  const markUnselected = index => {
    setContactsArray(prevState => [...prevState, selectedContacts[index]]);
    setSelectedContacts(prevState => prevState.filter((e, i) => (i !== index)));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View>
        <Header
          select={selectedContacts.length}
          value={search}
          onChange={setSearch}
          total={Object.keys(contacts).length}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View>
          <FlatList
            style={{ borderBottomColor: '#ededed' }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={selectedContacts}
            keyExtractor={item => item.number}
            renderItem={data =>
              <Select
                data={data.item}
                icon={true}
                onPress={() => markUnselected(data.index)}
              />
            }
          />
        </View>
        {selectedContacts.length > 0 &&
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#e6e6e6',
              marginHorizontal: 20,
              marginVertical: 10
            }}
          />}
        <View>
          <FlatList
            data={!search ? sortedContacts : sortedContacts.filter(e => new RegExp(search, 'i').test(e.name))}
            renderItem={(data) =>
              <User
                data={data.item}
                onPress={() => markSelected(data.index)}
              />}
            keyExtractor={(data) => data.number}
          />
        </View>
        <FAB
          small
          icon="arrow-right"
          color="#FFF"
          style={styles.next}
          onPress={moveToAddSubject}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  next: {
    backgroundColor: '#2ab9a4',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
    margin: 25,
    color: '#FFF'
  }
})

export default CreateGroup;
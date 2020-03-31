import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Text
} from 'react-native';
import { FAB } from 'react-native-paper';
import Header from './Header';
import Select from '../../src/components/Select';

const AddSubject = ({ route }) => {
  const [name, setName] = useState('');
  const { selected } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header subject={true} />
      <View style={{ paddingHorizontal: 15, backgroundColor: 'white', paddingVertical: 20 }}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../../assets/logo.png')}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => (text.length <= 25 && setName(text))}
              placeholder="Type group subject here..."
            />
            {name.length > 0 &&
              <Text style={styles.textlenght}>{25 - name.length}</Text>}
          </View>
        </View>
        <View>
          <Text>Provide a group subject and optional group icon</Text>
        </View>
        <FAB
          small
          icon="arrow-right"
          color="#FFF"
          style={styles.next}
          onPress={() => {}}
        />
      </View>
      <View style={{ padding: 10, flex: 1 }}>
        <Text>Participants: {selected.length}</Text>
        <FlatList
          style={{ borderBottomColor: '#ededed' }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={selected}
          keyExtractor={item => item.number}
          renderItem={data =>
            <Select
              data={data.item}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 0,
    borderBottomColor: '#5cb85c',
    borderBottomWidth: 2,
    paddingRight: 15
  },
  textlenght: {
    position: 'absolute',
    right: 0,
    fontSize: 12
  },
  next: {
    backgroundColor: '#2ab9a4',
    position: 'absolute',
    bottom: -50,
    right: -20,
    padding: 10,
    margin: 25,
    color: '#FFF'
  }
})

export default AddSubject;
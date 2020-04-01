import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList
} from 'react-native';
import Header from './Header';
import InputMessage from '../../src/components/InputMessage';
import Message from '../../src/components/Message';


const Group = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Header />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={[]}
            renderItem={(data) =>
              <Message data={data.item} />
            }
            keyExtractor={item => item.id}
          />
        </View>
        <View>
          <InputMessage
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Group;
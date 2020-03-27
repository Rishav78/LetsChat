import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const User = ({ data, onAdd, add, onPress }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
          <Image source={require('../../assets/logo.png')} style={{ width: 70, height: 70 }} />
        </View>
        <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={onPress ? onPress : (() => { })}>
            <View>
              <Text style={{ fontSize: 18 }}>
                {data.firstname + ' ' + data.lastname}
              </Text>
            </View>
            <View>
              <Text>
                {data.status}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {add && <View style={{ paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
          <TouchableOpacity
            onPress={onAdd || (() => { })}
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Text>Add Friend</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  );
}

export default User;


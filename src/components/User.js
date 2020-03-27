import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const User = ({ data, onAdd }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Image source={require('../../assets/logo.png')} style={{ width: 70, height: 70 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
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
        </View>
        <View style={{ paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
          <TouchableOpacity
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Text>Add Friend</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default User;


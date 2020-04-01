import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const Chat = ({ data, onPress }) => {
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
                { data.chattype === 'personal' ? data.name : data.group.name}
              </Text>
            </View>
            <View>
              <Text numberOfLines={1}>
                { data.lastmessage ? data.lastmessage.message : 
                  'Message to this chat and calls are now secured with end-to-end encryption. Tap for more info.'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Chat;


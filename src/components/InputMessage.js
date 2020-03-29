import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

const InputMessage = ({ onPress }) => {
  const [text, setText] = useState('');

  const notify = () => {
    if(onPress) {
      onPress(text);
    }
    setText('');
  }

  return (
    <View style={{ flexDirection: 'row', paddingBottom: 20, marginHorizontal: 10 }}>
      <View style={{ flex: 1 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={{ borderBottomWidth: 1 }}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={notify}>
          <Text>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InputMessage;
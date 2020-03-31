import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import { IconButton } from 'react-native-paper';


const Select = ({ onPress, data, icon }) => {
  return (
    <View style={{ alignItems: 'flex-start', paddingHorizontal: 5 }}>
      <TouchableOpacity onPress={onPress ? onPress : () => { }}>
        <View>
          <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/logo.png')}
            />
          </View>
          {icon && <View>
            <IconButton
              icon="close-circle"
              size={16}
              style={{ position: 'absolute', bottom: 0, right: 0, padding: 0, margin: 0, backgroundColor: '#FFF', borderWidth: 0 }}
            />
          </View>}
          <View>
            <Text style={{ textAlign: 'center'}}>{data.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Select;
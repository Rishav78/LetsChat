import React from 'react';
import {
  View,
  Text
} from 'react-native';

const Err = ({ title}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 20 }}>
      <Text style={{ fontSize: 18}}>{title}</Text>
    </View>
  );
}
export default Err;
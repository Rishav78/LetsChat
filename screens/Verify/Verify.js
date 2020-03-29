import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  TextInput,
  IconButton
} from 'react-native-paper';
import Header from './Header';

const Verify = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Header phone="+91 8528474244" />
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 30 }}>
          <Text style={{ textAlign: 'center', lineHeight: 25, fontSize: 14 }}>
            Waiting to automatically detect an SMS sent to
            +91 8528474244. Wrong number ?
          </Text>
        </View>
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder="OPT"
              textAlign="center"
            />
            <Text>Enter 6-digit code</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <View>
              <IconButton
                size={20}
                color="#2ab9a4"
                icon="message-processing" />
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 15, color: '#2ab9a4' }}>Resend SMS</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#e6e6e6',
              marginHorizontal: 20
            }}
          />
          <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <View>
              <IconButton
                size={20}
                color="#2ab9a4"
                icon="phone" />
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 15, color: '#2ab9a4' }}>Call me</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 10,
    width: 150,
    marginBottom: 10
  }
})

export default Verify;
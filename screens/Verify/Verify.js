import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import config from '../../config';
import {
  TextInput,
  IconButton
} from 'react-native-paper';
import Header from './Header';

const Verify = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [countrycode, setcountryCode] = useState('');

  const preventGoBack = () => {
    return true;
  }

  useState(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', preventGoBack);
    });
  
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', preventGoBack);
    });
  }, []);

  useEffect(() => {

    AsyncStorage.getItem('phone')
      .then(number => JSON.parse(number))
      .then(({ number, countrycode }) => {
        setNumber(number);
        setcountryCode(countrycode);
      })

  }, []);

  const onChangeOtp = async otp => {
    if (otp.length === 6) {
      setLoading(true);
      const res = await fetch(config.API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation {
              verifyUser(otp: "${otp}", phone: "+${countrycode}${number}") {
                err
                token
                expiresIn
              }
            }
          `
        })
      });
      const { data } = await res.json();
      if (data.verifyUser.err) {
        setLoading(false);
        return Alert.alert('Error', data.verifyUser.err);
      }
      AsyncStorage.setItem('status', 'verified');
      AsyncStorage.setItem('token', data.verifyUser.token);
      navigation.navigate('Basicprofile', { number, countrycode });
    }
  }

  return (
    loading ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Header phone={`+${countrycode} ${number}`} />
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', lineHeight: 25, fontSize: 15 }}>
              Waiting to automatically detect an SMS sent to
            </Text>
            <View style={{ flexDirection: 'row'}}>
              <Text style={{ fontWeight: 'bold'}}>
                +{countrycode} {number}. &nbsp;
              </Text>
              <TouchableOpacity onPress={navigation.goBack}>
                <Text style={{ color: '#0080ff'}}>Wrong number ?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={styles.input}
                placeholder="OPT"
                textAlign="center"
                onChangeText={onChangeOtp}
                keyboardType="number-pad"
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
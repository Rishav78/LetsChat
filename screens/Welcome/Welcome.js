import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-native-paper';


const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider>
        <View style={{ flex: 1 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to LetsChat</Text>
          </View>
          <View>
            <Text>Image</Text>
          </View>
          <View>
            <View style={styles.policies}>
              <Text style={{ textAlign: 'center', color: '#666666', lineHeight: 25 }}>
                Read our Privacy Policy. Tap "Agree and continue"
                to accept the Terms and Services
              </Text>
              <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.agree}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>AGREE AND CONTINUE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 40
  },
  title: {
    fontSize: 28,
    color: '#1c7d6e',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  policies: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agree: {
    paddingHorizontal: 65,
    paddingVertical: 8,
    backgroundColor: '#5cb85c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 20
  }
})

export default Welcome;
import React from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';

const Splash = ({ navigation }) => {
  return (
    <View style={ styles.container }>
      <Image
        style={{ width: 200, height: 200}}
        source={require('../assets/logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Splash;
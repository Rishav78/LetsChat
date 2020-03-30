import { PermissionsAndroid, Platform } from 'react-native';

export default () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.READ_CONTACTS]
    ).then((result) => {
      if (result['android.permission.READ_CONTACTS'] === 'granted') {
        console.log('done');
      } else if ( result['android.permission.READ_CONTACTS'] === 'never_ask_again') {
        
      }
    });
  }
}
import React, { useState } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import {
  Text,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../src/components/Header';

const AddFriendsAppBar = ({ search }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={navigation.goBack}
      />

      <Appbar.Content
        title="Add Friend"
      />

      <Appbar.Action
        icon="magnify"
        onPress={search}
      />

    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  items: {
    paddingHorizontal: 25
  }
})

export default () => <Header AppBar={AddFriendsAppBar} />
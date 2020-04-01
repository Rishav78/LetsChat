import React, { useState, useContext } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import { Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ContactsContext } from '../../src/contexts/Contacts';

const Header = ({ data }) => {
  const { contacts } = useContext(ContactsContext);
  const [visible, setVisible] = useState(false);
  const key = `+${data.countrycode}${data.number}`;
  const name = contacts[key] ? contacts[key].name : key;
  const navigation = useNavigation();
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={navigation.goBack}
      />
      <Appbar.Content
        title={`${name}`}
        subtitle="online"
      />
      <Appbar.Action
        icon="phone" />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            size={20}
            color="#FFF"
            onPress={() => setVisible(true)}
          />
        }>
        <Menu.Item
          onPress={() => { }}
          title={<Text>New group</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>New broadcast</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>LetsChat Web</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Starred messages</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Settings</Text>} />
      </Menu>
    </Appbar.Header>
  );
}

export default Header;
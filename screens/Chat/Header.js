import React, { useState } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import { Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={navigation.goBack}
      />
      <Appbar.Content
        title={`${data.firstname} ${data.lastname}`}
        subtitle="online"
      />
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
import React, { useState } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';
import { Text } from 'react-native';
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
        title={`Maa Bap or Beta`}
      />
      <Appbar.Action
        icon="phone-plus" />
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
          title={<Text>Group info</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Group Media</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Search</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Mute notifications</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>Wallpaper</Text>} />
        <Menu.Item
          onPress={() => { }}
          title={<Text>More</Text>} />
      </Menu>
    </Appbar.Header>
  );
}

export default Header;
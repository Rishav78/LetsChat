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
import SearchBar from '../../src/components/SearchBar';

const FriendsAppBar = ({ onChange, value, count }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    search ? 
    <SearchBar 
      onBack={() => setSearch(false)}
      onChange={onChange}
      value={value}
    /> :
    <Appbar.Header>
      <Appbar.BackAction
        onPress={navigation.goBack}
      />

      <Appbar.Content
        title="Select Friend"
        subtitle={`${count} Friends`}
      />

      <Appbar.Action
        icon="magnify"
        onPress={() => setSearch(!search)}
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
          style={styles.items}
          onPress={() => { }}
          title={<Text>Invite friends</Text>} />
        <Menu.Item
          style={styles.items}
          onPress={() => { }}
          title={<Text>Refresh</Text>} />
        <Menu.Item
          style={styles.items}
          onPress={() => { }}
          title={<Text>Help</Text>} />
      </Menu>

    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  items: {
    paddingHorizontal: 25
  }
});

export default FriendsAppBar;
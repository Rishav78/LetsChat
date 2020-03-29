import React, { useState } from 'react';
import {
  Appbar,
  Menu,
  Text
} from 'react-native-paper';

const Header = ({ phone }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Appbar.Header style={{ backgroundColor: '#FFF', elevation: 0 }}>
      <Appbar.Content
        color="#2ab9a4"
        title={`Verify ${phone}`}
        style={{ alignItems: 'center' }}
      />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            size={20}
            onPress={() => setVisible(true)}
          />
        }>
          <Menu.Item
          onPress={() => setVisible(false)}
          title={<Text>Help</Text>} />
      </Menu>
    </Appbar.Header>
  );
}

export default Header;
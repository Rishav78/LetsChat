import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

const Confirm = ({ visible, setVisible, forme }) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <Dialog.Title>Delete message?</Dialog.Title>
        <Dialog.Content
          style={{ alignItems: 'flex-end' }}>
          <Button style={styles.buttons} onPress={forme}>DELETE FOR ME</Button>
          <Button style={styles.buttons} onPress={() => setVisible(false)}>CANCEL</Button>
          <Button style={styles.buttons} onPress={() =>setVisible(false)}>DELETE FOR EVERYONE</Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginVertical: 10
  }
});

export default Confirm;
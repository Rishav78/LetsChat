import React, { useContext, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const Message = ({ data }) => {
  const date = new Date(data.createdAt);
  const { sendbyme } = data;
  const hours = date.getHours() % 12,
    minutes = date.getMinutes(),
    ampm = date.getHours() >= 12 ? 'pm' : 'am';
    
  return (
    <View style={{ marginVertical: 8, paddingHorizontal: 10 }}>
      <View style={{ alignItems: sendbyme === 1 ? 'flex-end' : 'flex-start' }}>
      <TouchableOpacity
        style={{ padding: 8, backgroundColor: '#135349', borderRadius: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{data.message}</Text>
          </View>
          <View style={styles.messageInfoContainer}>
            <Text
              style={styles.messageInfo}>
              {`${hours}:${minutes} ${ampm}`}
            </Text>
          </View>
          <View style={styles.messageInfoContainer}>

          </View>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageInfoContainer: {
    justifyContent: 'flex-end'
  },
  messageInfo: {
    fontSize: 12,
    color: '#FFF'
  },
  messageContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8
  },
  message: {
    fontSize: 17,
    color: '#FFF'
  }
})

export default React.memo(Message);
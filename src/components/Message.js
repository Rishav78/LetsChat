import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const Message = ({ data, selected, onPress, onLongPress }) => {
  const date = new Date(data.createdAt);
  const { sendbyme } = data;
  const hours = date.getHours() % 12,
    minutes = date.getMinutes(),
    ampm = date.getHours() >= 12 ? 'pm' : 'am';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View style={ selected ? { backgroundColor: 'rgba(77, 148, 255, 0.2)' } : {}}>
        <View style={{ marginVertical: 8, paddingHorizontal: 10 }}>
          <View style={{ alignItems: sendbyme === 1 ? 'flex-end' : 'flex-start' }}>
            <View
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
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
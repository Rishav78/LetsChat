import React, { useEffect, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { SocketContext } from '../contexts/Socket';
import { MessageDispatchContext } from '../contexts/Message';

const Message = ({ data, selected, onPress, onLongPress, chat }) => {
  const { socket } = useContext(SocketContext);
  const { updateNotified } = useContext(MessageDispatchContext);
  const date = new Date(data.createdAt);
  const { sendbyme } = data;
  const hours = date.getHours() % 12,
    minutes = date.getMinutes(),
    ampm = date.getHours() >= 12 ? 'pm' : 'am';

  useEffect(() => {
    if(data.sendbyme && !data.notified) {
      socket.emit('message-received', { chat, message: data }, 
      err => {
        updateNotified(data.id);
      })
    }

    if(!data.sendbyme && !data.notified) {
      
    }
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View style={selected ? { backgroundColor: 'rgba(77, 148, 255, 0.2)' } : {}}>
        <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
          {
            !sendbyme ?
              <View style={{ alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', marginRight: 80, backgroundColor: '#FFF', borderRadius: 5, padding: 3, flexWrap: 'wrap', justifyContent: 'flex-end'  }}>
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 15 }}>{data.message}</Text>
                  </View>
                  <View style={{ marginHorizontal: 5, justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 12, color: '#a4a4a4' }}>{hours}:{minutes < 10 && '0'}{minutes}&nbsp;{ampm}</Text>
                  </View>
                </View>
              </View> :
              <View style={{ alignItems: 'flex-end' }}>
              <View style={{ flexDirection: 'row', marginLeft: 80, backgroundColor: '#dcf8c6', borderRadius: 5, padding: 3, flexWrap: 'wrap', justifyContent: 'flex-end'  }}>
                <View style={{ padding: 5 }}>
                  <Text style={{ fontSize: 15 }}>{data.message}</Text>
                </View>
                <View style={{ marginHorizontal: 5, justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 12, color: '#a4a4a4' }}>{hours}:{minutes < 10 && '0'}{minutes}&nbsp;{ampm}</Text>
                </View>
              </View>
            </View>
          }
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Message);
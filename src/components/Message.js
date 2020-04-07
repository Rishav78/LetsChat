import React, { useEffect, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { SocketContext } from '../contexts/Socket';
import { MessageDispatchContext } from '../contexts/Message';

const Message = ({ data, selected, onPress, onLongPress, chat, receiveByEveryOne }) => {
  // const [send, setSend] = useState(false);
  const { socket } = useContext(SocketContext);
  const { updateNotified } = useContext(MessageDispatchContext);
  const date = new Date(data.createdAt);
  const { sendbyme } = data;
  const hours = date.getHours() % 12 || 12 ,
    minutes = date.getMinutes(),
    ampm = date.getHours() >= 12 ? 'pm' : 'am';

  useEffect(() => {
    // const sender = typeof data.sender === 'string' ?
    //     data.sender :
    //     `+${data.sender.countrycode}${data.sender.number}`;

    // if (!data.sendbyme && !data.notified) {
    //   socket.emit('message-received', {
    //     chat: chat.id,
    //     message: { ...data, sender }
    //   },
    //     err => {
    //       updateNotified(data.id);
    //     });
    // }
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
                <View style={{ flexDirection: 'row', marginRight: 80, backgroundColor: '#FFF', borderRadius: 5, padding: 3, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 15 }}>{data.message}</Text>
                  </View>
                  <View style={{ marginHorizontal: 5, justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 12, color: '#a4a4a4' }}>{hours}:{minutes < 10 && '0'}{minutes}&nbsp;{ampm}</Text>
                  </View>
                </View>
              </View> :
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', marginLeft: 80, backgroundColor: '#dcf8c6', borderRadius: 5, padding: 3, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 15 }}>{data.message}</Text>
                  </View>
                  <View style={{ marginHorizontal: 5, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 12, color: '#a4a4a4' }}>{hours}:{minutes < 10 && '0'}{minutes}&nbsp;{ampm}</Text>
                      <IconButton
                        size={12}
                        color="#a4a4a4"
                        style={{ padding: 0, margin: 0 }}
                        icon={receiveByEveryOne ? "check-all" : data.notified ? "check" : "clock-outline"}
                      />
                    </View>
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
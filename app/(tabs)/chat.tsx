import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Image, StatusBar, Platform } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat/src/GiftedChat';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
    const [messages, setMessages] = useState<IMessage[]>([]);
  
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hi! How are you today?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'ChatBot',
            avatar: require('../../assets/images/react-logo.png'),
        },
        },
      ]);
    }, []);
  
    const onSend = useCallback((newMessages: IMessage[] = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
      // 这里可以添加发送消息到后端的逻辑
    }, []);
  
    const user = {
      _id: 1,
      name: 'Edward',
      avatar: require('../../assets/images/react-logo.png'),
    };
  
    // 对方的信息
    const otherUser = {
      _id: 2,
      name: 'ChatBot',
      avatar: require('../../assets/images/react-logo.png'),
    };
  
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          {/* 设置状态栏 */}
          <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
          <View style={styles.container}>
            {/* 自定义头部 */}
            <View style={styles.header}>
              <Image source={otherUser.avatar} style={styles.avatar} />
              <Text style={styles.headerText}>{otherUser.name}</Text>
            </View>
    
            {/* 聊天组件 */}
            <GiftedChat
              messages={messages}
              onSend={(messages) => onSend(messages)}
              user={user}
              showUserAvatar={true} // 显示用户头像
              listViewProps={{
                contentContainerStyle: {
                  paddingBottom: Platform.OS === 'android' ? 0 : 10,
                },
              }}
              bottomOffset={Platform.OS === 'ios' ? 10 : 0}
            />
          </View>
        </SafeAreaView>
      );
    }
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff', 
    },
    container: {
      flex: 1,
      backgroundColor: '#fff', 
    },
    header: {
      height: 60,
      backgroundColor: '#f5f5f5', 
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
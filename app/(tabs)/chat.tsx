import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Image, StatusBar, Platform } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
    const [messages, setMessages] = useState<IMessage[]>([]);
  
    useEffect(() => {
      setMessages([
        {
          _id: 3,
          text: "I'm sorry to hear that you're feeling this way. Here are some suggestions to help you cope with the stress:\n\n1. **Take Regular Breaks**: Make sure to take short breaks during your study sessions to relax and recharge.\n2. **Practice Mindfulness or Meditation**: These techniques can help you manage anxiety and stay focused.\n3. **Reach Out for Support**: Talk to friends, family, or a counselor about how you're feeling.",
          createdAt: new Date(Date.now()), 
          user: {
            _id: 2,
            name: 'ChatBot',
            avatar: require('../../assets/images/react-logo.png'),
          },
        },
        {
          _id: 2,
          text: "Yes, I didn't do well on my midterms, and I'm feeling down. The course pressure is going to be high.",
          createdAt: new Date(Date.now()), 
          user: {
            _id: 1,
            name: 'Edward',
            //avatar: require('../../assets/images/react-logo.png'),
          },
        },
        {
          _id: 1,
          text: "Hi Edward! It seems you're a bit stressed today and not feeling well. Did something happen?",
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
            {/* 左侧：头像和名称 */}
            <View style={styles.headerLeft}>
              <Image source={otherUser.avatar} style={styles.avatar} />
              <Text style={styles.headerText}>{otherUser.name}</Text>
            </View>
            {/* 右侧：Emoji 和压力值 */}
            <View style={styles.headerRight}>
              <Text style={styles.emotionEmoji}>😔</Text>
              <View style={styles.stressContainer}>
                <Text style={styles.stressLabel}>Pressure:</Text>
                <Text style={styles.stressValue}>{80}</Text>
              </View>
            </View>
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
      justifyContent: 'space-between', 
      alignItems: 'center',
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
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
    emotionEmoji: {
      fontSize: 24,
      marginRight: 10,
    },
    stressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
    stressLabel: {
      fontSize: 16,
      marginRight: 5,
    },
    stressValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    emojiContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    emoji: {
      fontSize: 24,
    },
  });
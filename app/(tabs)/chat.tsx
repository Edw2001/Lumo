import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Image, StatusBar, Platform } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generation function

// Define allowed emotion types
type Emotion = 'relaxed' | 'happy' | 'sad' | 'nervous';

// Define the interface for emotion details
interface EmotionDetails {
  emoji: string;
  message: string;
  stressLevel: number;
}

// Define emotion data
const emotionData: Record<Emotion, EmotionDetails> = {
  relaxed: {
    emoji: '😌',
    message: 'You seem relaxed today. Keep enjoying your day!',
    stressLevel: 20,
  },
  happy: {
    emoji: '😊',
    message: 'Great to see you happy! Keep up the good mood!',
    stressLevel: 10,
  },
  sad: {
    emoji: '😔',
    message: "I'm sorry to hear that you're feeling sad. I'm here for you.",
    stressLevel: 70,
  },
  nervous: {
    emoji: '😟',
    message: "It seems you're feeling nervous. Let's try to relax.",
    stressLevel: 60,
  },
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionDetails>({
    emoji: '😐',
    message: '',
    stressLevel: 50,
  });

  // Function to update emotion
  const updateEmotion = (emotion: Emotion) => {
    const emotionDetail = emotionData[emotion];
    if (emotionDetail) {
      setCurrentEmotion(emotionDetail);
      // Add a new message to the chat using UUID to generate a unique _id
      const newMessage: IMessage = {
        _id: uuidv4(),
        text: emotionDetail.message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
          avatar: require('../../assets/images/react-logo.png'),
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [newMessage])
      );
    } else {
      console.warn(`Emotion "${emotion}" is not defined.`);
    }
  };

  useEffect(() => {
    setMessages([
      // Initial messages are commented out. You can uncomment and use them if needed.
      // {
      //   _id: uuidv4(),
      //   text: "Yes, I didn't do well on my midterms, and I'm feeling down. The course pressure is going to be high.",
      //   createdAt: new Date(Date.now()),
      //   user: {
      //     _id: 1,
      //     name: 'Edward',
      //   },
      // },
      // {
      //   _id: uuidv4(),
      //   text: "Hi Edward! It seems you're a bit stressed today and not feeling well. Did something happen?",
      //   createdAt: new Date(),
      //   user: {
      //     _id: 2,
      //     name: 'ChatBot',
      //     avatar: require('../../assets/images/react-logo.png'),
      //   },
      // },
    ]);

    // Emotions extracted from ML Model.
    const emotionFromMLModel: Emotion = 'happy';
    updateEmotion(emotionFromMLModel);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const messagesWithUUID = newMessages.map((msg) => ({
      ...msg,
      _id: uuidv4(),
      createdAt: msg.createdAt || new Date(),
    }));
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messagesWithUUID)
    );
  }, []);

  const user = {
    _id: 1,
    name: 'Edward',
    avatar: require('../../assets/images/react-logo.png'),
  };

  const otherUser = {
    _id: 2,
    name: 'ChatBot',
    avatar: require('../../assets/images/react-logo.png'),
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Set the status bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.container}>
        {/* Custom header */}
        <View style={styles.header}>
          {/* Left side: avatar and name */}
          <View style={styles.headerLeft}>
            <Image source={otherUser.avatar} style={styles.avatar} />
            <Text style={styles.headerText}>{otherUser.name}</Text>
          </View>
          {/* Right side: Emoji and stress level */}
          <View style={styles.headerRight}>
            <Text style={styles.emotionEmoji}>{currentEmotion.emoji}</Text>
            <View style={styles.stressContainer}>
              <Text style={styles.stressLabel}>Pressure:</Text>
              <Text style={styles.stressValue}>{currentEmotion.stressLevel}</Text>
            </View>
          </View>
        </View>

        {/* Chat component */}
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={user}
          showUserAvatar={true} // Show user avatar
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

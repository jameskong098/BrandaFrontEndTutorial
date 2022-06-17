import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native'

export default function Example() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, I am Branda's chatbot. Here are some topics that you can ask me about!",
        createdAt: new Date(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: 'COVID policies',
              value: '',
            },
            {
              title: 'Facility Hours',
              value: '',
            },
            {
              title: 'Next Bus/Van',
              value: '',
            },
            {
              title: 'Classes',
              value: '',
            },
            {
              title: 'Emergencies',
              value: '',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require("../assets/brandaLogo.jpg"),
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      style={styles.background}
      
    />
  )
  
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgb(86,113,234)'
  }
});
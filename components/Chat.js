import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, GiftedChat, Day } from 'react-native-gifted-chat'
import { View, StyleSheet } from 'react-native'
import { QuickReplies } from 'react-native-gifted-chat/lib/QuickReplies';

export default function Example() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, I am Branda's chatbot. Here are some topics that you can ask me about! You can also type to ask me a question or topic!",
        createdAt: new Date(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: 'COVID policies',
              value: 'Always wear masks',
            },
            {
              title: 'Facility Hours',
              value: '8 AM to 8 PM',
            },
            {
              title: 'Next Bus/Van',
              value: 'In 40 minutes',
            },
            {
              title: 'Classes',
              value: 'Class registration begins on [insert date]',
            },
            {
              title: 'Emergencies',
              value: 'Call 911',
            },
          ],
        },
        user: {
          _id: 0,
          name: 'Branda Bot',
          avatar: require("../assets/brandaLogo.jpg"),
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  function renderDay (props) {
    //Add the extra styles via containerStyle
   return <Day {...props} textStyle={styles.date} />
  }

  function renderQuickReplies (props) {
    //Add the extra styles via containerStyle
   return <QuickReplies {...props} quickReplyTextStyle={styles.quickReply} quickReplyStyle={styles.quickReplyBorder} />
  }

  function onQuickReply (quickReply) {
    let message = quickReply[0].title;
    let response = quickReply[0].value;
    let choice = {
      text: message,
      createdAt: new Date(),
      user: {
        _id:1,
        name: 'User',
      }
    }
    let reply = {
      text: response,
      createdAt: new Date(),
      user: {
        _id: 0,
        name: 'Branda Bot',
        avatar: require("../assets/brandaLogo.jpg"),
      },
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, [choice]))
    setMessages(previousMessages => GiftedChat.append(previousMessages, [reply]))
  }
  
  return (
  

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      messagesContainerStyle={styles.background}
      renderDay={renderDay}
      renderQuickReplies={renderQuickReplies}
      onQuickReply={onQuickReply}
    />
    
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgb(201,227,245)',
    
  },

  date: {
    color: 'black',
  },

  quickReply: {
    color: 'black',
  },

  quickReplyBorder: {
    backgroundColor: 'rgb(235,240,243)',
  },
});
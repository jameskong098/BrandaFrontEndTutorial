import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Day, } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native'
import { QuickReplies } from 'react-native-gifted-chat/lib/QuickReplies';
import { View,Text } from 'react-native';
import {quickReplies, openMessage, randomResponse} from './Messages';
import { Logs } from 'expo'
import { useReducer } from 'react';

Logs.enableExpoCliLogging()
console.log( ' ~~ EXPO CONSOLE LOGGING ENABLED ~~' )

export default function Chat() {
  const [messages, setMessages] = useState(openMessage);
  const [triviaAnswer,setTriviaAnswer] = useState()
  useEffect(() => {
    console.log(triviaAnswer);
    botReply(question, null);
    }, [triviaAnswer])

  function onQuickReply (quickReply) {
    let message = quickReply[0].title; 
    let response = quickReply[0].value;
    let options = quickReply[0].quickReplies;
    let keyGenerator = '_' + Math.random().toString(36).substr(2, 9)
    let choice = {
        _id: keyGenerator,
        text: message,
        createdAt: new Date(),
        user: {
          _id:1,
          name: 'User',
        }
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, [choice]))
    
    if (message != 'Random Trivia') {
      botReply(response, options)
    }
    else{
        fetch("https://opentdb.com/api.php?amount=1")
          .then((response) => response.json())
          .then((textResponse) => {
            question= textResponse.results[0].question
            answer = textResponse.results[0].correct_answer
            console.log(answer)
            setTriviaAnswer(answer)
            // botReply(question, null)
          })
          .catch((error) => {
            console.error(error);
          });
      }
  }


  function botReply (response, options) {
    console.log(triviaAnswer)
    let keyGenerator = '_' + Math.random().toString(36).substr(2, 9)
    if (triviaAnswer){
      reply = {
        _id: keyGenerator,
        text: response,
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Branda Bot',
          avatar: require("../assets/brandaLogo.jpg"),
        },
      }
    }
    else{
      reply = {
          _id: keyGenerator,
          text: response,
          quickReplies: options?options:
          {
            type: 'radio', // or 'checkbox',
            keepIt: true,
            values: [{
              title: 'Ask another question?',
              value: "Hello, I am Branda's chatbot. Here are some topics that you can ask me about. You can also type in the chat box for some responses.",
              quickReplies: {
                type: 'radio', // or 'checkbox',
                keepIt: true,
                values: quickReplies,
              }
            }],
          },
          createdAt: new Date(),
          user: {
            _id: 0,
            name: 'Branda Bot',
            avatar: require("../assets/brandaLogo.jpg"),
          },
        }
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, [reply]))
  }


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    var response;
    console.log(triviaAnswer)
    if (triviaAnswer) {
        let userResponse = messages[0].text.toLowerCase()
        console.log(triviaAnswer)
        let answer = triviaAnswer.toLowerCase()
        response = userResponse.includes(answer)?"Correct! ":"Incorrect..." + triviaAnswer + " is the answer!"
    }
    else {
      response = randomResponse[Math.floor(Math.random() * (randomResponse.length))]
    }
    botReply(response, null)
  }, [])


  function renderDay (props) {
   return <Day {...props} textStyle={styles.date} />
  }


  function renderQuickReplies (props) {
   return <QuickReplies {...props} quickReplyTextStyle={styles.quickReply} quickReplyStyle={styles.quickReplyBorder} />
  }


  return (
    <View style={{flex: 1}}>
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
    </View>
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
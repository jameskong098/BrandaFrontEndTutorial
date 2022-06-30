import React, { useState} from 'react'
import { GiftedChat, Day, } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native'
import { QuickReplies } from 'react-native-gifted-chat/lib/QuickReplies';
import { View } from 'react-native';
import {quickReplyTexts, openMessage, randomResponse} from './Messages';
import { Logs } from 'expo'

Logs.enableExpoCliLogging()
console.log( ' ~~ EXPO CONSOLE LOGGING ENABLED ~~' )

export default function Chat() {
  const [messages, setMessages] = useState(openMessage);


  function onQuickReply (quickReply) {
    let message = quickReply[0].title; 
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

    if (message != 'Random Trivia') { // Hard-coded quickReply
      var response = quickReply[0].value;
      var options = quickReply[0].quickReplies;
      botReply(response, options)
    }
    else{ // Trivia question from API
        fetch("https://opentdb.com/api.php?amount=1")
          .then((response) => response.json())
          .then((textResponse) => {
            var question = textResponse.results[0].question
            var correct = textResponse.results[0].correct_answer
            var incorrect = textResponse.results[0].incorrect_answers 
            var answers = incorrect.map(choice => (
              {
              title: choice,
              value: "Incorrect~ correct answer is "+correct
            }))
            answers.push({
              title: correct,
              value:"Correct!"
            })
            answers = {
              type: 'radio',
              keepIt: true,
              values: answers
            }    
            botReply(question, answers)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }


  function botReply (response, options) {
    let keyGenerator = '_' + Math.random().toString(36).substr(2, 9)
    var reply = {
        _id: keyGenerator,
        text: response,
        quickReplies: (options==undefined ||options=='')? // end of conversation
        {
          type: 'radio',
          keepIt: true,
          values: [{
            title: 'Ask another question?',
            quickReplies: {
              type: 'radio',
              keepIt: true,
              values: quickReplyTexts,
            }
          }],
        }  : options, // ongoing conversation
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Branda Bot',
          avatar: require("../assets/brandaLogo.jpg"),
        },
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, [reply]))
  }


  function onSend(messages) {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    var response = randomResponse[Math.floor(Math.random() * (randomResponse.length))] // random reply
    botReply(response, '')
  }


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
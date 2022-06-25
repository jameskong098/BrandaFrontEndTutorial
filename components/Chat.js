import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Day, } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native'
import { QuickReplies } from 'react-native-gifted-chat/lib/QuickReplies';
import { View,Text } from 'react-native';
import {quickReplies} from './quickReplies';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [lastTrivia, setLastTrivia] = useState(undefined)
  const randomResponse = ["Sorry, I'm not sure what you mean by that.", "I don't understand.", "I'm not sure what you mean.", "Sorry, come again?", "I'm perplexed by what you said, but I'm not sure what that means.", "Huh?", "Repeat please?", "Could you rephrase that?", "I'm not smart enough to answer this, sorry!"]
  
  const mainMessage = [
    {
      _id: -1,
      text: "Hello, I am Branda's chatbot. Here are some topics that you can ask me about. You can also type in the chat box for some responses.",
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        values: quickReplies
      },
      user: {
        _id: 0,
        name: 'Branda Bot',
        avatar: require("../assets/brandaLogo.jpg"),
      },
    },
  ]
  
  useEffect(() => {
    setMessages(mainMessage)
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    console.log(lastTrivia)
    if (lastTrivia != undefined) {
      if (lastTrivia.answer != '') {
        let userResponse = messages[0].text.toLowerCase()
        let answer = lastTrivia.answer.toLowerCase()
        if (userResponse.includes(answer)) {
          var response = "Correct! " + lastTrivia.answer + " is the answer!"
          botReply(response, answer, '')
          setLastTrivia(undefined)
        }
        else {
          var response = "Incorrect..." + lastTrivia.answer + " is the answer!"
          botReply(response, answer, '')
          setLastTrivia(undefined)
        }
      }
    }
    else {
      var response = randomResponse[Math.floor(Math.random() * (randomResponse.length))]
      botReply(response, '', '')
    }
  }, [])

  function botReply (response, answer, options) {
    let keyGenerator = '_' + Math.random().toString(36).substr(2, 9)
    let reply = {}
    if (options == '' || options == undefined) {
      reply = {
        _id: keyGenerator,
        text: response,
        quickReplies: {
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
        answer: answer,
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Branda Bot',
          avatar: require("../assets/brandaLogo.jpg"),
        },
      }
      if (answer != '') {
        setLastTrivia(reply)
      }
      console.log(lastTrivia)
    }
    else {
      reply = {
        _id: keyGenerator,
        text: response,
        quickReplies: options,
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

  function renderDay (props) {
    //Add the extra styles via containerStyle
   return <Day {...props} textStyle={styles.date} />
  }

  function renderQuickReplies (props) {
    //Add the extra styles via containerStyle
   return <QuickReplies {...props} quickReplyTextStyle={styles.quickReply} quickReplyStyle={styles.quickReplyBorder} />
  }

  function onQuickReply (quickReply) {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
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
    if (message == 'Random Trivia') {
        async function fetchRSS() {
          fetch("https://opentdb.com/api.php?amount=1")
            .then((response) => response.json())
            .then((textResponse) => {
              response = textResponse.results[0].question
              let answer = textResponse.results[0].correct_answer
              botReply(response, answer, '')
            })
            .catch((error) => {
              console.error(error);
            });
        }
        fetchRSS();
    }
    else {
      botReply(response, '', options)
    }
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
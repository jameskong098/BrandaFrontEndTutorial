import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Day, } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native'
import { QuickReplies } from 'react-native-gifted-chat/lib/QuickReplies';

export default function Example() {
  const [messages, setMessages] = useState([]);
  const [lastTrivia, setLastTrivia] = useState(undefined)
  const randomResponse = ["Sorry, I'm not sure what you mean by that.", "I don't understand.", "I'm not sure what you mean.", "Sorry, come again?", "I'm perplexed by what you said, but I'm not sure what that means.", "Huh?", "Repeat please?", "Could you rephrase that?", "I'm not smart enough to answer this, sorry!"]
  const quickReplies = [
    {
      title: 'Safety/Health Related Issues',
      value: 'Which issue would you like to ask about?',
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        values: [
          {
            title: 'Medical Emergency',
            value: 'For life-threatening emergencies, contact Brandeis University Public Safety (on campus) at 781-736-3333 or 911 (off campus). \n\nFor emergency consultations, contact 781-736-3730 during business hours or 781-736-3730 during after hours.',
          },
          {
            title: 'Domestic Abuse',
            value: 'Is the perpetrator also a member of the Brandeis community?',
            quickReplies: {
              type: 'radio', // or 'checkbox',
              keepIt: true,
              values: [
                {
                  title: 'Yes',
                  value: "Contact Brandeis University’s Office of Equal Opportunity (dating/domestic violence is considered a form of sexual misconduct under the University's policy) at (781-736-4806) or email them at oeo@brandeis.edu. \n\nFor more information, visit https://www.brandeis.edu/equal-opportunity/reporting/index.html"
                },
                {
                  title: 'No',
                  value: "File a report with Brandeis Public Safety (Emergency: 781-736-3333 or Non-Emergency: 781-736-5000) or with the police department of the local jurisdiction in which the violence occurred. There may be multiple jurisdictions in which the violence occurred; Waltham Police might be a good place to start, or the police where you live if you don't live near campus. Try to file your report in the jurisdiction where most of the violence has occurred, or the jurisdiction where the worst of the violence occurred. This can be in addition to filing a report with Brandeis or instead of filing a report with Brandeis."
                },
              ],
            },
          },
          {
            title: 'Mental Health',
            value: 'Need to talk? Samaritans listens. Call or text Samaritans’ 24/7 statewide helpline at 877-870-4673. Whatever the reason, you will get help from a trained volunteer offering non-judgmental support. Our Massachusetts-based crisis Helpline is confidential and free. Also keep an eye out for Brandeis events, as Brandeis hosts many wellness events and social gatherings throughout the semester. \n\nVisit https://www.brandeis.edu/events/ for more information.\n\nFor immediate concerns, contact Counseling Center staff by calling 781-736-3730 or text START to 741-741 or call 800-273-TALK (8255) to reach the Crisis Text Line, a culturally sensitive emergency resource.\n\nStay strong, you’re not alone in this fight!'
          },
        ],
      },
    },
    {
      title: 'Things to Do',
      value: '- Moody Street in Waltham is famous for its niche shops and collection of various cuisines. Find Italian, American, Greek, Indian, Mexican, seafood, kosher and vegan menus all tucked together in a cozy pedestrian friendly street.\n\n- Utilize Brandeis’s free shuttles service! Joseph’s Transportation goes to locations in Waltham and also in Boston/Cambridge. \n\n- For more information visit https://www.brandeis.edu/publicsafety/van-shuttle/index.html\n\n- Take the Fitchburg Line MBTA Commuter Rail at the Brandeis/Roberts stop located on the edge of the campus! The commuter rail takes you into North Station, Boston; or you can connect to the T at Porter Square. On hot days you can even take the Commuter Rail all the way to Gloucester and visit the area beaches!\n\n- Visit the Rose Art Museum located right on the Brandeis Campus. The museum has been dedicated to collecting and exhibiting modern and contemporary art at Brandeis University since 1961. The museum is free, and open to the public.'
    },
    {
      title: 'Frequently Asked Questions',
      value: "1. How do I find my Student ID?\n\nYour Student ID# can be found in your student profile in Workday.\n\n2. How do I find my mail box number?\n\nLog in to myHousing and navigate to home. Under your email and next to your profile picture should be your box number (Example: Box #: MB 1234).\n\n3. How do I register for two courses that have a conflicting recitation or overlapping course time?\n\nPlease submit a completed time conflict form (PDF) during the registration period. Both instructors must sign it. When you bring the form back to the registrar's office, we will manually add you to the course\n\nFor more information, visit https://www.brandeis.edu/registrar/faq.html"
    },
    {
      title: 'Random Trivia',
      value: ''
    },
  ]
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
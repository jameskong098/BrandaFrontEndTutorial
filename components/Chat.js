import { Chatbot } from "react-chatbot-kit";
import { View } from 'react-native'

import config from "../chatbot/config.js";
import MessageParser from "../chatbot/MessageParser.js";
import ActionProvider from "../chatbot/ActionProvider.js";

const Chat = () => {
  return (
    <View>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </View>
  );
};

export default Chat;
import {React} from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const AppInfo = require("../app.json").expo;

export default function About(){
  return(
    <View>
      <Text>About this app.</Text>
    </View>
  );
}
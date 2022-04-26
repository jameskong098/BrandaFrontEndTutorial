import {React} from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const AppInfo = require("../app.json").expo;

export default function About(){
  return(
    <View >
      <DataTable>
        <DataTable.Header>
         <DataTable.Title>Info</DataTable.Title>
         <DataTable.Title>Details</DataTable.Title>
        </DataTable.Header>
       <DataTable.Row>
        <DataTable.Cell>Splash Location</DataTable.Cell>
        <DataTable.Cell>{AppInfo.splash.image}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Version</DataTable.Cell>
        <DataTable.Cell>{JSON.stringify(AppInfo.version)}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Orientation</DataTable.Cell>
        <DataTable.Cell>{JSON.stringify(AppInfo.orientation)}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Android</DataTable.Cell>
        <DataTable.Cell>{JSON.stringify(AppInfo.android)}</DataTable.Cell>
      </DataTable.Row>
      </DataTable>
    </View>
  );
}
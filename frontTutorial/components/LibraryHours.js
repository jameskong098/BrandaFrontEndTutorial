import {React, useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import { useEffect } from 'react/cjs/react.development';


const AppInfo = require("../app.json").expo;

export default function LibraryHours(){
    const [LibraryHours, setToHours] = useState("");
    useEffect(() => {
        async function fetchRSS() {
          fetch("http://brandaserver.herokuapp.com/getinfo/libraryHours/week")
            .then((response) => response.json())
            .then((textResponse) => {
              setToHours(textResponse)
            })
            .catch((error) => {
              console.error(error);
            });
        }
        fetchRSS();
      }, []);
    //let today = new Date().toISOString().slice(0, 10)
    
   
  return(
    <View>
    <Text>{JSON.stringify(LibraryHours)}</Text>
    </View>
  );
}


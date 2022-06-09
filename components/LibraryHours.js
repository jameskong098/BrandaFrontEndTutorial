import {React, useState} from "react";
import { StyleSheet, View, FlatList } from "react-native";
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
    
  function renderHours(item) {
      return (
        <View style={{alignItems:'center'}}>
         <Text style={{fontSize:50}}>
           {item.day}:
           </Text>
         <Text style={{fontSize:15}}>
           {item.hours[0].location}: {item.hours[0].times.hours[0].from} to {item.hours[0].times.hours[0].to}{'\n'}
          </Text>
          <Text style={{fontSize:15}}>
           {item.hours[1].location}: {item.hours[1].times.status}{'\n'}
          </Text>
          <Text style={{fontSize:15}}>
           {item.hours[2].location}: {item.hours[2].times.status}{'\n'}
          </Text>
          <Text style={{fontSize:15}}>
           {item.hours[3].location}: {item.hours[3].times.status}{'\n'}
          </Text>
          <Text style={{fontSize:15}}>
           {item.hours[4].location}: {item.hours[4].times.status}{'\n'}
          </Text>
        </View>
      )
    }  
   
  return(
    <View>
    <View> 
        <FlatList
          data={LibraryHours}
          renderItem={({item}) => renderHours(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
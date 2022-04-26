import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import About from './components/About.js'
import ItemDetail from './components/ItemDetail.js'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'

Root = createNativeStackNavigator();

function Home() {
  const [num, setNum] = useState(0);
  return(
    <View style={styles.basic}>
      <Text style={{fontSize:30}}>Welcome to my app!</Text>
      <Text>Num is {num}</Text>
      <View style={styles.spaceButtons}>
        <Button mode={"contained"} onPress={() => setNum(num + 1 )}>
          Increase num by 1.
        </Button>
        <Button mode={"contained"} onPress={() => setNum(num - 1 )}>
          Decrease num by 1.
        </Button> 
        <Button mode={"contained"} onPress={() => setNum(0)}>
          Reset num
        </Button>
        <Button mode={"contained"} onPress={() => setNum(num + 5)}>
          Increase num by 5
        </Button>
      </View>
    </View>
  );
}

function pressAbout() {
  const navigation = useNavigation()
  return (
      <TouchableOpacity onPress={() => navigation.navigate('About') }> 
        <View style={{letterSpacing: 2}}>
          <View style={styles.about}>
            <Text style={{fontSize:18}}>About</Text>
            <Ionicons name="ios-information-circle" size={24} color="black" />
          </View>
        </View>
        
      </TouchableOpacity>
  );
}

export default function App() {
      return (
        <PaperProvider>
          <NavigationContainer>
            <Root.Navigator initialRouteName="Home">
              <Root.Screen 
                name={"Home"} 
                component={Home}
                options={{
                  headerRight: () => (
                    pressAbout()
                  ),
                }}
              />
              <Root.Screen name={"About"} component={About}/>
              <Root.Screen name={"Item Detail"} component={ItemDetail}/>
            </Root.Navigator>
          </NavigationContainer>
        </PaperProvider>
      );
}

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  about: {
    flexDirection:'row',
    alignItems: 'center',
  },

  spaceButtons: {
    flex: 0.3,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'space-evenly'
  }
});

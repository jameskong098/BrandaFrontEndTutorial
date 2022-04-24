import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from './components/About.js'
import ItemDetail from './components/ItemDetail.js'

Root = createNativeStackNavigator();

export default function App() {
      return (
        <PaperProvider>
          <NavigationContainer>
            <Root.Navigator>
              <Root.Screen name={"About"} component={About}/>
              <Root.Screen name={"Item Detail"} component={ItemDetail}/>
            </Root.Navigator>
            <View style={styles.container}>
              <Text>Open up App.js to start working on your app!</Text>
              <StatusBar style="auto" />
            </View>
          </NavigationContainer>
        </PaperProvider>
      );
 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

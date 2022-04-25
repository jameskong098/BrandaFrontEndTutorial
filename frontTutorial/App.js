import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import About from './components/About.js'
import ItemDetail from './components/ItemDetail.js'
import Home from './components/Home.js'

Root = createNativeStackNavigator();

export default function App({ navigation }) {
      return (
        <PaperProvider>
          <NavigationContainer>
            <Root.Navigator>
              <Root.Screen 
                name={"Home"} 
                component={Home}
                options={{
                  headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('About') }> 
                      <View style={styles.container}>
                        <Text>About</Text>
                      </View>
                      <Ionicons name="ios-information-circle" size={24} color="black" />
                    </TouchableOpacity>
                  ),
                }}
              />
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

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Item Details"
        onPress={() => navigation.navigate('Item Detail')}
      />
    </View>
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

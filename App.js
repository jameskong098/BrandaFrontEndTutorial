import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, } from 'react-native';
import { Provider as PaperProvider, Button, Card, Checkbox, black} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import About from './components/About.js'
import LibraryHours from './components/LibraryHours.js'
import ItemDetail from './components/ItemDetail.js'
import Chat from './components/Chat.js'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
import todo from './todo.json'
import moment from 'moment';

Root = createNativeStackNavigator();

function Home() {
  const [num, setNum] = useState(0);
  const [todoList, setToDo] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    setToDo(todo.todo)
  },);
  
  function renderToDo(item) {
    const NewCheckBox= () => {
      const [checked, setChecked] = useState(item.done);
      return (
        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
            markItemDone(todoList.indexOf(item))
          }}
        />
      );
    };
    return (
      <View style={styles.checkBoxes}>
       <Text>{item.name}  |  Due:  {moment(item.due).format('MMMM Do YYYY')}</Text>
       <NewCheckBox>
       </NewCheckBox>
      </View>
    )
  }
  
  function markItemDone(index){
    //console.log(index)
    //console.log(todoList)
    let todoCopy = todoList;
    todoCopy[index].done = !todoCopy[index].done;
    setToDo(todoCopy);
  }

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
        <Button mode={"contained"} onPress={() => setToDo(todo.todo)}>
          Show completed tasks
        </Button>
        <Button mode={"contained"} onPress={() => setToDo(todoList.filter(todo => todo.done == false))}>
          Hide completed tasks
        </Button>
      </View>
      <Text>To-Do List:</Text>
      <View style={styles.spaceList}> 
        <FlatList
          data={todoList}
          renderItem={({item}) => renderToDo(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles.chatButton}>
        <Ionicons name="ios-chatbox-ellipses-sharp" size={35} color = "white"/>
      </TouchableOpacity>
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

function pressLibraryHours() {
  const navigation = useNavigation()
  return (
      <TouchableOpacity onPress={() => navigation.navigate('LibraryHours') }> 
        <View style={{letterSpacing: 2}}>
          <View style={styles.about}>
            <Text style={{fontSize:18}}>Library Hours</Text>
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
                  headerLeft: () => (
                    pressLibraryHours()
                  ),
                }}
              />
              <Root.Screen name={"About"} component={About}/>
              <Root.Screen name={"LibraryHours"} component={LibraryHours}/>
              <Root.Screen name={"Chat"} component={Chat}/>
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
    flex: 0.5,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'space-evenly'
  },

  spaceList: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'space-evenly',
    zIndex: 1
  },

  checkBoxes: {
    flexDirection:'row',
    alignItems:'center'
  }, 

  chatButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgb(86,113,234)',
    position: "absolute",
    bottom: 0,
    left: 330,
    right: 0,
    top: 720,
    zIndex: 5,
  },

});

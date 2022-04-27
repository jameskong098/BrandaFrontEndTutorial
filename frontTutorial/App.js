import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList, } from 'react-native';
import { Provider as PaperProvider, Button, Card, Checkbox, black} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import About from './components/About.js'
import LibraryHours from './components/LibraryHours.js'
import ItemDetail from './components/ItemDetail.js'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
import todo from './todo.json'
import moment from 'moment';

Root = createNativeStackNavigator();

function renderToDo(item, index, todoList) {
  const NewCheckBox= (item, index) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
          //markItemDone(index, todoList)
        }}
      />
    );
  };
  return (
    <View style={styles.checkBoxes}>
     <Text>Task: {item.name}  |  Due:  {moment(item.due).format('MMMM Do YYYY')}</Text>
     <NewCheckBox>
     </NewCheckBox>
    </View>
  )
}

function markItemDone(index, todoList){
  //console.log(index)
  //console.log(todoList)
  let todoCopy = todoList;
  todoCopy[index].done = !todoCopy[index].done;
  setTodoData(todoCopy);
}

function Home() {
  const [num, setNum] = useState(0);
  const [todoList, setToDo] = useState("");
  useEffect(() => {
    setToDo(todo.todo)
  },);
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
      <Text>To-Do List:</Text>
      <View style={styles.spaceList}> 
        <FlatList
          data={todoList}
          renderItem={({item, index}) => renderToDo(item, index, todoList)}
          keyExtractor={(item, index) => index.toString()}
        />
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
                  )
                }}
              />
              <Root.Screen name={"About"} component={About}/>
              <Root.Screen name={"LibraryHours"} component={LibraryHours}/>
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
    justifyContent: 'space-evenly'
  },

  checkBoxes: {
    flexDirection:'row',
    alignItems:'center'
  }
});

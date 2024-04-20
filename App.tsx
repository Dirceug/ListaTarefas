import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';

const COLORS = {
  primary: '#1f145c',
  white: '#fff',
  laranja: '#FFA500',
  verde: '#CCFF33',
};

function App(): React.JSX.Element {
  const [textInput, setTextInput] = React.useState('')
  const [todos, setTodos] = React.useState([

  ]);

  React.useEffect(() => {
    getTodosFromUserDevice()
  }, [])

  React.useEffect(() => {
    saveTodoToUserDevice(todos)
  }, [todos] )


  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.item}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editIcon} onPress={() => deleteDoto(todo?.id) } >
          <FontAwesomeIcon icon={faPenToSquare} color={COLORS.white} size={15} />
        </TouchableOpacity>
        {
          !todo?.completed && (
            <TouchableOpacity style={styles.checkIcon} onPress={()=> markTodoComplete(todo?.id)} >
              <FontAwesomeIcon icon={faCheck} color={COLORS.white} size={15} />
            </TouchableOpacity>
          )
        }
        <TouchableOpacity
          style={styles.deleteIcon} onPress={() => deleteDoto(todo?.id) } >
          <FontAwesomeIcon icon={faTrashCan} color={COLORS.white} size={15} />
        </TouchableOpacity>
      </View>
    );
  };

  const saveTodoToUserDevice = async todos => {
    try {
      const stringfyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringfyTodos);
    } catch (e) {
      console.log(e)
    }
  }

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if(todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = () => {
    if(textInput == '') {
      console.log("Adicione uma tareda")
    } else {

      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo])
      setTextInput('')
    }
  }

  const markTodoComplete = (todoId) => {
    console.log(todoId);
    const newTodos = todos.map((item) => {
      if(item.id === todoId) {
        return{...item, completed: true}
      }
      return item;
    })
    setTodos(newTodos);
  }

  const deleteDoto = (todoId) => {
    const newTodos = todos.filter(item => item.id != todoId)
    setTodos(newTodos)
  }

  const clearTodos = () => {
    Alert.alert('Confirma', "Deseja realmente pagar todos?", [{
      text: "Sim", 
      onPress: () => setTodos([])
    },
    {
      text: "Não"
    }
  ])
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: COLORS.primary}}>
          TODO APP
        </Text>
        <TouchableOpacity onPress={clearTodos} >
        <View>
        <FontAwesomeIcon icon={faTrashCan} size={30} color="#ff0000"/>
        </View>
        </TouchableOpacity>
      </View>
      <FlatList
        showVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={todos}
        renderItem={({item}) => <ListItem todo={item} />}
      />
      
      <View></View>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Adiconar Tarefa" 
            value={textInput}
            onChangeText={(text)=>setTextInput(text)} 

          />
        </View>
        <TouchableOpacity onPress={addTodo} >
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faPlus} color={COLORS.white} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.laranja,
  },
  listItem: {
    padding: 25,
    backgoundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 7,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  item:{
    flex: 1, 
    // alignItems: 'center'
    // backgroundColor: COLORS.laranja
  },
  checkIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 5,
  },
  deleteIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 5,
  },
  editIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.laranja,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

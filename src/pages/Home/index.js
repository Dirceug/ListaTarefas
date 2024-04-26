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
import * as Animatable from 'react-native-animatable';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';

import { useNavigation } from '@react-navigation/native'

const COLORS = {
  primary: '#1f145c',
  white: '#fff',
  laranja: '#FFA500',
  verde: '#CCFF33',
};

const colors = [
  '#ffffff',
  '#f3f0c6',
  '#77dd77',
  '#fdcae1',
  '#ff6961',
  '#c5c6c8',
];

function Home(): React.JSX.Element {
  const [textInput, setTextInput] = React.useState('')
  const [todos, setTodos] = React.useState([

  ]);
  const [tarefaSelecionada, setTarefaSelecionada] = React.useState([

  ]);

  const navigation = useNavigation();

  React.useEffect(() => {
    getTodosFromUserDevice()
    console.log(todos)
  }, [])

  React.useEffect(() => {
    saveTodoToUserDevice(todos)
  }, [todos] )


  const ListItem = ({todo}) => {
    return (
      <Animatable.View 
        style={[styles.listItem,  { backgroundColor: todo?.color }]}
        animation="fadeInRight"
        // delay={500}
      >
        <View style={styles.item}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editIcon} 
          onPress={() => editDoto(todo?.id) } 
        >
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
      </Animatable.View>
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

  const saveTarefaSelecionada = async tarefaSelecionada => {
    if (tarefaSelecionada){
      try {
        const stringfyTarefas = JSON.stringify(tarefaSelecionada);
        await AsyncStorage.setItem('selecionada', stringfyTarefas);
        console.log(tarefaSelecionada)
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log('Não há tarefa selecionada ainda')
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
      Alert.alert("Adicione um Título")
    } else {

      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
        description: "",
        color: ""
      };
      setTodos([...todos, newTodo])
      setTextInput('')
    }
  }

  const markTodoComplete = (todoId) => {
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

  const editDoto = async (todoId) => {
    const tarefaSelecionada = todos.filter(item => item.id == todoId )[0]
    setTarefaSelecionada(tarefaSelecionada)
    try{
      await saveTarefaSelecionada(tarefaSelecionada)
      console.log("Tarefa selecionada2" + tarefaSelecionada.task)
      console.log("todos")
      console.log(todos)
      navigation.navigate('Editar', {tarefaSelecionada})
    } catch(e){
      console.log(e)
    }
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
      <Animatable.View 
        style={styles.header}
        animation="fadeInLeft"
        // delay={500}
      >
        <Text style={{fontWeight: 'bold', fontSize: 30, color: COLORS.primary}}>
          TODO APP
        </Text>
        <TouchableOpacity onPress={clearTodos} >
        <View>
        <FontAwesomeIcon icon={faTrashCan} size={30} color="#ff0000"/>
        </View>
        </TouchableOpacity>
      </Animatable.View>
      <FlatList
        showVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={todos}
        renderItem={({item}) => <ListItem todo={item} />}
      />
      
      <View style={styles.footer}>
        {/* <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Adiconar Tarefa" 
            value={textInput}
            onChangeText={(text)=>setTextInput(text)} 

          />
        </View> */}
        <TouchableOpacity onPress={ () => navigation.navigate('Criar')} >
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
    marginRight: 20,
    // borderRadius: 30,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Home;

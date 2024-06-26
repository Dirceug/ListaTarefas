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

export default function Detalhes() {
  const [textInput, setTextInput] = React.useState('')
  const [todos, setTodos] = React.useState([

  ]);

  const [tarefaSelecionada, setTarefaSelecionada] = React.useState([

  ]);

  const navigation = useNavigation();

  React.useEffect(() => {
    selecinada()
  }, [])

  React.useEffect(() => {
    const getTarefaSelecionada = async () => {
      try {
        const tarefaSelecionadaString = await AsyncStorage.getItem('selecionada');
        if (tarefaSelecionadaString !== null) {
          const tarefaSelecionada = JSON.parse(tarefaSelecionadaString);
          setTarefaSelecionada(tarefaSelecionada);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTarefaSelecionada();
  }, []);
  

  const ListItem = ({todo}) => {
    return (
      <Animatable.View 
        style={styles.listItem}
        animation="fadeInRight"
        // delay={500}
      >
        <View style={styles.item}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
           {selecionada}liyffx
           {todos.id}
           {todos}
          </Text>
        </View>
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

  const addDescricao = () => {
    console.log(tarefaselecionada)
    if(textInput == '') {
      Alert.alert("Adicione uma descrição")
    } else if (todos.length > 0 ){
        const updateTarefaSelecionada = {...tarefaSelecionada, description: textInput}
        const updateTodos = todos.map((todo) => {
            if(todo.id === tarefaselecionada.id) {
                return updateTarefaSelecionada
            }
            return todo
        })
      setTodos(updateTodos)
      setTextInput('')
      console.log(updateTodos)
    } else {
        console.log('Nenhuma tarefa encontrada')
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

  const editDoto = (todoId) => {
    const newTodos = todos.filter(item => item.id != todoId)
    setTodos(newTodos)
    console.log(newTodos)
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

  const selecinada = async () => {
    try {
      const todos = await AsyncStorage.getItem('selecionada');
      if(todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Animatable.View 
        style={styles.header}
        animation="fadeInLeft"
      >
        <Text style={{fontWeight: 'bold', fontSize: 30, color: COLORS.primary}}>
          Detalhes
        </Text>

      </Animatable.View>
        <Animatable.View 
            style={styles.listItem}
            animation="fadeInRight"
            // delay={500}
        >
        <View style={styles.item}>
            <Text
                style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: COLORS.primary,
                }}>klylkjf
                    {tarefaSelecionada}
            </Text>
            {/* <Text>{props.route.params.description}lyf</Text> */}
            <Text>{tarefaSelecionada.task}</Text>
            <Text>{tarefaSelecionada}</Text>
        </View>
        {
          (
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
      
      <View></View>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Adiconar Descrição" 
            value={textInput}
            onChangeText={(text)=>setTextInput(text)} 

          />
        </View>
        <TouchableOpacity onPress={addDescricao} >
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

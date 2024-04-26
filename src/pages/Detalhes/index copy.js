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

  const [textInput, setTextInput] = React.useState('')
  const [todos, setTodos] = React.useState([
  ]);

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
            {todo?.task}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editIcon} 
          // onPress={() => editDoto(todo?.id) } 
          onPress={ () => navigation.navigate('Detalhes')}
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

  const addDescription = () => {
    if(textInput == '') {
      Alert.alert("Adicone uma descrição!")
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

export default function Detalhes(props) {

    return (
        <View>
            <Text>Lista de tarefas detalhada</Text>
            <Text>{props.route.params.id}</Text>
            <Text>{props.route.params.title}</Text>
            <Text>{props.route.params.completed}</Text>
            <Text>{props.route.params.description}</Text>
            <Text>{props.route.params.color}</Text>
            <Animatable.View 
                style={styles.listItem}
                animation="fadeInRight"
                // delay={500}
            >
                <View style={styles.item}>
                <Text
                    style={{
                    fontWeight: 'bold',
                    fontSize: 24,
                    color: COLORS.primary,
                    //   textDecorationLine: todo?.completed ? 'line-through' : 'none',
                    }}>
                    {props.route.params.title}
                </Text>
                <Text
                    style={{
                    fontSize: 18,
                    color: COLORS.primary,
                    //   textDecorationLine: todo?.completed ? 'line-through' : 'none',
                    }}>
                    {props.route.params.description}
                </Text>
                <TextInput 
                    placeholder="Adiconar Tarefa" 
                    value={props.route.params.description}
                    onChangeText={(text)=>setTextInput(text)} 
                />
            </View>
            </Animatable.View>    
        </View>
    )
    
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
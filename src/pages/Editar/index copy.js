import React from 'react'
import type {PropsWithChildren} from 'react';

import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    StatusBar,
    useColorScheme, 
    TextInput,
    Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native'

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';

import RBSheet from 'react-native-raw-bottom-sheet';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const colors = [
    '#ffffff',
    '#f3f0c6',
    '#77dd77',
    '#fdcae1',
    '#ff6961',
    '#c5c6c8',
];

const COLORS = {
    primary: '#1f145c',
    white: '#fff',
    laranja: '#FFA500',
    verde: '#CCFF33',
  };
  

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;


export default function Editar(){
const [textInput, setTextInput] = React.useState('')
const [descriptionInput, setDescriptionInput] = React.useState('')
const [todos, setTodos] = React.useState([
]);    

const navigation = useNavigation();

const [ value, setValue] = React.useState(0);
const sheet = React.useRef()
React.useEffect(() => {
    sheet.current.close()
}, [] )

React.useEffect(() => {
    getTodosFromUserDevice()
  }, [])

React.useEffect(() => {
    saveTodoToUserDevice(todos)
}, [todos] )


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
  Alert.alert("Adicione um Título")
} else {
  const newTodo = {
    id: Math.random(),
    task: textInput,
    completed: false,
    description: descriptionInput,
    color: colors[value]
  };
  setTodos([...todos, newTodo])
  setTextInput('')
  setDescriptionInput('')
  navigation.navigate('Home')
  console.log(newTodo)
}
}

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.placeholder} >
            {/* <View style={[styles.profile,{backgroundColor: colors[value]}]}> */}
                <View style={[styles.placeholderInset, {backgroundColor: colors[value]}]} >
                <View style={styles.inputContainer}>
                    <View  style={styles.decoration}>
                    <Text style={styles.text} >
                        Título da tarefa:
                    </Text>
                    <TextInput
                    placeholder="Título" 
                    value={textInput}
                    onChangeText={(text)=>setTextInput(text)} 
                    // inputMode="text"
                    />
                    </View>
                    <View  style={styles.decoration}>
                    <Text style={styles.text} >
                        Título da tarefa:
                    </Text>
                    <TextInput
                    placeholder="Descrição" 
                    value={descriptionInput}
                    onChangeText={(text)=>setDescriptionInput(text)} 
                    multiline={true}
                    numberOfLines={5}
                    />
                    </View>
                    </View>
                    <View style={[styles.btnSelect2, {backgroundColor: colors[value]}]} >
                    <TouchableOpacity
                        onPress={() => sheet.current.open()}
                    >
                        <Text style={styles.btnText2}>
                            Troque a cor da sua tarefa
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.btnSelect} >
                    <TouchableOpacity
                        style={styles.selectColor}
                        onPress={addTodo}
                    >
                        <Text style={styles.btnText2}>
                            Salvar
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <RBSheet
                ref={sheet}
                height={400}
                openDuration={500}
                closeDuration={500}
                customStyles={{ container: styles.sheet}}
            >
                <View style={styles.sheetHeader} >
                    <Text style={styles.sheetHeaderTitle} >
                        Selecione a sua cor da sua tarefa
                    </Text>
                </View>
                <View style={styles.sheetBody} >
                    {/* <TouchableOpacity onPress={()=> {
                    }} > */}
                    <View style={[styles.profile,{backgroundColor: colors[value]}]}>
                        <Text style={styles.profileText}  >Texto</Text>
                    </View>
                    {/* </TouchableOpacity> */}
                </View>
                <View style={styles.center} >
                <View style={styles.group} >
                    {colors.map((color, index) => {
                        const isActive = value === index;
                        return (
                            <View>

                                <View key={color}>
                                    <TouchableWithoutFeedback onPress={() => {
                                        setValue(index);
                                    }} >
                                        <View style={[
                                            styles.circle, 
                                            isActive && {borderColor: color} 
                                        ]} >
                                            <View style={[
                                                styles.circleInside, 
                                                {backgroundColor: color}, 
                                            ]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            )
                    })}
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    sheet.current.close()
                }}  >
                    <Text style={styles.btnText}>Confirmar</Text>
                </TouchableOpacity>
                </View>
            </RBSheet>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    sheet: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        justifyContent: 'center',
    },
    placehoder: {
        // flex: 1,
        margin: 0, 
        padding: 24,
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        // borderStyle: 'dashed',
        // flex: 1,
        borderRadius: 25,
        padding: 15,
        margin: 10,
    }, 
    sheetHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        paddingHorizontal: 24,
        paddingVertical: 14,
        
    }, 
    sheetHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000'
    }, sheetBody: {
        padding: 24,
        alignItems: 'center',
    },
    profile: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 999,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shwdowRadius: 4.65,
        elevation: 7,
    },
    profileText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    group: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    circle: {
        width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        backgroundColor: '#f1f1f1',
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 12,
        borderWidth: CIRCLE_RING_SIZE,
        borderColor: 'transparent',
    },
    circleInside: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: 9999,
        position: 'absolute',
        top: CIRCLE_RING_SIZE,
        left: CIRCLE_RING_SIZE
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#000',
        width: '80%',

    },
    btnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    center:{
        alignItems: 'center',
        justifyContent: 'center',
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
      container: {
        flex: 1,
        backgroundColor: '#FFA500'
      },
      containerForm: {
        flex: 1,
        // borderColor: 'black',
        // borderWidth: 3,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
        paddingStart: '5%',
        paddingEnd: '5%'
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        fontColor: '#000000',
        marginTop: 5
    },
    decoration: {
        // backgroundColor: '#555555',
        paddingStart: 10,
        borderRadius: 25,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
        borderLeftWidth: 1,
        borderLeftColor: '#555555',
        borderRightWidth: 1,
        borderRightColor: '#555555',
        margin: 5,
      },
      btnSelect: {
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 15,
        marginTop: 50,
        borderColor: COLORS.laranja,
        backgroundColor: '#FFA500',
        borderRadius: 15,
      },
      btnSelect2: {
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 15,
        marginTop: 50,
        // borderColor: COLORS.laranja,
        // backgroundColor: '#FFA500',
        borderRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
        borderLeftWidth: 1,
        borderLeftColor: '#555555',
        borderRightWidth: 1,
        borderRightColor: '#555555',
      },
      btnText2: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 15,
      },
});
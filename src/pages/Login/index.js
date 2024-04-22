import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { bounce } from './../../../node_modules/react-native-animatable/definitions/attention-seekers';

import { useNavigation } from '@react-navigation/native'

export default function Login() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={styles.containerForm}
      >
        <Text style={styles.title} >E-mail: </Text>
        <TextInput placeholder="Digite um e-mail:" style={styles.input} />
        <Text style={styles.title} >Senha: </Text>
        <TextInput placeholder="Digite um e-mail:" style={styles.input} />
        <TouchableOpacity 
            style={styles.button} 
            onPress={ () => navigation.navigate('Home')}
        >
            <Text style={styles.buttonText} >Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister} >
            <Text style={styles.buttonRegisterText} >Cadastrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom:12,
    // fonstSize: 16,
  },
  button: {
    backgroundColor: '#FFA500',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
    // backgroundColor: '#FFA500',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegisterText: {
    color: '#a1a1a1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

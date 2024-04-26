import {createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Detalhes from '../pages/Detalhes'
import Criar from '../pages/Criar'
import Editar from '../pages/Editar'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Login"
                component={Login}
            />
            <Stack.Screen 
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Detalhes"
                component={Detalhes}
            />
            <Stack.Screen 
                name="Criar"
                component={Criar}
                // options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Editar"
                component={Editar}
                // options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
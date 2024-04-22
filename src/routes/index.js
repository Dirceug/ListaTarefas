import {createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Detalhes from '../pages/Detalhes'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return(
        <Stack.Navigator>
            {/* <Stack.Screen 
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Login"
                component={Login}
            /> */}
            <Stack.Screen 
                name="Home"
                component={Home}
            />
            <Stack.Screen 
                name="Detalhes"
                component={Detalhes}
            />
        </Stack.Navigator>
    )
}
//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Forget from './screens/Forget';
import Home from './screens/Home';
import Users from './screens/User';
import Maps from './screens/Maps';

//import firebase from '../config/firebase'


const Stack = createNativeStackNavigator();

 function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="User" component={Users} />
        <Stack.Screen name="Maps" component={Maps} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text,Button, Image,TextInput,StyleSheet, ActivityIndicator } from 'react-native';

import TouchableText from '../src/components/TouchableText';
//import Button from '../src/components/Button';


 import firebase from '../config/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Device from 'expo-device';
//import * as Notifications from 'expo-notifications';


function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid ] = useState(false)
  const [isEmailValid, setIsEmailValid ] = useState(false)
  const [loading, setLoading] =useState(false)

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  /*async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }*/

   useEffect(() => {
        if (password.length > 4){
          setIsPasswordValid(true)
        } else {
          setIsPasswordValid(false)
        }
        if(email.includes('.com') && email.includes('@')){
          setIsEmailValid(true)
        }else{
          setIsEmailValid(false)
        }

       /* registerForPushNotificationsAsync().then(token =>{
           setExpoPushToken(token)
           console.log(token)
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
          alert(notification)
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
          console.log(error)
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        }; */

   }, [password, email])

   const onLoginPressed= () => {
    const auth = getAuth()
    if(email.length && password.length){
      setLoading (true)}
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // .then call when function successfuly done e.g Signed in 
      const user = userCredential.user;
      alert('Loggedin Successfully')
      setLoading (false)
     props.navigation.navigate('User')
    })
        // .catch call when error occured 
  
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      setLoading (false)
    });
   }
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>
        Digi App</Text>
        <Image 
        style={styles.image}
        resizeMode= {'contain'}
      source={require('../assets/favicon.png')}
      />
        <TextInput 
      placeholder='Enter Email'
      value={email}
      style = { styles.TextInput}
      onChangeText={(t) => {setEmail(t)}}     
      />
      {!isEmailValid?
      <Text style ={{color: 'red'}}> Invalid email </Text>
      : null}
      <TextInput 
       placeholder='Enter Password'
       value={password}
        style = {styles.TextInput}
        secureTextEntry= {true}
        keyboardType= {'default'}
      onChangeText={(t) => {setPassword(t)}}     
      />
      {!isPasswordValid?
      <Text style ={{color: 'red'}}> Password length shuold be greater then 4.. </Text>
      : null}

      <TouchableText 
       onPress= {() => props.navigation.navigate('Forget')}
      text= {'Forget Password?'}
      style = {{alignSelf: 'flex-end',fontWeight:'bold', marginRight: 20, marginTop: 20}}
      textStyle = {{color: 'black'}}
      />
      {loading ? <ActivityIndicator color ={'blue'}/>:null}
      <Button 
          title='Login'
         // onPress={() => {navigation.navigate(Signup)}}
          onPress={() => {onLoginPressed()}}
      /> 
    
      
      <TouchableText 
      onPress = {()=> props.navigation.navigate('Signup')}
      text= {'Have not account, Register Now'}
      style = {{ alignSelf: 'center', marginTop: 20}}
      textStyle = {{color: 'black'}}
      />

     <TouchableText 
      onPress = {()=> props.navigation.navigate('Maps')}
      text= {'Go to Maps'}
      style = {{ alignSelf: 'center', marginTop: 20}}
      textStyle = {{color: 'orange'}}
      />

      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Text:{
      fontWeight:'bold',
      fontSize: 40, 
      color: 'black',
       margin: 10,
      },
      image:{
        height: 80, 
        width: 80,
         margin:10
        },
        TextInput:{
          width: 250,
          height:40,
          borderWidth:1,
          borderRadius: 10,
          margin:10}
    
  })

  export default Login
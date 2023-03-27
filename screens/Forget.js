import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text,Button, Image,TextInput,StyleSheet, ActivityIndicator } from 'react-native';
import TouchableText from '../src/components/TouchableText';

//import Button from '../src/components/Button';
 import firebase from '../config/firebase'
import {getAuth, sendPasswordResetEmail } from 'firebase/auth';


function Forget(props) {
  const Loading = () => <ActivityIndicator
  //style= {[styles.container, styles.loading]}
  color = "blue"
  size = "large"
  />
  const [email, setEmail] = useState('')
  //const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid ] = useState(false)
  

   useEffect(() => {
        if(email.includes('.com') && email.includes('@')){
          setIsEmailValid(true)
        }else{
          setIsEmailValid(false)
        }
   }, [email] )
   const onRestorePressed = ()=>{
    const auth = getAuth()
    sendPasswordResetEmail(auth, email)
    .then(user => {
      alert('Password send to your email account.')
    })
    .catch((error) => {
          alert('error.message')
    })
   }
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>
        Restore Password</Text>
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
   
    <Button
          title='Restore Password'
          onPress={() => {onRestorePressed()}}
      />
      <TouchableText 
      onPress={() => props.navigation.goBack()}
      text= {'Already register, Login'}
      style = {{ alignSelf: 'center', marginTop: 20}}
      textStyle = {{color: 'black'}}
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
          margin: 10,
          }
    
  })
  export default Forget
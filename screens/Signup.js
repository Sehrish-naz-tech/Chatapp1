import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text,Button, Image,TextInput,StyleSheet,ActivityIndicator } from 'react-native';
//import { TouchableOpacity } from 'react-native-web';
import TouchableText from '../src/components/TouchableText';
import firebase from '../config/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setDoc, doc, getFirestore } from "firebase/firestore";
//import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { async } from '@firebase/util';
import * as Location from 'expo-location';




function Signup(props) {
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid ] = useState(false)
  const [isEmailValid, setIsEmailValid ] = useState(false)
  const [loading, setLoading] =useState(false)
  const [location, setLocation] = useState(null);

  const db = getFirestore(firebase)
  
  const loadlocation = async ()=>{
    let location= await Location.getCurrentPositionAsync({})
    try {
      setLocation(location);
    } catch (error) 
    {
      console.log(error)
    }
      } ;
 
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

       loadlocation()
   }, [password, email])
   const Loading = () => <ActivityIndicator
  //style= {[styles.container, styles.loading]}
  color = "blue"
  size = "large"
  />

   const onSignupPressed= () =>{
    const auth = getAuth()
    if (firstName.length,lastName.length,age.length,address.length,password.length && email.length){
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    setLoading(false)
    await setDoc(doc(db,"Users", email), { 
        firstName,
        lastName,
        age,
        address,
        location,
    })
    // .then call when function successfuly done e.g Signed in 
    const user = userCredential.user;
    alert('Registered Successfully')
  })
      // .catch call when error occured 

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('error')
    console.log(error)

  }); 
  } else {
    alert('enter all fields')
  }
   }

    return (
      <View style={styles.container}>
        <Text style={styles.Text}>
        Signup</Text>
        <Image 
        style={styles.image}
        resizeMode= {'contain'}
      source={require('../assets/favicon.png')}
      />
      <TextInput 
      placeholder='FirstName*'
      value={firstName}
      style = { styles.TextInput}
      onChangeText={(t) => {setFirstName(t)}}     
      />
       <TextInput 
      placeholder='LastName*'
      value={lastName}
      style = { styles.TextInput}
      onChangeText={(t) => {setLastName(t)}}     
      />
      <TextInput 
      placeholder='Age*'
      value={age}
      style = { styles.TextInput}
      onChangeText={(t) => {setAge(t)}}     
      />
        <TextInput 
      placeholder='Address*'
      value={address}
      style = { styles.TextInput}
      onChangeText={(t) => {setAddress(t)}}     
      />
        <TextInput 
      placeholder='Enter Email*'
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

      <Button
          title='Register'
          style = {styles.Button}
          onPress={() => {onSignupPressed()}}
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
        Button:{
          height: 40, 
          width: 40,
           marginTop:10
          },
        TextInput:{
          width: 250,
          height:40,
          borderWidth:1,
          borderRadius: 10,
          margin:10}
    
  })
  export default Signup
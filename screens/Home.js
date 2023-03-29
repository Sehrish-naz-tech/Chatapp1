import { getAuth } from 'firebase/auth';
import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Button, Image, TextInput,StyleSheet, FlatList,} from 'react-native';
import { TouchableOpacity } from 'react-native';
import firebase from '../config/firebase';
import { addDoc, collection, getFirestore, serverTimestamp, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { async } from '@firebase/util';

const Home = (props) => { 

  const [msg, setMessage] = useState(null)
  const [data, setData] = useState([])

  const db = getFirestore(firebase)
  const {collectionName}= props.route.params
  const auth = getAuth()
   let unsubscribe
  const loadData = async () => {
    const q = query(collection(db, collectionName), orderBy("time", "asc"));
     unsubscribe = onSnapshot(q, (querySnapshot) => {
      let chat = [];
      querySnapshot.forEach((doc) => {
        chat.push(doc.data());
        //console.log(doc.data())
       });
       setData(chat)
      //console.log(chat)
      //console.log(collectionName)
    });
    
   return unsubscribe
  };
  useEffect(() => {
    loadData()
  return ()=> unsubscribe()
  }, [])
  const onSendPressed = async () => {
    try {
      if (msg)
        await addDoc(collection(db, collectionName), {
          msg: msg,
          msgFrom: getAuth().currentUser.email,
          time: serverTimestamp()
        })
        console.log(collectionName)
      setMessage(null)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={getAuth().currentUser.email == item.msgFrom ?
              {
                width: '50%',
                backgroundColor: '#3EB581',
                padding: 10,
                margin: 5,
                borderRadius: 20,
                alignSelf: 'flex-end'
              } :
              {
                width: '50%',
                backgroundColor: 'white',
                padding: 10,
                margin: 5,
                borderRadius: 20,
              }}>
              <Text style={{ fontWeight: 'bold' }}>{
                getAuth().currentUser.email == item.msgFrom ? 'you' : item.msgFrom}</Text>
              <Text>{item.msg}</Text>
              {item.time ?
                <Text style={{ fontSize: 8 }}> {item.time.toDate().toUTCString()}
                </Text> : null
              }
            </View>
          )
        }}
      />
      <View style={{ width: 100, flexDirection: 'row' }}>
        <TextInput
          placeholder='Type Message'
          value={msg}
          style={styles.TextInput}
          onChangeText={(t) => { setMessage(t) }}
        />
        <TouchableOpacity
          onPress={() => { onSendPressed() }}>
          <Image
            style={{ height: 50, width: 50, marginTop: 5 }}
            source={require('../assets/send.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',

  },
  Text: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    margin: 10,
  },
  Image: {
    height: 80,
    width: 80,
    margin: 10
  },

  TextInput: {
    width: 280,
    height: 45,
    alignSelf: 'baseline',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 7,
    margin: 10
  }

})

export default Home;
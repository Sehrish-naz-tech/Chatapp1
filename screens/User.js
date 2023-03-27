import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../config/firebase'
import { collection, query, where, getDocs, doc, getFirestore, updateDoc, onSnapshot } from "firebase/firestore";
import { async } from '@firebase/util';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const Users = (props) => {
    const [users, setUsers] = useState([])
    const [temp, setTemp] = useState("")
    const [location, setLocation] = useState(null);


    const db = getFirestore(firebase)

    useEffect(() => {
        (async () => {
  
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            // let location = await Location.getCurrentPositionAsync({});
            // setLocation(location);
            
      
          })();

    }, [])
    
      
    useEffect(()=> {
        loadlocation()
        let unsub = loadData()
         return ()=> unsub
    }, []);

    const loadData = async () => {
        let weather = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=e14824332c835ff80bccd41173063f81&units=metric')
        console.log(weather.data)
        setTemp(weather.data.main.temp)

       
        const q = query(collection(db, "Users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
              users.push(doc.data());
          });
          
        setUsers(users);
      });
      return unsubscribe
    
  
      

        /*const q = query(collection(db, "Users"));
        let users = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            users.push({ ...doc.data(), email: doc.id })
        });
        setUsers(users) */
        
    }

    const loadlocation = async () => {
        Location.watchPositionAsync(
          { distanceInterval: 0 },
          async (location) => {
            try {
              //console.log(location)
            const ref = doc(db, "Users", getAuth().currentUser.email);
  
            
            await updateDoc(ref, {
              location: location
            });
            } catch (error) {
              console.log(error)
            }
            
  
          })}
         
        // const loadlocation =async()=>{
        //     try {
        //         Location.watchPositionAsync({distanceInterval:0},async (location)=>{
        //             console.log(location);
        //            }) 
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
       
    
       
    const onUserSelected = (selectedUserEmail) => {
        let array = [getAuth().currentUser.email, selectedUserEmail]
        array.sort()
        let key = array[0] + '_' + array[1]
        props.navigation.navigate('Home', { collectionName: key })
    }

    return (
        <View style={styles.container}>
            <Text>{`Lahore Temprature is: ${temp}`}</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return (
                        
                            <TouchableOpacity style={{
                                backgroundColor: '#d3d3d3',
                                height: 200,
                                margin: 10,
                                borderRadius: 20,
                            }}
                                onPress={() => onUserSelected(item.email)}
                            >
                                <Text style={{ fontWeight: 'bold' }}> {`${item.email}`}  </Text>
                                <Text style={styles.Text}> {`${item.firstName} ${item.lastName} `}  </Text>
                                <Text style={styles.Text}> {`${item.age} `}  </Text>
                                <Text style={styles.Text}> {`${item.address} `}  </Text>

                                {item.location ?
                                    <MapView
                                        style={styles.map}
                                        //provider={'google'}
                                        showsMyLocationButton={true}
                                        showsUserLocation={true}
                                    >
                                        <Marker
                                            coordinate={{
                                                latitude: item.location.coords.latitude,
                                                longitude: item.location.coords.longitude,
                                            }}
                                              title = {` ${item.firstName}'s Location`}
                                            //title='Marker'
                                        />
                                    </MapView>
                                    : null}


                            </TouchableOpacity> 
                    )
                }}
            />

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '50%',
    },
    Text: {
        //fontWeight:'bold',
        padding: 2,
    },
})

export default Users
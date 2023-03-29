import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';




const Maps = (props) => {
  const [location, setLocation] = useState(null);
  const[latitude, setLatitude]= useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      Location.watchPositionAsync({distanceInterval:30},(location)=>{
        console.log(location);
       })

    })();
  }, []);

return(
    <View style={styles.container}>
    <MapView
            style={styles.map}
            provider={'google'}
            showsMyLocationButton={true}
            showsUserLocation={true}
            >
              {location?<Marker 
             coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude,}}
            
              title= 'Marker'
                />:null}
      </MapView>
    </View>
      );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',

  },
  map: {
    width: '100%',
    height: '100%',
  },
})
export default Maps
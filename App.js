import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Location from 'expo-location'
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { KEY } from '@env';

export default function App() {

  const [origin, setOrigin] = React.useState({
    latitude:32.437725,
    longitude: -114.716356
  });

const [destination, setDestination] = React.useState({
  latitude:32.437725,
  longitude: -114.716356
});

React.useEffect(() =>{
getLocationPermission();
},[])

async function getLocationPermission(){
  let {status} = await Location.requestForegroundPermissionsAsync();
  if(status !== "granted"){
    alert("Permission denied");
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  const current ={
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }
  setOrigin(current);
}

  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      initialRegion={{
        latitude:origin.latitude,
        longitude: origin.longitude,
        latitudeDelta:0.99,
        longitudeDelta:0.04
      }}> 
      
      <Marker 
      draggable
      coordinate={origin}
      onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}/>

       <Marker 
      draggable
      coordinate={destination}
      onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}/>

      <MapViewDirections
      origin={origin}
      destination={destination}
      apiKey={KEY}
      strokeColor='blue'
      strokeWidth={2}/>
    
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width: '100%',
    height: '100%'
  }
});

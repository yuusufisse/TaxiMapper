// MapComponent.js
import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import { useUserLocation } from '../../context/UserLocationContext';
import { addPoint } from '../../utils/pointManager';
import * as Location from 'expo-location';

const MapComponent = ({ onButtonPress }) => {
    // Accessing user location and updateLocation function from the context
    const { location, updateLocation } = useUserLocation();
    
    // State for the initial position of the map
    const [initialPosition, setInitialPosition] = useState({
      latitude: 61.692248,
      longitude: 27.274436,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    // State for storing fetched points to be displayed on the map
    const [fetchedPoints, setFetchedPoints] = useState([]);
  
    // Function to update the fetched points array
    const updatePoints = (newPoint) => {
      if (newPoint && newPoint.latitude && newPoint.longitude) {
        setFetchedPoints((prevPoints) => [...prevPoints, newPoint]);
      } else {
        console.warn('Invalid new point:', newPoint);
      }
    };
  
    // Function called when the "Save Point" button is pressed
    const handleButtonPress = async () => {
      try {
        // Get the user's current location
        const userLocation = await Location.getCurrentPositionAsync({});
        
        // Create a new point object
        const newPoint = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          weight: 1,
        };
  
        // Add the new point to the point manager
        addPoint(newPoint);

        // Update the fetched points array
        updatePoints(newPoint);

        // Update the user location in the context
        updateLocation(newPoint);
  
        // Call the passed function from the parent component (HomeScreen)
        onButtonPress();
      } catch (error) {
        console.error('Error getting location for savePoint', error);
      }
    };

    // Render the component
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={initialPosition}>
          {fetchedPoints.length > 0 && (
            // Render Heatmap if there are fetched points
            <Heatmap
              points={fetchedPoints}
              radius={30}
              opacity={1}
              gradient={{
                colors: ['black', 'purple', 'red', 'orange', 'white'],
                startPoints: [0.1, 0.25, 0.5, 0.75, 1],
              }}
            />
          )}
        </MapView>
        {/* Button to save the current location as a point */}
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>Save Point</Text>
        </TouchableOpacity>
      </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    borderColor: '#0066ff',
    backgroundColor: '#0066ff',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});

// Export the component as the default export
export default MapComponent;

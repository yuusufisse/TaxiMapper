// UserLocationContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPoints, setPoints } from '../utils/pointManager';

// Create a context for user location
const UserLocationContext = createContext();

// Provider component for managing user location state
const UserLocationProvider = ({ children }) => {
  // State for the current location
  const [location, setLocation] = useState(null);

  // State for points related to the user's location
  const [points, setContextPoints] = useState(getPoints());

  // Effect to get the user's current location when the component mounts
  useEffect(() => {
    (async () => {
      try {
        // Request foreground location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission denied');
          return;
        }

        // Get the current location
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error('Error getting location', error);
      }
    })();
  }, []);

  // Function to update the location state
  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  // Function to save the current location as a point
  const savePoint = async () => {
    try {
      // Get the updated current location
      const updatedLocation = await Location.getCurrentPositionAsync({});
      
      // Create a new point object
      const newPoint = { 
        latitude: updatedLocation.coords.latitude,
        longitude: updatedLocation.coords.longitude,
        weight: 1,
      };

      // Update the points in the point manager
      setPoints([...points, newPoint]);

      // Update the points in the context
      setContextPoints([...points, newPoint]);
    } catch (error) {
      console.error('Error getting location for savePoint', error);
    }
  };

  // Context value containing location, updateLocation, savePoint, and points
  const contextValue = { location, updateLocation, savePoint, points };

  // Provide the context value to the child components
  return (
    <UserLocationContext.Provider value={contextValue}>
      {children}
    </UserLocationContext.Provider>
  );
};

// Custom hook for using the UserLocationContext
const useUserLocation = () => {
  const context = useContext(UserLocationContext);
  if (!context) {
    // Throw an error if the hook is not used within a UserLocationProvider
    throw new Error('useUserLocation must be used within a UserLocationProvider');
  }
  return context;
};

// Export the UserLocationProvider and useUserLocation hook
export { UserLocationProvider, useUserLocation };

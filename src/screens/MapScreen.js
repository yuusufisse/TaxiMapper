import React from 'react';
import MapComponent from '../components/map/MapComponent';

// Define the MapScreen functional component
const MapScreen = () => {
  // Define an empty function for handling the "Save Point" button press
  const handleButtonPress = () => {
  };

  // Return the MapComponent, passing the handleButtonPress function as a prop
  return <MapComponent onButtonPress={handleButtonPress} />;
};

// Export the MapScreen component
export default MapScreen;

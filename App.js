// App.js
import React from 'react';
import TabNavigation from './src/navigations/TabNavigations';
import { NavigationContainer } from '@react-navigation/native';
import { UserLocationProvider } from './src/context/UserLocationContext'; // Import the UserLocationProvider

const App = () => {
  return (
    <UserLocationProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </UserLocationProvider>
  );
};

export default App;
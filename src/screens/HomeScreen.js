import React from 'react';
import { Image, View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/Logo.png'

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToMap = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image 
          source={Logo} 
          style={{width: 300, height: 200, marginBottom: 30}}
          />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToMap}>
          <Text style={styles.buttonText}>Go to Map</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#0066ff',
    backgroundColor: '#0066ff',
    borderWidth: 1,
    paddingTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});

export default HomeScreen;

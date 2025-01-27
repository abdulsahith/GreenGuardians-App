import React, { useState,useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { Domain } from '../pages/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const { width, height } = Dimensions.get('window');
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation=useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'LOGIN PAGE',
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'#37B7C3',
        fontSize:30,
        
      },
      headerStyle:{
        backgroundColor:'#243642',
        borderBottomColor:'white',
        borderBottomWidth:2,
      }
    });
  }, [navigation]);



  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password');
      return;
    }
  
    try {
      // Make a POST request to the Django backend
      const response = await axios.post(`${Domain}/user/`, {
        username: username,
        password: password,
      });
  
      // Handle successful login
      if (response.data.success) {
        // Save token or username to AsyncStorage
        await AsyncStorage.setItem('userToken', response.data.token);
        const token = await AsyncStorage.getItem('userToken');
        console.log(token)
 
        router.push('/(tabs)');
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Unable to login. Please try again later.');
    }
  };
  

  return (
    <View style={[styles.main, { width: width, height: height }]}>
      {/* GreenGuardians Text at the Top */}
      <Text style={styles.title}>GreenGuardians</Text>
      <View style={styles.logo}>
        <Ionicons size={40} name="leaf" color={'#37B7C3'} />
      </View>

      {/* Input Section */}
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, { height: 60 }]} // Extend input height
          placeholder="Enter your username"
          placeholderTextColor="#A9A9A9"
          onChangeText={setUsername}
          value={username}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, { height: 60 }]} // Extend input height
          placeholder="Enter your password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#243642',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#37B7C3',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#37B7C3',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  form: {
    width: '90%',
    backgroundColor: '#405D72',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#C4E1F6',
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    color: '#C4E1F6',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#2C3333',
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: '#37B7C3',
    borderWidth: 1,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#37B7C3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
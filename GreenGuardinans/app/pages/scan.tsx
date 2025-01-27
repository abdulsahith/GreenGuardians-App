import React, { useState, useEffect,useLayoutEffect } from 'react';
import { StyleSheet ,Text,Alert,View} from 'react-native';
import { CameraView, Camera } from "expo-camera";
import axios from 'axios';
import { Domain } from './domain';
import {useRouter, useNavigation } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
const QRScanner = () => {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null); // Added to handle camera permissions
  const navigation=useNavigation();
   const router = useRouter();
   const [user,setUser]=useState('');
   const [scan,setScan]=useState('');
   const scanner=['Plastic','Organic'];
  useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Sacn the QR',
        headerTitleStyle: {
          fontWeight: 'bold',
          color:'#37B7C3',
          fontSize:20,
          
        },
        headerStyle:{
          backgroundColor:'#243642',
          borderBottomColor:'white',
          borderBottomWidth:2,
        }
      });
    }, [navigation]);
   
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
      // Replace with your backend API endpoint
      const response = await axios.post(`${Domain}/scan_weight/`, {
        username:user,type:scan// Assuming the QR code contains the username
      });


      const { message, weight } = response.data;
     
      router.push('/(tabs)')
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.error || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      // Allow scanning again
      setScanned(false);
    }
  };
  
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${Domain}/get_Pyroweight/`) 
      // console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);


    }
  };
  

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    
    getCameraPermissions();
    fetchUser();
  }, []);

  if (hasPermission === null) {
    return null; // Show nothing while permissions are being requested
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.main}>
      <View style={styles.pickerContainer}>
              <Picker
                selectedValue={scan}
                onValueChange={(value) => setScan(value)}
                style={styles.picker}
              >
                {scanner.map((id) => (
                  <Picker.Item key={id} label={id} value={id} />
                ))}
              </Picker>
            </View>
    
    <CameraView
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["qr", "pdf417"], // Ensure these barcode types are supported
      }}
      style={StyleSheet.absoluteFillObject}

    />

    <View style={styles.box}>
     
    </View>

</View>

     
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     
  },
  main: {
    flex: 1,
    position:'relative',
     

  },
  box:{
    width:200,
    height:200,
    borderRadius:10,
    borderWidth:1,
    borderColor:'white',
    position:'absolute',
    zIndex:1000,
    marginLeft:100,
    marginTop:250


  },
  pickerContainer: {
    width: 200,
    backgroundColor: 'transparent', // Pale Green picker background
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    position:'absolute',
    zIndex:1000,
    marginTop:150,
    marginLeft:100
  },
  picker: {
    height: 60,
    color: 'white',
    fontWeight:'bold'
  },
});

export default QRScanner;

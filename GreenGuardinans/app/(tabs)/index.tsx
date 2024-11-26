import React, { useRef, useState,useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Domain } from '../pages/domain';
export default function Home() {
  const { width, height } = Dimensions.get('window');
  const videoPlastic = useRef(null);
  const videoNatural = useRef(null);
  const router = useRouter();
  const [pyrodata,setPyro]=useState('');
  const [bsfldata,setBsfl]=useState('');
  useEffect(() => {
    fetchPyro();
    fetchBsfl();
}, []);
 
  const fetchPyro = async () => {
    try {
      const response = await axios.get(`${Domain}/pyro/`) 
      // console.log(response.data);
      setPyro(response.data);   
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchBsfl = async () => {
    try {
      const response = await axios.get(`${Domain}/bsfl/`) 
      // console.log(response.data);
      setBsfl(response.data);   
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



 
  return (
    <View style={[styles.main, { width: width, height: height }]}>
      <View style={styles.nav}>
        <Text style={styles.txt}>GreenGuardians</Text>
        <View style={styles.logo}><Ionicons size={28} name="person" color={'#37B7C3'} /></View>
      </View>
      <View style={styles.mainbox}>
        <View style={styles.day}>
          <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>Day 1: Monday</Text>
        </View>

        {/* Navigate to pages/plastic when pressed */}
        <TouchableOpacity style={styles.box} onPress={() => { router.push('./pages/plastic'); }}>
          <View style={styles.subBox}>
            <Text style={styles.boxText}>Plastic waste</Text>
            {/* Local Video for plastic waste */}
            <Video
             ref={videoNatural}
             style={styles.video}
             source={require('../../assets/video/food-box.mp4')}
             resizeMode="contain"
             isLooping
             shouldPlay
            />
          </View>
          <Ionicons size={28} name="arrow-forward-circle" style={styles.arrow} color={'white'}/>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.box}  onPress={() => { router.push('./pages/natural'); }}>
          <View style={styles.subBox}>
            <Text style={styles.boxText}>Natural waste</Text>
            {/* Local Video for natural waste */}
            <Video
             ref={videoNatural}
             style={styles.video}
             source={require('../../assets/video/food-waste.mp4')}
             resizeMode="contain"
             isLooping
             shouldPlay
            />
          </View>
          <Ionicons size={28} name="arrow-forward-circle" style={styles.arrow} color={'white'}/>
        </TouchableOpacity>

        {/* Scroll effect start */}
        <View style={styles.scroll}>
          <ScrollView 
            horizontal // Enable horizontal scrolling
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.circle}>
              <Text style={[styles.cirTxt,{marginTop:60}]}>Plastic waste</Text>

          <View>
              <FlatList  style={styles.fat}
  data={pyrodata}
  keyExtractor={(item) => item.id.toString()}  // Use unique identifier, such as 'id'
  renderItem={({ item }) => (
    <Text style={styles.Kgtxt}>
      {item.addpyro ? item.addpyro : 0} Kg {/* Ensure 'pyro' exists */}
    </Text>
  )}
/>
</View>
      </View>    
            {/* 1st circle */}
            <View style={styles.circle}>
              <Text style={[styles.cirTxt,{marginTop:60}]} >Natural waste</Text>
              <View>
              <FlatList  
  data={bsfldata}
  keyExtractor={(item) => item.id.toString()}  // Use unique identifier, such as 'id'
  renderItem={({ item }) => (
    <Text style={styles.Kgtxt}>
      {item.addbsfl ? item.addbsfl : 0} Kg {/* Ensure 'pyro' exists */}
    </Text>
  )}
/>
</View>
 </View>
            {/* 2nd circle */}
            <View style={styles.circle}>
              <Text style={styles.cirTxt}>Your Earnings</Text>
              <Text style={styles.Kgtxt}>5000</Text>
            </View>
            {/* 3rd circle */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#243642',
  },
  nav: {
    width: '98%',
    height: 80,
    backgroundColor: '#243642',
    
    borderRadius: 10,
    marginTop: 20,
    marginLeft:5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    shadowColor: 'white',
    shadowOffset: { width: 5, height: 25 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderBottomColor:'lightgrey',
    borderBottomWidth:1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: '#37B7C3',
    opacity:2,
    borderWidth: 2,
    marginLeft: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#37B7C3',
  },
  day: {
    width:150,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#243642',
    borderRadius:20,
    marginLeft:-200,
    marginTop:-40,
    borderColor:'#C4E1F6',
    borderWidth:0.5,
  },
  video: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 20,
  },
  mainbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 40,
  },
  box: {
    width: 300,
    height: 150,
    backgroundColor: '#405D72',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
    shadowColor: '#C4E1F6',
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  arrow: {
    marginRight:20,
    fontSize:40
  },
  subBox: {
    flexDirection: 'column',
    width:'50%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
  },
  boxText: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
  scroll: {
    width:'100%',
    height:200,
    marginBottom:-40,
  },
  circle: {
    width:150,
    height:150,
    borderRadius:'50%',
    backgroundColor:'#2C3333',
    marginLeft:15,
    shadowColor: '#3A6D8C',
    shadowOffset: { width: 50, height: 50 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 9,
    justifyContent:'center',
    alignItems:'center'
  },
  cirTxt: {
    fontSize:14,
    color:'white',
    marginLeft:8,
     marginTop:-30
  },
  Kgtxt: {
    fontSize:40,
    color:'#37B7C3',
    fontWeight:'bold',
    
  },
  
});

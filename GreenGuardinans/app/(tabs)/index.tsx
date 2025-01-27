import React, { useRef, useState,useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Domain } from '../pages/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const { width, height } = Dimensions.get('window');
  const videoPlastic = useRef(null);
  const videoNatural = useRef(null);
  const router = useRouter();
  const [pyrodata,setPyro]=useState('');
  const [bsfldata,setBsfl]=useState('');
  const [refresh, setRefresh] = useState(false);
  const [mon,setMon]=useState(null);
  const [scan,setScan]=useState('');



useFocusEffect(
  React.useCallback(() => {
    fetchPyro();
    fetchBsfl();
    setRefresh(false); // Reset refresh trigger
    const handle = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token); // This should log the token if it was saved properly
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    handle();
    
  }, [])
);


 
  const fetchPyro = async () => {
    try {
      const response = await axios.get(`${Domain}/get_Pyroweight/`) 
      // console.log(response.data);
      setPyro(response.data);
      
      const data=response.data[0];
       console.log(data)
      setMon({
          money:data.pyroweigh*30.68
      });
     
    } catch (error) {
      console.error('Error fetching data:', error);

     
    }
  };
  
   


//   const fetchStatuses = async () => {
//     try {
//         const response = await axios.get(`${Domain}/get_Pyroweight/`);
        
//         // Assuming response.data is an array, select the first object
//         const data = response.data[0];
//         setPyro({
//           pyro:data.pyroweigh

//         });
        
//     } catch (error) {
//         console.error('Error fetching statuses:', error);
//     }
// };

  
  const fetchBsfl = async () => {
    try {
      const response = await axios.get(`${Domain}/get_Bsflweight/`) 
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
        <View style={styles.tools}>
        <View style={styles.day}>
          <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>Day 1: Monday</Text>
        </View>

      

        <TouchableOpacity style={styles.scan} onPress={()=>{router.push('./pages/scan')}}>
        <Ionicons size={28} name="scan" color={'#37B7C3'} />
        </TouchableOpacity>
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
     {item.pyroweigh ? item.pyroweigh : 0} Kg 
    </Text>
  
  )}
/>

    {/* <Text style={styles.Kgtxt}>
    {pyrodata?.['pyro']}  g
    </Text> */}
 
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
      {item.bsflweight ? item.bsflweight : 0} kg {/* Ensure 'pyro' exists */}
    </Text>
  )}
/>
</View>
 </View>
            {/* 2nd circle */}
            <View style={styles.circle}>
              <Text style={[styles.cirTxt,{marginTop:60}]}>plastic earnings</Text>


          <View>
              <FlatList  style={styles.fat}
  data={pyrodata}
  keyExtractor={(item) => item.id.toString()}  // Use unique identifier, such as 'id'
  renderItem={({ item }) => ( 
  <Text style={[styles.Kgtxt,{fontSize:25}]}>
    ₹ {item.addpyroweight ? item.addpyroweight : 0} 
    </Text>
  
  )}
/>

   
   
</View>
      </View>   
            {/* 3rd circle */}

            <View style={styles.circle}>
              <Text style={[styles.cirTxt,{marginTop:60}]}>organic earnings</Text>


          <View>
              <FlatList  style={styles.fat}
  data={pyrodata}
  keyExtractor={(item) => item.id.toString()}  // Use unique identifier, such as 'id'
  renderItem={({ item }) => ( 
  <Text style={[styles.Kgtxt,{fontSize:25}]}>
    ₹ {item.addbsflweight ? item.addbsflweight : 0} 
    </Text>
  
  )}
/>

     
   
</View>
      </View>  

       
          </ScrollView>

          
            
          <FlatList  style={styles.fat}
  data={pyrodata}
  keyExtractor={(item) => item.id.toString()}  // Use unique identifier, such as 'id'
  renderItem={({ item }) => ( 
  <Text style={[styles.Kgtxt,{fontSize:20,textAlign:'center'}]}>
    You are reducing {item.carbon ? item.carbon : 0} kg carbon footprint
    </Text>
  
  )}
/>
             

          

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
    borderColor:'#C4E1F6',
    borderWidth:0.5,
    marginTop:5
  },
  tools:{
    width:"92%",
    height:"auto",
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:-20
  },
  pickerContainer: {
    width: 50,
    backgroundColor: '#405D72', // Pale Green picker background
    borderRadius: 10,
    borderColor: '#243642',
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    height: 60,
    color: '#405D72',
  },
  scan:{
    width:50,
    height:50,
    backgroundColor:"#405D72",
    shadowColor: '#C4E1F6',
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
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
    fontSize:35,
    color:'#37B7C3',
    fontWeight:'bold',
    
  },
  
  
});

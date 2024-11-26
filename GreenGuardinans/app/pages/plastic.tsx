import React, { useLayoutEffect,useEffect,useRef, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Animated, Easing, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import dayjs from 'dayjs';
import { Domain } from '../pages/domain';
function plastic() {
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const navigation = useNavigation();
  const [statuses, setStatuses] = useState(null);
  const [pytime,setPytime]=useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Plastic Waste',
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

  const scaleAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5, 
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,  
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true, 
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 26]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#405D72", // or set to match your app's background color
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#243642",
    backgroundGradientToOpacity: 1,
    color: () => `white`, // Set graph line to black (or your desired color)
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  
    // Disable gridlines in the chart (if your library supports it)
    propsForBackgroundLines: {
      stroke: "none" // Removes the background gridlines
    },
  
    // Customize dots
    propsForDots: {
      r: "4", // Radius of the dots
      strokeWidth: "2",
      stroke: "#000000", // Black for dots
    }
  };
  
  useEffect(() => {
    fetchStatuses();
     
}, []);

  const fetchStatuses = async () => {
    try {
        const response = await axios.get(`${Domain}/pyro/`);
        
        // Assuming response.data is an array, select the first object
        const data = response.data[0];
       

        const current=dayjs().format('HH:mm:ss');
        setPytime(current)
        // Set pyro and statuses from the selected object
         
        setStatuses({
            received: data.received,
            processing: data.processing,
            filtration: data.filtration,
            generated: data.generated,
            dispatched: data.dispatched,
            pyro:data.pyro,
            pro:data.pro,
            con:data.con

        });
    } catch (error) {
        console.error('Error fetching statuses:', error);
    }
};

   const colorrec=statuses?.['received']==="OK"?'lightgreen':'grey'   
   const colorpro=statuses?.['processing']==="OK"?'lightgreen':'grey'  
   
   const colordis=statuses?.['dispatched']==="OK"?'lightgreen':'grey'  
  return (
    <View style={[styles.main,{width:width*1,height:height*1}]}>
      <ScrollView>
            <View style={styles.box1}>
            <Text style={styles.boxText}>PYROLYSIS</Text>
            <View style={{flexDirection: 'row'}}>
               
                 
                  {/* 1st step */}
                   
                    
                    <View style={styles.animebox}>

                    <Animated.View style={[styles.dot, { transform: [{ scale:statuses?.['received']==="OK" ?scaleAnim:1 }],backgroundColor:colorrec}]}>
                    <Ionicons size={28} name="checkmark" color={'white'} />
                    </Animated.View>

                   

                  
                  <View style={[styles.separator,{backgroundColor:colorrec}]}></View>
                  
                  {/* 2nd step */}
                 
                    <Animated.View style={[styles.dot, { transform: [{ scale:statuses?.['processing']==="OK" ?scaleAnim:1 }],backgroundColor:colorpro }]}>
                    <Ionicons size={28} name="checkmark" color={'white'} />
                    </Animated.View>  
                   
                 
                  
                  <View style={[styles.separator,{backgroundColor:colorpro}]}></View>

                  {/* 3rd step */}
                  
                   

                   
                   
                    <Animated.View style={[styles.dot, { transform: [{ scale:statuses?.['dispatched']==="OK" ?scaleAnim:1 }],backgroundColor:colordis}]}>
                    <Ionicons size={28} name="checkmark" color={'white'} />
                    </Animated.View>
                   
                  </View>

                 
               <View style={styles.subbox}>
                
                <View style={{flexDirection:'row',width:'100%',gap:30}}>
               <Text style={styles.lineTxt}>Received</Text>

           <Text style={[styles.lineTxt,{color:'#37B7C3'}]}>{statuses?.['pyro']}Kg   {pytime}</Text>
              </View>

              <View style={{flexDirection:'row',width:'100%',gap:25}}>
             <Text style={styles.lineTxt}>Processing </Text>

            <Text style={[styles.lineTxt,{color:'#37B7C3'}]}>{statuses?.['pro']}Kg</Text>
            </View>


            <View style={{flexDirection:'row',width:'100%',gap:30}}>
            <Text style={styles.lineTxt}>Converted</Text>

               <Text style={[styles.lineTxt,{color:'#37B7C3'}]}>{statuses?.['con']}Kg</Text>
                    
                 </View>

               </View>
             
            </View>
          </View>

          <SafeAreaView style={styles.bar}>
                <LineChart 
                  data={data}
                  width={350}
                  height={300}
                  chartConfig={chartConfig}
                />
              </SafeAreaView>

              <View style={[styles.box2, { flexDirection: 'row' }]}>
            <View style={styles.lastBox1}>
              <Text style={{fontSize: 25, color: 'lightgreen', fontWeight: 'bold', textAlign: 'center'}}>Pyro</Text>
              <Text style={{marginLeft: 50, fontSize: 20, fontWeight: 'bold', marginTop: 20,color:'white'}}>12 liters</Text>
            </View>
            <View style={[styles.lastBox1, {borderRightWidth: 0}]}>
              <Text style={{fontSize: 25, color: 'lightgreen', fontWeight: 'bold', textAlign: 'center'}}>BSFL</Text>
              <Text style={{marginLeft: 50, fontSize: 20, fontWeight: 'bold', marginTop: 20,color:'white'}}>12kg</Text>
            </View>
          </View>

              </ScrollView>
    </View>
  )
}

export default plastic

const styles=StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'#243642',
    
 },
 separator: {
   width: 4,
   height: 40,
   backgroundColor: 'lightgreen',
  
 },
 logo: {
   width: 50,
   height: 50,
   borderRadius: 50,
   borderColor: 'white',
   borderWidth: 2,
   justifyContent: 'center',
   alignItems: 'center',
   marginLeft: -50
 },
 txt: {
   fontSize: 30,
   fontWeight: 'bold',
   color: 'white',
 },
 
 box1: {
   width: '100%',
   height:300,
   backgroundColor: '#243642',
   borderRadius: 10,
   padding: 20,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.2,
   shadowRadius: 4,
   elevation: 4,
   marginTop: 20,
 },
 animebox:{
  width:'10%',
  height:"100%",
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
 
 },
 boxText: {
   fontSize: 30,
   color: 'lightgreen',
   fontWeight: 'bold',
   textAlign: 'center',
   marginBottom: 20,
 },
 subbox: {
    flexDirection:'column',
    width:'70%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    gap:40,
 },
 line: {
   flexDirection: 'column',
   alignItems: 'center',
 },
 dot: {
   width: 25,
   height: 25,
   borderRadius: '50%',
   backgroundColor: 'lightgreen',
   justifyContent:'center',
   alignItems:'center'
    
 },
 lineTxt: {
   fontSize: 19,
   color: 'white',
   marginLeft: 10,
   fontWeight:'bold',
 },
 bar: {
   width: 350,
   height: 300,
   marginTop:50,
   backgroundColor:'#405D72',
   marginLeft:20,
   borderRadius:10,
   overflow:'hidden'
 },
 lastBox1: {
   width: '50%',
   height: 100,
   borderRightWidth: 1,
   borderRightColor: 'lightgray',
 },
 box2: {
   width: '90%',
   backgroundColor: '#405D72',
   borderRadius: 10,
   padding: 20,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.2,
   shadowRadius: 4,
   elevation: 4,
   marginTop: 50,
   marginBottom:20,
   marginLeft:20
 },
  
});
import { StyleSheet, Image, Platform,View,Dimensions,Text,SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
export default function TabTwoScreen() {
  const { width, height } = Dimensions.get('window');
  const router=useRouter();
  return (
      <View style={[styles.main,{width:width*1,height:height*1}]}>
        <View style={styles.nav}>
        <Text style={styles.txt}>GreenGuardians</Text>
        <View style={styles.logo}><Ionicons size={28} name="person" color={'#37B7C3'} /></View>
        </View>

      <View style={styles.svgcon}>

        <Image 
        source={require('../../assets/images/india.jpg')}
        style={styles.img}
        
        />
       
       <Ionicons size={38} name="location" color={'red'} 
         style={styles.tamil}
         onPress={()=>{router.push('/pages/tamilnadu');}}
       />

<Ionicons size={38} name="location" color={'red'} 
         style={styles.up}
         onPress={()=>{router.push('/pages/plastic');}}
       />
       
      </View>
      
      </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:'black',
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
  svgcon:{
    width:"100%",
    height:"100%",
  },
  svg:{
    width:"100%",
    height:'100%',
    position:'relative'
  },
  img:{
    width:400,
    height:478,
    marginTop:100

  },
  tamil:{
    position:'absolute',
    zIndex:1000,
     
    marginLeft:110,
    marginTop:520
  },
  up:{
    position:'absolute',
    zIndex:1000,
    marginLeft:140,
    marginTop:260
  }

});

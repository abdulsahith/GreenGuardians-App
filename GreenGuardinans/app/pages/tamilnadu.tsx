import React, { useLayoutEffect,useEffect,useRef,useState } from 'react'
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function community() {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Tamil Nadu',
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
    const [searchQuery, setSearchQuery] = useState('');

    const data = [
        { id: 1, name: 'Madurai', liters: 12, kg: 16, chartData: [20, 30, 50, 40, 70, 60, 25], alt: [30, 33, 23, 80, 50, 60] },
        { id: 2, name: 'Tirunelveli', liters: 14, kg: 17, chartData: [15, 25, 55, 35, 75, 65, 60], alt: [30, 33, 23, 80, 50, 60] },
        { id: 3, name: 'Coimbatore', liters: 16, kg: 19, chartData: [10, 20, 45, 30, 55, 70, 26], alt: [30, 33, 23, 80, 50, 60] },
        { id: 4, name: 'Erode', liters: 18, kg: 14, chartData: [30, 40, 60, 50, 80, 70, 36], alt: [30, 33, 23, 80, 50, 60] },
        { id: 5, name: 'Tenkasi', liters: 13, kg: 13, chartData: [25, 35, 55, 45, 65, 75, 25], alt: [30, 33, 23, 80, 50, 60] },
        { id: 6, name: 'Tiruppur', liters: 17, kg: 12, chartData: [35, 45, 65, 55, 85, 95, 55], alt: [30, 33, 23, 80, 50, 60] },
        { id: 7, name: 'Adyar', liters: 12, kg: 16, chartData: [20, 30, 50, 40, 70, 60, 25], alt: [30, 33, 23, 80, 50, 60] },
        { id: 8, name: 'Anna Nagar', liters: 14, kg: 17, chartData: [15, 25, 55, 35, 75, 65, 60], alt: [30, 33, 23, 80, 50, 60] },
        { id: 9, name: 'Besant Nagar', liters: 16, kg: 19, chartData: [10, 20, 45, 30, 55, 70, 26], alt: [30, 33, 23, 80, 50, 60] },
        { id: 10, name: 'Kotturpuram', liters: 18, kg: 14, chartData: [30, 40, 60, 50, 80, 70, 36], alt: [30, 33, 23, 80, 50, 60] },
        { id: 11, name: 'Mylapore', liters: 13, kg: 13, chartData: [25, 35, 55, 45, 65, 75, 25], alt: [30, 33, 23, 80, 50, 60] },
        { id: 12, name: 'Nungambakkam', liters: 17, kg: 12, chartData: [35, 45, 65, 55, 85, 95, 55], alt: [30, 33, 23, 80, 50, 60] },
        { id: 13, name: 'R.A Puram', liters: 11, kg: 18, chartData: [23, 33, 53, 43, 63, 73, 23], alt: [30, 33, 23, 80, 50, 60] },
        { id: 14, name: 'Thiruvanmiyur', liters: 15, kg: 14, chartData: [21, 31, 51, 41, 61, 71, 21], alt: [30, 33, 23, 80, 50, 60] },
        { id: 15, name: 'Teynampet', liters: 19, kg: 17, chartData: [26, 36, 56, 46, 66, 76, 26], alt: [30, 33, 23, 80, 50, 60] },
        { id: 16, name: 'Vadapalani', liters: 12, kg: 16, chartData: [22, 32, 52, 42, 62, 72, 22], alt: [30, 33, 23, 80, 50, 60] },
        { id: 17, name: 'Boat Club', liters: 14, kg: 19, chartData: [28, 38, 58, 48, 68, 78, 28], alt: [30, 33, 23, 80, 50, 60] },
        { id: 18, name: 'Poes Garden', liters: 18, kg: 13, chartData: [24, 34, 54, 44, 64, 74, 24], alt: [30, 33, 23, 80, 50, 60] },
        { id: 19, name: 'Gopalapuram', liters: 17, kg: 15, chartData: [20, 30, 50, 40, 70, 60, 25], alt: [30, 33, 23, 80, 50, 60] },
        { id: 20, name: 'Royapettah', liters: 16, kg: 18, chartData: [29, 39, 59, 49, 69, 79, 29], alt: [30, 33, 23, 80, 50, 60] },
        { id: 21, name: 'East Coast Road', liters: 13, kg: 17, chartData: [27, 37, 57, 47, 67, 77, 27], alt: [30, 33, 23, 80, 50, 60] },
        { id: 22, name: 'Velachery', liters: 19, kg: 20, chartData: [25, 35, 55, 45, 65, 75, 25], alt: [30, 33, 23, 80, 50, 60] }
    ];
    

    // Filter data based on the search query
    const filteredData = searchQuery
        ? data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : data.slice(0, 6); // Show first 3 items if no search is made

  
        const chartConfig = {
            backgroundGradientFrom: "#405D72", // or set to match your app's background color
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#405D72",
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

    return (
        <View style={[styles.main, { width: width * 1, height: height * 1 }]}>
            

            <TextInput
                style={styles.text}
                placeholder='Search place'
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)} 
            />

            <ScrollView style={{ width: width * 1, height: height * 1 }}>
                {filteredData.map((status, id) => (
                    <View style={styles.box} key={id}>
                        <View><Text style={{ fontSize: 30, fontWeight: 'bold', color: '#C6E7FF', textAlign: 'center' }}>{status.name}</Text></View>
                        <View style={styles.subBox}>
                            <View>
                                <View style={{ width: 100, height: 100, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                                    <Text style={{ fontSize: 30, color: '#C6E7FF', fontWeight: 'bold' }}>Pyro</Text>
                                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{status.liters} Liters</Text>
                                </View>
                                <View style={{ width: 100, height: 100 }}>
                                    <Text style={{ fontSize: 30, color: '#C6E7FF', fontWeight: 'bold' }}>BSFL</Text>
                                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{status.kg} KG</Text>
                                </View>
                            </View>
                            <SafeAreaView style={styles.bar}>
                                <LineChart
                                    data={{
                                        labels: ["1", "2", "3", "4", "5", "6", "7"],
                                        datasets: [
                                            {
                                                data: status.chartData
                                            }
                                        ]
                                    }}
                                    width={200}
                                    height={200}
                                    chartConfig={chartConfig}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default community;

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#243642',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        width: 350,
        height: 50,
        color:'white',
        marginTop: 20,
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 10,
    },
    box: {
        width: '90%',
        height: 300,
        backgroundColor: '#405D72',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginTop: 20,
        marginLeft: 20,
    },
    subBox: {
        width: '100%',
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    bar: {
        width: 200,
        height: 200,
    },
});

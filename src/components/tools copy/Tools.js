import 'react-native-gesture-handler';
import React from 'react'
import { View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import NewsCard from './NewsCard'
const screenHeigh = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const tools = [
  {
    name: 'Market Mood',
    route: 'mmi',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJQ0tXzIpwyzZbNOrq_gSjL7Js--pVAfRNQ&usqp=CAU',
    desc: ""
  },
  {
    name: 'Investment',
    route: 'investment',
    img: 'https://www.lehnerinvestments.com/wp-content/uploads/2021/10/Growing_Graph_Plant-780x438.jpg',
    desc: ""
  },
  {
    name: 'Homeloan',
    route: 'homeloan',
    img: 'https://img.staticmb.com/mbcontent//images/uploads/2022/3/home-loan-closure-checklist.jpg',
    desc: ""
  },
  {
    name: 'Age Calculator',
    route: 'age',
    img: 'https://play-lh.googleusercontent.com/my-QwEVsbjuC2ItmR_CWj1OkpkyF4lSzf4YNVZXCpnjIlUJIjNp7fe11HORCKjMhZQ',
    desc: ""
  }
]

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    height: 620
  },
  container: {
    flex: 1
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default function HomeScreen({ navigation }) {

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>

        <View style={{ flex: 1, height: screenHeigh - 100 }}>
          <View style={{ flex: 1, flexDirection: "row", height: 300, width: screenWidth / 2 }}>
            <View style={{ width: screenWidth / 2 }}><NewsCard navigation={navigation} tools={tools[0]} /></View>
            <View style={{ width: screenWidth / 2 }}><NewsCard navigation={navigation} tools={tools[1]} /></View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", height: (screenHeigh) / 2, width: screenWidth / 2 }}>
            <View style={{ width: screenWidth / 2 }}><NewsCard navigation={navigation} tools={tools[2]} /></View>
            <View style={{ width: screenWidth / 2 }}><NewsCard navigation={navigation} tools={tools[3]} /></View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsCard from './NewsCard'

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  container: {
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
}

export default function NewsSlider({ navigation }) {

  const [news, setNews] = useState([])

  useEffect(async () => {

    let url = `https://thetidbit-mw.herokuapp.com/blogs/getFeaturedBlogs`

    try {
      const res = await fetch(url)
      const data = await res.json()
      setNews(data.blogs)
      await AsyncStorage.setItem('AS_Blogs',JSON.stringify(data.blogs))
    } catch (e) {
      let ASBlogs = await AsyncStorage.getItem('AS_Blogs')
      ASBlogs = ASBlogs?JSON.parse(ASBlogs):''
      if(ASBlogs){
        setNews(ASBlogs)
      }
      console.log("error in newsslide:", e)
    }
  }, [])

  const newsSlid = news.map((newsItem, i) => {
    return <View key={i} testID="Hello" style={styles.slide1}>
      <Text style={styles.text}><NewsCard navigation={navigation} newsItem={newsItem} /></Text>
    </View>
  })

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, margin: 10, textAlign: 'center' }}>
        {news.length <= 0 &&
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
          {newsSlid}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
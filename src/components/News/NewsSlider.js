import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Text, View, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-swiper'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsCard from './NewsCard'

var styles = {
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
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
  const newsRedux = useSelector((state) => state.news)

  useEffect(async () => {
    let prefData = await AsyncStorage.getItem('peference')
    prefData = prefData ? JSON.parse(prefData) : ''
    let url = `https://thetidbit-mw.herokuapp.com/news/getCategoryNews`
    if (prefData && prefData.language && prefData.language == 'hi') {
      url = `https://thetidbit-mw.herokuapp.com/news/getCategoryNews?lang=hi`
    }

    var options = {
      method: 'GET',
      url: url,
      params: { q: 'general' }
    };

    try {
      let response = await axios.request(options);
      if (response.status === 200) {
        setNews(response.data)
        await AsyncStorage.setItem('AS_News',JSON.stringify(response.data))
      }
    } catch (e) {
      let ASNews = await AsyncStorage.getItem('AS_News')
      ASNews = ASNews?JSON.parse(ASNews):''
      if(ASNews){
        setNews(ASNews)
      }
      console.log("error in newsslide:", e)
    }

  }, [])

  const newsSlid = news.map((newsItem, i) => {
    return <View key={i} testID="Hello" style={styles.slide}>
      <Text style={styles.text}><NewsCard newsInx={i} navigation={navigation} newsItem={newsItem} /></Text>
    </View>
  })

  return (
    <View style={styles.container}>
      {news.length <= 0 &&
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
      {news.length > 0 && <Swiper
        index={newsRedux.curNewsIndex}
        showsPagination={false}
        horizontal={false}
        style={styles.wrapper}
        loop={true}>
        {newsSlid}
      </Swiper>}
    </View>
  )
}
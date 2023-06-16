
import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';

import VideoCard from './VideoCard';


const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080'
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
})

export default function VideoSlider({ news = [] }) {

  const [indexChanged, setIndexChanged] = useState(0)
  const curTab = useSelector((state) => state.news.curTab)
  let curVidIndex = useSelector((state) => state.news.curVidIndex)
  const newsSlid = news.map((newsItem, i) => {
    return <View key={i} testID="Hello" style={styles.slide}>
      <Text style={styles.text}>
        <VideoCard curVidInx={indexChanged} vidInx={curTab === 1 ? i : -1} newsItem={newsItem} />
      </Text>
    </View>
  })



  return (
    <View style={{ flex: 1 }}>
      {news.length <= 0 &&
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
      {news.length > 0 && <Swiper
      index={curVidIndex}
        style={styles.wrapper}
        loadMinimal={true}
        loadMinimalSize={0}
        showsPagination={false}
        horizontal={false}
        loop={false}>
        {newsSlid}
      </Swiper>}
    </View>
  )

}
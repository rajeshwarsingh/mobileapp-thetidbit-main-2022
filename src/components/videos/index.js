import React, { useEffect, useState } from 'react';
import axios from "axios";
import VideoSlider from './VideoSlider'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Video() {
  const [news, setNews] = useState([])
  useEffect(async () => {

    let url = `https://thetidbit-mw.herokuapp.com/videos`

    var options = {
      method: 'GET',
      url: url
    };

    try {
      let response = await axios.request(options);

      if (response.status === 200) {
        setNews(response.data.videos)
        await AsyncStorage.setItem('AS_Video',JSON.stringify(response.data.videos))
      }
    } catch (e) {
      let ASVideos = await AsyncStorage.getItem('AS_Video')
      ASVideos = ASVideos?JSON.parse(ASVideos):''
      if(ASVideos){
        setNews(ASVideos)
      }
      console.log("error in newsslide1:", e)
    }

  }, [])
  return (<View style={{ flex: 1 }}>
    <VideoSlider news={news} />
  </View>
  )
}
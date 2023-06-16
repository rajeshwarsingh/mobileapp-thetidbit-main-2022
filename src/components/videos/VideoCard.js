import * as React from 'react';
import { Dimensions } from 'react-native'
import { Card } from 'react-native-paper';
import VidPlayer from './vidPlayer'
const screenHeigh = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const VideoCard = ({ newsItem, curVidInx, vidInx }) => {

  return (
    <Card style={{ width: screenWidth, height: screenHeigh, borderWidth: 3 }}>

      {/* <Card.Content> */}
      <VidPlayer curVidInx={curVidInx} vidInx={vidInx} newsItem={newsItem} />
      {/* </Card.Content> */}
    </Card>
  )

};

export default VideoCard;
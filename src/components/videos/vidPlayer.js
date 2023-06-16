import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

import { Video, AVPlaybackStatus } from 'expo-av';

const screenHeigh = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';


export default function App({ newsItem, curVidInx, vidInx }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  
  React.useEffect(() => {

  }, [])

  const shareTheProductDetails = (imagesPath, text,newsInx,  body)=> {
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', imagesPath)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then((base64Data) => {
        // here's base64 encoded image
        var imageUrl = 'data:video/mp4;base64,' + base64Data;
        let shareImage = {
          title: text, //string
          message: `${text} . Please install the app : https://www.thetidbit.in/sharenews?vidInx=${newsInx}&newsInxShow=true&curTab=1`, //string
          url: imageUrl,
          // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
        };
        Share.open(shareImage)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        // remove the file from storage
        // return fs.unlink(imagePath);
      });
  }


  return (
    <><Video
      ref={video}
      style={styles.video}
      source={{
        uri: newsItem.url,
      }}
      shouldPlay={vidInx === -1 ? false : true}
      isMuted={false}
      rate={1.0}
      volume={1.0}
      useNativeControls
      resizeMode="cover"
      isLooping={true}
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
    <Button
    onPress={()=>shareTheProductDetails(newsItem.url,newsItem.title,vidInx, 'check out the video')}
     style={{
      position: 'absolute',
      top: screenHeigh-180,
      bottom: 0,
      left: screenWidth-100,
      height: 100
    }} icon="share">
  share
</Button>
    </>
  );
}

const styles = StyleSheet.create({
  video: {
    height: screenHeigh - 100,
  }
});

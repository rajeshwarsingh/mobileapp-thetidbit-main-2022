import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Share } from 'react-native';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
const image_source = 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
let  messageText = 'Text that you want to share goes here';
const options = {
    mimeType: 'image/jpeg',
    dialogTitle: messageText,
 };


 const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        'Please install this app and stay safe , AppLink :https://play.google.com/store/search?q=thetidbit&c=apps&hl=en_IN&gl=US',
      });
      if (result.action === Share.sharedAction) {
        
        if (result.activityType) {

          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


 
export default class App extends React.Component {
   
  share(){ 
          FileSystem.downloadAsync(
          this.props.newsItem.url,
          FileSystem.documentDirectory  + '.jpeg'
        )
          .then(({ uri }) => { 

              Sharing.shareAsync(uri,options); 
          })
          .catch(error => {
            console.error(error); 
          });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=>{this.share();onShare}}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center'
  }, 
  button: {
    backgroundColor: 'red',
    padding:15
  },
  buttonText: {
    color: 'white'
  }
});

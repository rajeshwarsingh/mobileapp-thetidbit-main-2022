
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVersion, getManufacturer } from 'react-native-device-info';

import {
  SafeAreaView,
  Platform,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
 
const GOOGLE_PACKAGE_NAME = 'com.mobileappthetidbit';
const APPLE_STORE_ID = 'id284882215';
 
const App = () => {
  // Data Source for the SearchableDropdown
  const [count, setCount] = useState(30);
  const [isIntervalRunnig, setIsIntervalRunnig] = useState(false);
 
  useEffect(() => {
    
    async function checkRate(appVer){
      try{
        console.log("step1")
        let isRated = await AsyncStorage.getItem('isUserRated');
        console.log("step2",isRated)
        if(!isRated) startRatingCounter();
        console.log("step3")
      
      }catch(e){
        alert(e)
      }
    }

    checkRate(getVersion())
    
    
  }, []);
 
  const startRatingCounter = () => {
    //Initialize count by 5 to start counter for 5 sec
    setCount(30);
    tempcount = 30;
    if (!isIntervalRunnig) {
      setIsIntervalRunnig(true);
      let t = setInterval(() => {
        tempcount = tempcount - 1;
        console.log(tempcount);
        setCount(tempcount);
        if (tempcount == 0) {
          clearInterval(t);
          setIsIntervalRunnig(false);
          //After 5 second ask for the rate this app
          Alert.alert(
            'Rate us',
            'Would you like to share your review with us? This will help and motivate us a lot.',
            [
              {text: 'Sure', onPress: () =>{
                 AsyncStorage.setItem('isUserRated', '1');
                 openStore();
                 console.log("pressed rating")
                }},
              {
                text: 'Remind Me Late!',
                onPress: () => console.log('No Thanks Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      }, 1000);
    }
  };
 
  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        `market://details?id=${GOOGLE_PACKAGE_NAME}`,
      ).catch(
          (err) => alert('Please check for Google Play Store')
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch((err) => alert('Please check for the App Store'));
    }
  };
 
  return (
    <>
    {/* <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Example to add rate this app feature in React Native
        </Text>
        {isIntervalRunnig ? (
          <Text style={styles.textStyle}>
            Rate this App alert will be in {count} second
          </Text>
        ) : null}
        {isIntervalRunnig ? null : (
          <TouchableOpacity
            onPress={startRatingCounter}
            activeOpacity={0.6}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Restart Rating Counter
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView> */}
    </>
  );
};
 
export default App;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center',
  },
  buttonStyle: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#00BCD4',
    borderRadius: 7,
    marginTop: 20,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});
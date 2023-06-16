

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview'
import { Provider as PaperProvider } from 'react-native-paper';
import PreferenceComponent from './src/components/PreferenceComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
// import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

import { setAndroidToken, getAndroidToken } from './src/api'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [refComponent, setRefComponent] = useState(false);
  const [exitPressTime, setExitPressTime] = useState('');
  const [showPreference, setShowPreference] = useState(false);
  const [langState, setLangState] = useState('');
  const [categoryState, setCategoryState] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      let refCom = refComponent

      if (refComponent) {
        refCom = false
      } else {
        refCom = true
      }

      setRefComponent(refCom)

      //SHOW ALERT TO EXIT APP

      // Alert.alert("Hold on!", "want to goback", [
      //   {
      //     text: "Back",
      //     onPress: () => setRefComponent(refCom),
      //     style: "cancel"
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(async()=>{
    await setTestDeviceIDAsync('EMULATOR');
  },[])
  // useEffect(()=>{
  //   mobileAds()
  // .setRequestConfiguration({
  //   // Update all future requests suitable for parental guidance
  //   maxAdContentRating: MaxAdContentRating.PG,

  //   // Indicates that you want your content treated as child-directed for purposes of COPPA.
  //   tagForChildDirectedTreatment: true,

  //   // Indicates that you want the ad request to be handled in a
  //   // manner suitable for users under the age of consent.
  //   tagForUnderAgeOfConsent: true,

  //   // An array of test device IDs to allow.
  //   testDeviceIdentifiers: ['EMULATOR'],
  // })
  // .then(() => {
  //   // Request config successfully set!
    
  // });
  // },[])

  // const callPreferenceHandle = async () => {

    
  //   try {
  //     const preferenceU = await AsyncStorage.getItem('peference');
  //     // Alert(preferenceU)
  //     if (preferenceU) {
  //       // We have data!!
  //       // console.log(value);
  //       console.log("peference**********************",peference)
  //       setUserPreference(preferenceU)
  //     }
  //   } catch (error) {
  //     console.log("errror**********************",error)
  //     setShowPreference(true)
  //   }

  // };
  
  const getData = async () => {

    try {
      // CHECK STORED PREFERENCE
      let prefData = await AsyncStorage.getItem('peference')

      prefData = prefData ? JSON.parse(prefData) : ''

      if (prefData && prefData.language && prefData.category) {
        setLangState(prefData.language)
        setCategoryState(prefData.category)
      } else {
        setShowPreference(true)
      }

    } catch (e) {
      console.log('Error in getdata component didmount :', e)
      setLangState('en')
      setCategoryState('general')
    }
  }


  useEffect(()=>{
    getData()
  },[])

  const onNavigationStateChange = (navState) => {

    let time = new Date().getTime() - new Date((exitPressTime ? exitPressTime : new Date()).getTime())
    console.log('time :', time)
    if (time < 1000) {
      BackHandler.exitApp()
    }

    // setExitPressTime
    // console.log(time)



    setExitPressTime(new Date());
    let refCom = refComponent
    console.log('before refcom1: ', refCom)
    if (refComponent) {
      refCom = false
    } else {
      refCom = true
    }
    console.log('refcom: ', refCom)
    setRefComponent(refCom)
    // this.setState({
    //   canGoBack: navState.canGoBack
    // });
  }

  const setPreferenceComponentCall = async (preference) => {

    try {
      if (preference.language && preference.category) {
        await AsyncStorage.setItem('peference', JSON.stringify({ language: preference.language, category: preference.category }));
        setLangState(preference.language)
        setCategoryState(preference.category)
      } else {
        console.log('setpreference data not set:')
        setLangState('en')
        setCategoryState('general')
      }
    } catch (error) {
      // Error saving data
      console.log('Error app setPreference**********:', error)
      setLangState('en')
      setCategoryState('general')
    }

    setShowPreference(false)
  }

  let uri = `https://thetidbit.in`;

  if( langState && categoryState){
    uri = `https://thetidbit.in/?source=app&lang=${langState}&category=${categoryState}`
  }

  console.log("uri:",uri)


  return (
    <PaperProvider>
      <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-9155008277126927/7669993848" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={this.bannerError} />

      {showPreference && <PreferenceComponent setPreference={setPreferenceComponentCall} />}
      {!showPreference && <>
        {refComponent && <WebView
          // style={styles.container} router.query.source==='app' && router.query.lang && router.query.category
          source={{ uri }}
          onNavigationStateChange={onNavigationStateChange.bind(this)}
        />}
        {!refComponent && <WebView
          // style={styles.container}
          source={{ uri }}
        />}
      </>}
      {/* <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} /> */}
    </PaperProvider>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    await setAndroidToken(token)
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
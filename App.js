import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import { Text, Dimensions } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Linking from 'expo-linking';
import AdMobComponent from './src/components/AdMobComponent';
import App from './src/App';
import store from './src/store/reducer'
import ShowRating from './src/components/Rating'
import INApp from './src/components/InAppUpdate'

const experienceId = Constants.manifest.id; // @user/project-slug

console.log("experienceId:", experienceId)

// --------------redux---------------
import { Provider } from 'react-redux';
// -----------------------------

import { setAndroidToken, getAndroidToken } from './src/api';
import { View } from 'react-native-web';

let notiData = {}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.addNotificationResponseReceivedListener((response) => {
  notiData = response.notification
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',
    accent: '#000000',
  },
};

export default function Main() {

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState({});
  const [data, setData] = React.useState(null);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  // React.useEffect(() => {
    // alert(getVersion())
    // getToken()
    // notificationsListner((err, data) => {
    //   setData({
    //     queryParams: data
    //   })
    // })
  // }, [])

  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data['newsInxShow'] &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      // navigate to your desired screen
      // console.log('Lastlistner :',lastNotificationResponse.notification)
      setNotification(lastNotificationResponse.notification);
    }
  }, [lastNotificationResponse]);


  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // console.log("@@@@@@@@@@@@@@@@@",notification)
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log("**********************",response.notification)
      setNotification(response.notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleDeepLink = (e) => {
    let data = Linking.parse(e.url)
    console.log("handleDeepLink:", data)
    setData(data)

  }

  React.useEffect(() => {
    async function getInitialUrl() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setData(Linking.parse(initialURL))
      console.log("App useEffect:", initialURL)
    }

    Linking.addEventListener('url', handleDeepLink)
    if (!data) {
      getInitialUrl();
    }

    return () => Linking.removeEventListener('url');

  }, [])




  // let title = ''
  // let body = ''
  // let DataNoti = {}
  // if (notification && notification.request && notification.request.content) {
  //   title = notification.request.content.title ? notification.request.content.title : ""
  //   body = notification.request.content.body ? notification.request.content.body : ""
  //   DataNoti = notification.request.content.data ? notification.request.content.data : {}
  // }


  let sourceData = {
    queryParams: {
      newsInx: 0,
      newsInxShow: false
    }
  }

  if (data && data.queryParams && data.queryParams.newsInxShow) {
    sourceData = data;
  }

  if ((notiData && notiData.request && notiData.request.content && notiData.request.content.data && notiData.request.content.data) || (notification && notification.request && notification.request.content && notification.request.content.data && notification.request.content.data)) {
    if (typeof notification.request.content.data === 'string' && notification.request.content.data.newsInx) {
      notification.request.content.data = JSON.parse(notification.request.content.data)
    }
    sourceData = {
      queryParams: {
        newsInx: notification.request.content.data.newsInx,
        newsInxShow: notification.request.content.data.newsInxShow
      }
    }
  }

  // sourceData = {
  //   queryParams: {
  //     curTab:1,
  //     blogInx:4,
  //     newsInxShow: true
  //   }
  // }

  return (
    <PaperProvider theme={theme}>
      <AdMobComponent/>
      <INApp />
      <ShowRating/>
      <Provider store={store}>
        {sourceData.queryParams.newsInxShow && <App source={sourceData} />}
        {!sourceData.queryParams.newsInxShow && <App source={sourceData} />}
      </Provider>
    </PaperProvider>
  );
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
    // token = (await Notifications.getExpoPushTokenAsync()).data;
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
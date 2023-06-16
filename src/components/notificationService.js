import messaging from '@react-native-firebase/messaging';
// import { setAndroidToken, getAndroidToken } from './src/api';
import { setAndroidToken, getAndroidToken } from '../api';

export async function getToken(){

    try{
        const fcmToken = await messaging().getToken();

        await setAndroidToken(`${fcmToken}`)
    }catch(e){
        // alert(e)
    }
   

}

export async function notificationsListner(cb){

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        
        // alert(remoteMessage.data.type)
        // alert(remoteMessage.data)
        return cb(null,remoteMessage.data)

        // navigation.navigate(remoteMessage.data.type);
      });

     // Check whether an initial notification is available
     messaging()
     .getInitialNotification()
     .then(remoteMessage => {
       if (remoteMessage) {
        
        //  alert(remoteMessage.data.newsInxShow)
         return cb(null,remoteMessage.data)
       }
     })
     .catch((err)=>{
        alert(err)
     })

      messaging.onMessage(async remoteMessage=>{
        // alert(`forground:${remoteMessage}`)
      })

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        // alert(remoteMessage.data.newsInx)

      });
}
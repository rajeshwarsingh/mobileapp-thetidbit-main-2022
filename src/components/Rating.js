// // import { Rating, AirbnbRating } from 'react-native-ratings';

// // // const WATER_IMAGE = require('./water.png')


// // export default function ShowRating(){

// //     const ratingCompleted = (rating)=> {
// //         console.log("Rating is: " + rating)
// //       }

// //     return <Rating
// //     showRating
// //     onFinishRating={this.ratingCompleted}
// //     style={{ paddingVertical: 10 }}
// //   />
// // }



// // {/* <AirbnbRating />

// // <AirbnbRating
// //   count={11}
// //   reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
// //   defaultRating={11}
// //   size={20}
// // /> */}



// // // <Rating
// // //   type='heart'
// // //   ratingCount={3}
// // //   imageSize={60}
// // //   showRating
// // //   onFinishRating={this.ratingCompleted}
// // // />

// // // <Rating
// // //   type='custom'
// // // //   ratingImage={WATER_IMAGE}
// // //   ratingColor='#3498db'
// // //   ratingBackgroundColor='#c8c7c8'
// // //   ratingCount={10}
// // //   imageSize={30}
// // //   onFinishRating={this.ratingCompleted}
// // //   style={{ paddingVertical: 10 }}
// // // />



// import InAppReview from 'react-native-in-app-review';

// export default function ShowRating(){

//     // This package is only available on android version >= 21 and iOS >= 10.3

// // Give you result if version of device supported to rate app or not!
// InAppReview.isAvailable();

// // trigger UI InAppreview
// InAppReview.RequestInAppReview()
//   .then((hasFlowFinishedSuccessfully) => {
//     // when return true in android it means user finished or close review flow
//     console.log('InAppReview in android', hasFlowFinishedSuccessfully);

//     // when return true in ios it means review flow lanuched to user.
//     console.log(
//       'InAppReview in ios has launched successfully',
//       hasFlowFinishedSuccessfully,
//     );

//     // 1- you have option to do something ex: (navigate Home page) (in android).
//     // 2- you have option to do something,
//     // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

//     // 3- another option:
//     if (hasFlowFinishedSuccessfully) {
//       // do something for ios
//       // do something for android
//     }

//     // for android:
//     // The flow has finished. The API does not indicate whether the user
//     // reviewed or not, or even whether the review dialog was shown. Thus, no
//     // matter the result, we continue our app flow.

//     // for ios
//     // the flow lanuched successfully, The API does not indicate whether the user
//     // reviewed or not, or he/she closed flow yet as android, Thus, no
//     // matter the result, we continue our app flow.
//   })
//   .catch((error) => {
//     //we continue our app flow.
//     // we have some error could happen while lanuching InAppReview,
//     // Check table for errors and code number that can return in catch.
//     console.log(error);
//   });
// }










// Ask to Rate Your React Native App on Google Play Store or Apple App Store
// https://aboutreact.com/react-native-rate-this-app-feature/
 
// import React in our code
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import all the components we are going to use
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

    async function checkRate(){
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

    checkRate()
    
    
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
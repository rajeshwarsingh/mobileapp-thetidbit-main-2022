import React from 'react';
import SpInAppUpdates, {
  IAUUpdateKind,
  UPDATE_TYPE,
  NeedsUpdateResponseAndroid,
  SemverVersion,
  NeedsUpdateResponse,
  IncomingStatusUpdateEvent,
} from 'sp-react-native-in-app-updates';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Button,
  Platform,
  Text,
  Alert
} from 'react-native';
import config from '../../config';

const HIGH_PRIORITY_UPDATE = 0; // Arbitrary, depends on how you handle priority in the Play Console
const GOOGLE_PACKAGE_NAME = 'com.mobileappthetidbit';
const APPLE_STORE_ID = 'id284882215';


export default class App extends React.Component {
  inAppUpdates;

  state = {
    needsUpdate: false,
    otherData: null,
  }

  constructor(props) {
    super(props);
    this.inAppUpdates = new SpInAppUpdates(true);
  }

  componentDidMount() {
    this.checkForUpdates()
  }

   openStore = () => {
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

  checkForUpdates = () => {
    this.inAppUpdates.checkNeedsUpdate().then((result) => {
      // alert(JSON.stringify(result))
      if (typeof (result) === 'string') result = JSON.parse(result)
      if (result.other.totalBytes > 0) {

        // ASK FOR UPDATE
        Alert.alert(
          'New Update',
          'New Update is available',
          [
            {text: 'Update Now', onPress: () =>this.openStore()},
            {
              text: 'Remind Me Late!',
              onPress: () => console.log('No Thanks Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );

        // this.setState({
        //   needsUpdate: true,
        //   otherData: result,
        // })
      } else {
        // alert(result.other.totalBytes)
      }
    })
  }

  // startUpdating() {
  //   if (this.state.needsUpdate) {
  //     try {
  //       let updateType;
  //       if (Platform.OS === 'android' && this.state.otherData) {
  //         const otherData = this.state.otherData;
  //         updateType = UPDATE_TYPE.IMMEDIATE;
  //       }
  //       this.inAppUpdates.addStatusUpdateListener(this.onStatusUpdate);
  //       this.inAppUpdates.startUpdate({
  //         updateType: IAUUpdateKind.IMMEDIATEE, // android only, on iOS the user will be promped to go to your app store page
  //       })

  //     } catch (e) {
  //       alert(e)
  //     }

  //   } else {
  //     alert('doesnt look like we need an update')
  //   }
  // }

  // onStatusUpdate = (status) => {
  //   const {
  //     // status,
  //     bytesDownloaded,
  //     totalBytesToDownload,
  //   } = status;
  //   // do something
  //   alert(`status:${JSON.stringify(status)}`)
  //   // console.log(`@@ ${JSON.stringify(status)}`);
  // }

  render() {
    const {
      needsUpdate
    } = this.state;
    return (
      <>
        {/* <StatusBar barStyle="dark-content" /> */}
        {/* <SafeAreaView> */}
          {/* <View style={styles.container}> */}
            {/* <View
              style={styles.aButton}
            >
              <Button
                title="Check for updates"
                color="black"
                onPress={this.checkForUpdates}
              />
            </View> */}
            {/* <View
              style={styles.aButton}
            >
              <Button
                disabled={!needsUpdate}
                title="Start Updating"
                color="black"
                onPress={this.startUpdating}

              />
            </View> */}
            {/* <View
              style={{
                // backgroundColor: 'pink'
                alignItems:'center'
              }}
            >
              <Text
                style={styles.textStyle}
              >{`Needs update: ${needsUpdate ? 'YES' : 'NO'}`}</Text>
            </View> */}
          {/* </View> */}
        {/* </SafeAreaView> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFCDD2',
    justifyContent: 'center'
  },
  aButton: {
    backgroundColor: '#80CBC4',
    marginVertical: 20,
    borderRadius: 8,
    marginHorizontal: 50,
  },
  textStyle: {
    color: 'black',
    fontSize: 26,
  }
});
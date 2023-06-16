import React from 'react';
import SpInAppUpdates, {
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
} from 'react-native';
import { getVersion, getManufacturer } from 'react-native-device-info';

const HIGH_PRIORITY_UPDATE = 0; // Arbitrary, depends on how you handle priority in the Play Console

export default class App extends React.Component {

  state = {
    needsUpdate: false,
    otherData: null,
  }

  constructor(props) {
    super(props);
    this.inAppUpdates = new SpInAppUpdates();
  }

  componentDidMount(){
    this.inAppUpdates.checkNeedsUpdate().then((result) => {
        this.setState({
          needsUpdate: result.shouldUpdate,
          otherData: result,
        }, () => {
        //   alert('we dont need to update')
        })
      })
  }

  checkForUpdates = () => {
    this.inAppUpdates.checkNeedsUpdate({
      toSemverConverter: ((ver) => {
        // i.e if 400401 is the Android version, and we want to convert it to 4.4.1
        const androidVersionNo = parseInt(ver, 10);
        const majorVer = Math.trunc(androidVersionNo / 10000);
        const minorVerStarter = androidVersionNo - majorVer * 10000;
        const minorVer = Math.trunc(minorVerStarter / 100);
        const patchVersion = Math.trunc(minorVerStarter - minorVer * 100);
        return `${majorVer}.${minorVer}.${patchVersion}`;
      }),
    }).then((result) => {
      this.setState({
        needsUpdate: result.shouldUpdate,
        otherData: result,
      }, () => {
        alert('we dont need to update')
      })
    })
  }

  startUpdating() {
    if (this.state.needsUpdate) {
      let updateType;
      if (Platform.OS === 'android' && this.state.otherData) {
        const otherData = this.state.otherData;
        updateType = otherData.updatePriority >= HIGH_PRIORITY_UPDATE
          ? UPDATE_TYPE.IMMEDIATE
          : UPDATE_TYPE.FLEXIBLE;
      }
      this.inAppUpdates.addStatusUpdateListener(this.onStatusUpdate);
      this.inAppUpdates.startUpdate({
        updateType, // android only, on iOS the user will be promped to go to your app store page
      })
    } else {
      alert('doesnt look like we need an update')
    }
  }

  onStatusUpdate = (status) => {
    const {
      // status,
      bytesDownloaded,
      totalBytesToDownload,
  } = status;
  // do something
  console.log(`@@ ${JSON.stringify(status)}`);
  }

  render() {
    const {
      needsUpdate
    } = this.state;
    return (
      <>
        {needsUpdate && <StatusBar barStyle="dark-content" />}
       {needsUpdate && <SafeAreaView>
          <View style={styles.container}>
            {/* <View
              style={styles.aButton}
            >
              <Button
                title="Check for updates"
                color="black"
                onPress={this.checkForUpdates}
              />
            </View> */}
            <View
              style={styles.aButton}
            >
              <Button
                // disabled={!needsUpdate}
                title="Start Updating"
                color="black"
                onPress={this.startUpdating}
                
              />
            </View>
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
          </View>
        </SafeAreaView>}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#077a32',
    justifyContent: 'center'
  },
  aButton: {
    backgroundColor: '#077a76',
    // marginVertical: 25,
    borderRadius: 8,
    marginHorizontal: 50,
  },
  textStyle: {
    color: 'black',
    // fontSize: 26,
  }
});
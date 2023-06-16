
import * as React from 'react';
import { Text, Dimensions } from 'react-native'
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';
import config from '../../config'
import { View } from 'react-native-web';

export default function AdMobComponent() {

    React.useEffect(async () => {
        await setTestDeviceIDAsync('EMULATOR');
    }, [])

    return (
            <AdMobBanner
            style={{ width: Dimensions.get('window').width }}
            bannerSize="fullBanner"
            adUnitID={config.adUnitID}
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError} />
    );
}

import React, { useState } from 'react'
import { View, SafeAreaView, ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title, Paragraph, Headline } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import PreferenceComponent from '../PreferenceComponent'
import { useDispatch } from 'react-redux'

const MyComponent = ({ tools, newsItem, navigation }) => {

  return (
    <Card onPress={() => WebBrowser.openBrowserAsync(`https://www.thetidbit.in/app/dashboard`)} style={{ margin: 5, width: 400, height: 150 }}>
      <Card.Cover style={{ height: 100 }} source={{ uri: `https://www.idashboards.com/wp-content/uploads/2017/12/Depositphotos_83765810_l-2015-1.jpg` }} />
      <Card.Content>
        <Title><Headline style={{ fontWeight: "bold" }}>Go to Dashboard</Headline></Title>
        <Paragraph></Paragraph>
      </Card.Content>
    </Card>
  );

}

export default function HomeScreen({ navigation }) {
  const [showPreference, setShowPreference] = useState(false);
  const dispatch = useDispatch()

  const setPreferenceComponentCall = async (preference) => {

    try {
      if (preference.language) {
        await AsyncStorage.setItem('peference', JSON.stringify({ language: preference.language }));
        dispatch({ type: 'set-cur-pref-lang', curPrefLang: preference.language })
      } else {
      }
    } catch (error) {
      // Error saving data
      console.log('Error app setPreference**********:', error)
    }

    setShowPreference(false)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {/* Dashboard */}
          {!showPreference && <MyComponent navigation={navigation} />}

          {/* Preferece */}
          {!showPreference && <Card onPress={() => setShowPreference(true)} style={{ margin: 5, width: 400, height: 150 }}>
            <Card.Cover style={{ height: 100 }} source={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdzcNfa9Uz-mChzUlbn5E0eTglq0WqTJ6g_g&usqp=CAU` }} />
            <Card.Content>
              <Title><Headline style={{ fontWeight: "bold" }}>Set Language</Headline></Title>
              <Paragraph></Paragraph>
            </Card.Content>
          </Card>}
          {showPreference && <PreferenceComponent setPreference={setPreferenceComponentCall} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
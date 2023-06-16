import 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import BlogSlider from './BlogSlider'

const Stack = createStackNavigator();

function CustomNavigationBar({ navigation, back }) {

  return (
    <Appbar.Header style={{ height: 0 }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Blogs" />
    </Appbar.Header>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [blog, setBlogs] = useState([]);

  useEffect(async () => {

    let url = `https://thetidbit-mw.herokuapp.com/blogs/getFeaturedBlogs`

    try {
      const res = await fetch(url)
      const data = await res.json()
      setBlogs(data.blogs)
    } catch (e) {
      console.log("error in newsslide:", e)
    }
  }, [])

  return (<View style={{ flex: 1 }}>
    <BlogSlider DATA={blog} navigation={navigation} />
  </View>
  );
}
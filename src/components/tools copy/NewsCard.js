import * as React from 'react';
import { Text, View,Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph,Headline } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
const screenHeigh = Dimensions.get('window').height

const MyComponent = ({tools, newsItem, navigation}) => {

  return(
   <Card onPress={() => WebBrowser.openBrowserAsync(`https://www.thetidbit.in/calculator/${tools.route}`)} style={{margin:2,height:(screenHeigh-110)/2}}> 
    <Card.Cover style={{}} source={{ uri: tools.img }} />
    <Card.Content>
      <Title><Headline style={{fontWeight: "bold" }}>{tools.name}</Headline></Title>
      <Paragraph></Paragraph>
    </Card.Content>
  </Card>
);

  }

export default MyComponent;
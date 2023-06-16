import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Headline } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { Share } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({ newsInx, newsItem, navigation }) => {

  const share = `${newsItem.name} . Please install the app : https://www.thetidbit.in/sharenews?newsInx=${newsInx}&newsInxShow=true`

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: share,
        url: ""
      });
      if (result.action === Share.sharedAction) {

        if (result.activityType) {

          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const newsTitle = newsItem.name && newsItem.name.length <= 100 ? newsItem.name : (newsItem.name) ? newsItem.name.substr(0, 100) : ''
  const newsDesc = newsItem.description && newsItem.description.length <= 260 ? newsItem.description : (newsItem.description) ? newsItem.description.substr(0, 255) + '...' : ''

  return (
    <Card style={{ width: 400, height: 700 }}>
      <Card.Cover style={{ height: 300 }} source={{ uri: newsItem.url }} />
      <Card.Content>
        <Title><Headline style={{ fontWeight: "bold" }}>{newsTitle}</Headline></Title>
        <Paragraph style={{ fontSize: 16 }}>{newsDesc}</Paragraph>
        <Paragraph></Paragraph>
        <Paragraph>Author : {newsItem.author} / Published At : {(new Date(newsItem.publishedAt)).toLocaleString()}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => WebBrowser.openBrowserAsync(newsItem.link)}>Read More ...</Button>
        <Button onPress={onShare} title="Share" >Share</Button>
      </Card.Actions>
    </Card>
  );
}

export default MyComponent;
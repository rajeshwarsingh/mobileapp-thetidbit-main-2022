import * as React from 'react';
import {  Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Headline, Divider } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const MyComponent = ({ newsItem }) => {

  const getCategoryLinkName = (categoryLinkName) => {
    let cat = ''

    switch (newsItem.category) {
      case 'investmentguru': cat = 'investment-guru';
        break;
      case 'labouradvisor': cat = 'labour-advisor';
        break;
      case 'bussiness': cat = 'bussiness';
        break;
      case 'tockanalysis': cat = 'tock-analysis';
        break;
      case 'startup': cat = 'startup';
        break;
      case 'miscellaneous': cat = 'miscellaneous';
        break;
      default: cat = '';
    }
    return cat
  }

  const shareTheProductDetails = (imagesPath, text,newsInx,  body)=> {
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', imagesPath)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then((base64Data) => {
        // here's base64 encoded image
        var imageUrl = 'data:image/png;base64,' + base64Data;
        let shareImage = {
          title: text, //string
          message: `${text} . Check out the blog : https://www.thetidbit.in/sharenews?blogInx=${newsInx}&newsInxShow=true&curTab=2`, //string
          url: imageUrl,
          // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
        };
        Share.open(shareImage)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        // remove the file from storage
        // return fs.unlink(imagePath);
      });
  }
  return (
    <Card style={{ width: Dimensions.get('window').width }}>
      <Card.Cover style={{ height: 300 }} source={{ uri: newsItem.homeImg }} />
      <Card.Content>
        <Title><Headline style={{ fontWeight: "bold" }}>{newsItem.homeTitle},{newsItem.title}</Headline></Title>
        <Paragraph style={{ fontSize: 16 }}>{newsItem && newsItem.summery ? newsItem.summery.substr(0, 190) : ''}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => WebBrowser.openBrowserAsync(`https://www.thetidbit.in/${getCategoryLinkName(newsItem.category)}/${newsItem.title}`)}>Read More ...</Button>
        <Button onPress={()=>shareTheProductDetails(newsItem.homeImg,newsItem.homeTitle, newsItem.index, newsItem && newsItem.summery ? newsItem.summery.substr(0, 190) : '')} title="Share Me" >Share</Button>
      </Card.Actions>
      <Divider />
    </Card>
  )
};

export default MyComponent;
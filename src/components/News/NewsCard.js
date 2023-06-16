import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Headline } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
// import { Share } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({ newsInx, newsItem, navigation }) => {

  const share = `${newsItem.name} . Please install the app : https://www.thetidbit.in/sharenews?newsInx=${newsInx}&newsInxShow=true`



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
          message: `${text} . Please install the app : https://www.thetidbit.in/sharenews?newsInx=${newsInx}&newsInxShow=true`, //string
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

  const onShare = async () => {
    console.log("*************onshare called:")


    const url = "https://awesome.contents.com/";
    const title = "Awesome Contents";
    const message = "Please check this out.";

    const options = {
      title,
      url,
      message,
    };

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });

    // try {
    //   const result = await Share.share({
    //     message: share,
    //     url: ""
    //   });
    //   if (result.action === Share.sharedAction) {

    //     if (result.activityType) {

    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    // }
  };
  const newsTitle = newsItem.name && newsItem.name.length <= 100 ? newsItem.name : (newsItem.name) ? newsItem.name.substr(0, 100) : ''
  const newsDesc = newsItem.description && newsItem.description.length <= 260 ? newsItem.description : (newsItem.description) ? newsItem.description.substr(0, 255) + '...' : ''

  // imagesPath ='https://cdn.siasat.com/wp-content/uploads/2022/06/accscv.jpg';
  // text = `Test example for news sharing`;
  // body = 'Description for image shariing';

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
        <Button onPress={()=>shareTheProductDetails(newsItem.url,newsTitle,newsInx, newsDesc)} title="Share Me" >Share</Button>
      </Card.Actions>
    </Card>
  );
}

export default MyComponent;
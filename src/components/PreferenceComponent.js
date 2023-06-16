import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { RadioButton, Button, Headline, Subheading } from 'react-native-paper';
// impoert 
import logo from '../../assets/choose.jpg';

const LangRadioComponent = ({ setLangValue }) => {
  const [value, setValue] = React.useState('en');
  const onValueChange = newValue => {
    setLangValue(newValue)
    setValue(newValue)
  }

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <View style={{ flex: 1 }}><Text>English</Text></View><View style={{ flex: 1 }}><RadioButton value="en" /></View>
      </View>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <View style={{ flex: 1 }}><Text>Hindi</Text></View><View style={{ flex: 1 }}><RadioButton value="hi" /></View>
      </View>
    </RadioButton.Group>
  );
};


const PreferenceComponent = ({ setPreference }) => {
  const [valueLang, setValueLang] = React.useState('en');

  const handleCancel = () => {
    setPreference({ language: valueLang })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreference({ language: valueLang })
  }

  const onLangValueChange = newValue => {
    setValueLang(newValue)
  }

  return (
    <View style={{ margin: 5, paddingBottom: 10}}>
      <View style={{ margin: 15 }}><Headline>What you like us to show?</Headline></View>
      <View style={{ width: '100%', height: 100 }}>

        <Image source={logo} style={{ width: '100%', height: 100 }} />
      </View>
      <View style={{ margin: 15 }}><Text>It will help us to give you personalized news, That you loves.</Text></View>
      <View></View>

      <View style={{ margin: 15 }}>
        <View><Subheading>News Language</Subheading></View>
        <View style={{ margin: 15 }}><LangRadioComponent setLangValue={onLangValueChange} /></View>
      </View>
      
      <View >
        <Button style={{ margin: 5 }} color='red' mode="contained" onPress={handleSubmit}> Submit</Button>
        <Button style={{ margin: 5 }} color='grey' mode="contained" onPress={handleCancel}> Cancel</Button>
      </View>
    </View>
  );
};

export default PreferenceComponent;
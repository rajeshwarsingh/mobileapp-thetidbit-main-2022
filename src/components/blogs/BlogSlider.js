import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import BlogsCard from './BlogsCard'
const DATA = [];

const getItem = (data, index) => {
  data[index]['index'] = index
  return data[index]
}


const getItemCount = (data) => data.length;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const BlogSlider = ({navigation, DATA}) => {
  let curBlogIndex = useSelector((state) => state.news.curBlogIndex)
  
  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={2}
        renderItem={({ item }) => <BlogsCard  navigation={navigation} newsItem={item} />}
        keyExtractor={item => (item?item['_id']:'')}
        getItemCount={getItemCount}
        getItem={getItem}
        initialScrollIndex={curBlogIndex}
        getItemLayout={(data, index) => (
          {length: 300, offset: 300 * index, index}
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default BlogSlider;
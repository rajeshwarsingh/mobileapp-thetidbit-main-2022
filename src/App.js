import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsRoute from './components/News'
import VideosRoute from './components/videos'
import BlogsRoute from './components/blogs'
import ToolsRoute from './components/tools'
import PreferenceComponent from './components/PreferenceComponent'

const MyComponent = (props) => {
  let curVidIndex = useSelector((state) => state)
  const [showPreference, setShowPreference] = React.useState(false);
  const [langState, setLangState] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'news', title: 'News', icon: 'newspaper' },
    { key: 'videos', title: 'Videos', icon: 'video-stabilization' },
    { key: 'blogs', title: 'Blogs', icon: 'forum-outline' },
    { key: 'dashboard', title: 'Dashboard', icon: 'view-dashboard-outline' },
  ]);

  const dispatch = useDispatch()

  const getData = async () => {

    try {
      // CHECK STORED PREFERENCE
      let prefData = await AsyncStorage.getItem('peference')

      prefData = prefData ? JSON.parse(prefData) : ''

      if (prefData && prefData.language) {
        dispatch({ type: 'set-cur-pref-lang', curPrefLang: prefData.language })
      } else {
        setShowPreference(true)
      }

    } catch (e) {
      console.log('Error in getdata component didmount :', e)
      setCategoryState('general')
    }
  }
  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    if (props.source && props.source.queryParams) {
      let newsInx = props.source.queryParams.newsInx ? props.source.queryParams.newsInx : 0
      newsInx = parseInt(newsInx)
      dispatch({ type: 'set-cur-news-tab', curNewsIndex: newsInx })

      if (props.source.queryParams.curTab) {
        dispatch({ type: 'set-cur-tab', curTab: props.source.queryParams.curTab })
        setIndex(parseInt(props.source.queryParams.curTab))
      }

      if (props.source.queryParams.vidInx) {

        let vidInx = props.source.queryParams.vidInx ? props.source.queryParams.vidInx : 0
        vidInx = parseInt(vidInx)
        dispatch({ type: 'set-cur-vid-index', curVidIndex: vidInx })
      }

      if (props.source.queryParams.blogInx) {

        let blogInx = props.source.queryParams.blogInx ? props.source.queryParams.blogInx : 0
        blogInx = parseInt(blogInx)
        dispatch({ type: 'set-cur-blog-index', curBlogIndex: blogInx })
      }



    }
  }, [])


  const renderScene = BottomNavigation.SceneMap({
    news: NewsRoute,
    videos: VideosRoute,
    blogs: BlogsRoute,
    dashboard: ToolsRoute,
  });

  const setPreferenceComponentCall = async (preference) => {
    try {
      if (preference.language) {
        await AsyncStorage.setItem('peference', JSON.stringify({ language: preference.language }));
        dispatch({ type: 'set-cur-pref-lang', curPrefLang: preference.language })
      } else {
        setLangState('en')
      }
    } catch (error) {
      // Error saving data
      console.log('Error app setPreference**********:', error)
      setLangState('en')
    }

    setShowPreference(false)
  }

  return (
    <>
      {showPreference && <PreferenceComponent setPreference={setPreferenceComponentCall} />}
      {!showPreference && <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={(i) => {
          setIndex(i);
          dispatch({ type: 'set-cur-tab', curTab: i });

        }}
        renderScene={renderScene}
        shifting={false}
        news={'one'}
      />}
    </>
  );
};

export default connect(null, null)(MyComponent)

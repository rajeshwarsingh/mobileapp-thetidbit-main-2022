import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, StyleSheet } from 'react-native'

export default function Browser({ route, navigation }) {
    const { title, link } = route.params;
    return <WebView source={{ uri: link }} />
  }
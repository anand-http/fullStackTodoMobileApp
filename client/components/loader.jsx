import { View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loader = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
        <ActivityIndicator animating={true} size={100} color='#900'/>
    </View>
  )
}

export default Loader
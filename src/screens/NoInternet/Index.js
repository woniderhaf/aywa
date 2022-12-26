import React from "react"
import { View,Text, Dimensions } from "react-native"

const {width} = Dimensions.get('window')

const NoInternet = props => {

  return (
    <View style={{flex:1,backgroundColor:'#090909', alignSelf:'center',alignItems:'center',width, justifyContent:'center'}}>
      <Text style={{color:'#FFF', fontSize:25,fontWeight:'500',marginBottom:20}}>Что-то пошло не так...</Text>
      <Text style={{color:'#FFF'}}>Проверьте подключение к интернету</Text>
    </View>
  )
}

export default NoInternet
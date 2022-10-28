import React from 'react'
import { View, Text } from 'react-native'

export default Header = (props) => {
	const {title,context,styles} = props
	return (
		<View style={styles.header}>
			<Text style={[styles.text,styles.title,styles.white]} numberOfLines={1}>{title}</Text>
			<View style={styles.headerRight}>{context}</View>
		</View>
	)
}
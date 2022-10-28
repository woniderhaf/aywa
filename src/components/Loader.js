import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

// start
export default Loader = (props) => {
	const { styles } = props
	return (
		<View style={styles.loaderContainer}>
			<ActivityIndicator color={styles.loaderText.color} />
			<Text style={styles.loaderText}>загрузка</Text>
		</View>
	)
}
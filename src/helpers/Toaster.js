/*
 * (c) pavit.design, 2022
 */

import React from 'react'
import { Text } from 'react-native'

// plug-ins
import { SvgXml } from 'react-native-svg'

const show = (text, toast, styles, callback) => {
	toast.show(<>
		<SvgXml xml={'<svg width="18" height="20" viewBox="0 0 18 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.3815V7.61948C0 6.01748 0.852 4.53648 2.236 3.73048L6.736 1.11148C8.135 0.297477 9.864 0.297477 11.263 1.11148L15.763 3.73048C17.148 4.53648 18 6.01748 18 7.61948V12.3815C18 13.9835 17.148 15.4645 15.764 16.2705L11.264 18.8895C9.865 19.7035 8.136 19.7035 6.737 18.8895L2.237 16.2705C0.852 15.4645 0 13.9835 0 12.3815ZM9 4.75C9.41421 4.75 9.75 5.08579 9.75 5.5V10C9.75 10.4142 9.41421 10.75 9 10.75C8.58579 10.75 8.25 10.4142 8.25 10V5.5C8.25 5.08579 8.58579 4.75 9 4.75ZM8.99901 12.75C8.44875 12.75 7.99746 13.1965 8.00001 13.7527L8.00001 13.75H8.50001L8.50001 13.7518L8.00003 13.7554L8.00001 13.7527C8.00148 14.3037 8.4487 14.75 9.00001 14.75C9.55222 14.75 10 14.3022 10 13.75C10 13.1958 9.55027 12.75 8.99901 12.75ZM9.50003 13.75L9.49999 13.7446L9.50001 13.75H9.50003Z" fill="white"/></svg>'} />
		<Text style={[styles.text,styles.middle,styles.normal,styles.white,styles.ml15]}>{text}</Text>
	</>, 1500, () => callback ? callback() : {})
}

export {
	show
}
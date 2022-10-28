import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// plug-ins
import { SvgXml } from 'react-native-svg'

// icons
const icons = {
	main: '<svg width="24" height="24" viewBox="0 0 24 24"><path opacity="0.4" d="M11.8148 14.2222H12.1852C12.7254 14.2222 13.2846 14.2763 13.6667 14.7777C14.0487 15.2791 14.2222 15.7353 14.2222 16.4444L14.2222 21.9999H9.77777V16.4444C9.77777 15.7353 9.95131 15.2791 10.3333 14.7777C10.7153 14.2763 11.2746 14.2222 11.8148 14.2222Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 10.8441V18.6667C2 19.5507 2.35119 20.3986 2.97631 21.0237C3.60143 21.6488 4.44928 22 5.33333 22H18.6667C19.5507 22 20.3986 21.6488 21.0237 21.0237C21.6488 20.3986 22 19.5507 22 18.6667V10.8441C22 10.0943 21.8313 9.35402 21.5065 8.67818C21.1817 8.00234 20.709 7.40821 20.1235 6.93978L15.4706 3.21742C14.4855 2.42935 13.2615 2 12 2C10.7385 2 9.51452 2.42935 8.52944 3.21742L3.8765 6.93979C3.29097 7.40822 2.8183 8.00235 2.49347 8.67819C2.16865 9.35403 2 10.0943 2 10.8441ZM14.4384 14.0061C13.8654 13.433 13.0882 13.1111 12.2778 13.1111H11.7222C10.9118 13.1111 10.1346 13.433 9.56162 14.0061C8.98859 14.5791 8.66666 15.3563 8.66666 16.1667V22H15.3333V16.1667C15.3333 15.3563 15.0114 14.5791 14.4384 14.0061Z" fill="white"/></svg>',
	shop: '<svg width="24" height="24" viewBox="0 0 24 24"><path opacity="0.4" d="M14.1979 7.26316V4.63158C14.1979 3.17789 13.02 2 11.5663 2H11.5652C10.1115 2 8.93365 3.17789 8.93365 4.63158V7.26316" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.3884 7.26821C17.3544 7.26488 17.32 7.26318 17.2852 7.26318H5.84735C5.35367 7.26318 4.9263 7.60634 4.81998 8.08845L2.02525 20.72C1.87998 21.3769 2.37998 22 3.05261 22H14.1214C14.1214 21.9466 14.1272 21.8923 14.1392 21.8379L17.3182 7.45899C17.3333 7.39085 17.3571 7.32695 17.3884 7.26821ZM15.6396 22H20.08C20.7526 22 21.2526 21.3769 21.1074 20.72L18.514 8.99869L15.6396 22Z" fill="white"/></svg>',
	wallet: '<svg width="24" height="24" viewBox="0 0 24 24"><path opacity="0.4" d="M18.5 6.95311L16.1351 3.80001C15.8284 3.39102 15.3767 3.11503 14.8728 3.02872C14.3689 2.94241 13.8511 3.05233 13.4257 3.33591L7.92981 6.99987" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 9.5V11.5H18.5C17.837 11.5 17.2011 11.7634 16.7322 12.2322C16.2634 12.7011 16 13.337 16 14C16 14.663 16.2634 15.2989 16.7322 15.7678C17.2011 16.2366 17.837 16.5 18.5 16.5H21V18.5C21 19.163 20.7366 19.7989 20.2678 20.2678C19.7989 20.7366 19.163 21 18.5 21H5.5C4.83696 21 4.20107 20.7366 3.73223 20.2678C3.26339 19.7989 3 19.163 3 18.5V9.5C3 8.83696 3.26339 8.20107 3.73223 7.73223C4.20107 7.26339 4.83696 7 5.5 7H18.5C19.163 7 19.7989 7.26339 20.2678 7.73223C20.7366 8.20107 21 8.83696 21 9.5Z" fill="white"/><path opacity="0.4" d="M18.5 12.5H20C20.1591 12.5 20.3117 12.5632 20.4243 12.6757C20.5368 12.7883 20.6 12.9409 20.6 13.1V14.9C20.6 15.0591 20.5368 15.2117 20.4243 15.3243C20.3117 15.4368 20.1591 15.5 20 15.5H18.5C18.1022 15.5 17.7206 15.342 17.4393 15.0607C17.158 14.7794 17 14.3978 17 14C17 13.6022 17.158 13.2206 17.4393 12.9393C17.7206 12.658 18.1022 12.5 18.5 12.5Z" fill="white"/></svg>',
	network: '<svg width="24" height="24" viewBox="0 0 24 24"><path opacity="0.4" d="M2.82948 16L2.01307 20.8863C1.98798 21.0365 1.99912 21.1905 2.04556 21.3355C2.092 21.4805 2.1724 21.6123 2.28007 21.7199C2.38774 21.8276 2.51956 21.908 2.66458 21.9544C2.80959 22.0009 2.9636 22.012 3.11378 21.9869L8 21.1704" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5957 21.8718C11.1597 22.2656 8.66425 21.7448 6.58913 20.4096L3.59037 17.4109C2.25521 15.3358 1.73442 12.8403 2.12815 10.4043C2.52189 7.96842 3.80234 5.76408 5.72326 4.21526C7.64417 2.66645 10.0699 1.88253 12.5339 2.01427C14.9979 2.14602 17.3263 3.18412 19.0711 4.92894C20.8159 6.67375 21.854 9.00206 21.9857 11.4661C22.1175 13.9301 21.3336 16.3558 19.7847 18.2767C18.2359 20.1977 16.0316 21.4781 13.5957 21.8718ZM8.71615 15.4527C8.37901 15.1406 7.85272 15.161 7.54066 15.4981C7.22859 15.8353 7.24892 16.3615 7.58606 16.6736C8.78203 17.7806 10.3517 18.3956 11.9814 18.3956C13.611 18.3956 15.1807 17.7806 16.3766 16.6736C16.7138 16.3615 16.7341 15.8353 16.422 15.4981C16.11 15.161 15.5837 15.1406 15.2466 15.4527C14.3581 16.2751 13.192 16.7319 11.9814 16.7319C10.7707 16.7319 9.60462 16.2751 8.71615 15.4527Z" fill="white"/></svg>',
	profile: '<svg width="24" height="24" viewBox="0 0 24 24"><mask id="mask0_144_5448" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20"><path d="M19.0711 4.92894C22.9763 8.83419 22.9763 15.1658 19.0711 19.0711C15.1658 22.9763 8.83416 22.9763 4.92894 19.0711C1.02369 15.1658 1.02369 8.83416 4.92894 4.92894C8.83419 1.02369 15.1658 1.02369 19.0711 4.92894Z" fill="#D9D9D9"/></mask><g mask="url(#mask0_144_5448)"><path d="M19 22C19 17 14.7573 16 12 16C9.24268 16 5 17 5 22.0024" fill="white"/></g><path d="M19.0711 4.92894C22.9763 8.83419 22.9763 15.1658 19.0711 19.0711C15.1658 22.9763 8.83416 22.9763 4.92894 19.0711C1.02369 15.1658 1.02369 8.83416 4.92894 4.92894C8.83419 1.02369 15.1658 1.02369 19.0711 4.92894" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.4" d="M14.8284 7.17157C16.3905 8.73366 16.3905 11.2663 14.8284 12.8284C13.2663 14.3905 10.7337 14.3905 9.17157 12.8284C7.60948 11.2663 7.60948 8.73366 9.17157 7.17157C10.7337 5.60948 13.2663 5.60948 14.8284 7.17157Z" fill="white"/></svg>'
}

export default class Tabs extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user:null,
			loading:true
		}
	}
	goto = (link) => this.props.navigation.navigate(link)
	render() {
		const {styles,page} = this.props
		const paddingBottom = styles.pbx.paddingBottom ? styles.pbx.paddingBottom + 20 : 20
		return <>
			<View style={[s.container,{paddingBottom}]}>
				<View style={s.tabs}>
					<TouchableOpacity style={[s.tab,page==='main'?s.tabselect:null]} onPress={() => this.goto('Main')}>
						<SvgXml xml={icons.main} />
					</TouchableOpacity>
					<TouchableOpacity style={[s.tab,page==='shop'?s.tabselect:null]}  onPress={() => this.goto('Shop')}>
						<SvgXml xml={icons.shop} />
					</TouchableOpacity>
					<TouchableOpacity style={[s.tab,page==='wallet'?s.tabselect:null]}  onPress={() => this.goto('Wallet')}>
						<SvgXml xml={icons.wallet} />
					</TouchableOpacity>
					<TouchableOpacity style={[s.tab,page==='network'?s.tabselect:null]}  onPress={() => this.goto('Network')}>
						<SvgXml xml={icons.network} />
					</TouchableOpacity>
					<TouchableOpacity style={[s.tab,page==='profile'?s.tabselect:null]}  onPress={() => this.goto('Profile')}>
						<SvgXml xml={icons.profile} />
					</TouchableOpacity>
				</View>
			</View>
		</>
	}
}

const s = StyleSheet.create({
	container: {
		position:'absolute',
		bottom:0,
		width:'100%',
	},
	tabs: {
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		padding:20,
		marginHorizontal:30,
		borderRadius:100,
		backgroundColor:'#090909'
	},
	tab: {
		position:'relative',
		alignItems:'center',
		opacity:.25
	},
	tabselect: {
		opacity:1
	}
})
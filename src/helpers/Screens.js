/*
 * adsme
 * (c) pavit.design, 2022
 */

import { StackActions, NavigationActions } from 'react-navigation'

const resetTo = (navigation, screen, params) => navigation.dispatch(StackActions.reset({index:0,key:null,actions:[NavigationActions.navigate({routeName:screen,params})]}))

export {
	resetTo
}
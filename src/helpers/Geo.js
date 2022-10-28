/*
 * (c) pavit.design, 2021
 */

// globals
import { MAPS } from '../globals/Сonstants'

const city		= async (ip) => await request(MAPS.urlAddresses + ip)
const find		= async (query, kladr_id) => await request(MAPS.urlAddresses, {query,count:20,language:'ru',locations:[{kladr_id}]})
const geocode	= async (coords) => await request(MAPS.urlGeocode, {lat:coords.latitude,lon:coords.longitude})

const request = async (url, data) => {
	const options = {
		method:'POST',
		mode:'cors',
		headers: {
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':`Token ${MAPS.keyDadata}`
		},
		body:JSON.stringify(data)
	}
	const response = await fetch(url, options)
	if (response.status == 200) {
		console.log(response)
		const json = await response.json()
		console.log(json)
		return json
	}
	return null
}

const route = async (origin, destination) => {
	origin = origin.join(',')
	destination = destination.join(',')
	const response = await fetch(MAPS.directionUrl(origin, destination))
	if (response.status === 200) {
		console.log(response)
		const json = await response.json()
		console.log(json)
		if (json.routes && json.routes.length) return json.routes[0].legs[0]
	}
	return null
}

export {
	city,
	find,
	geocode,
	route
}
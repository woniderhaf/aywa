/*
 * (c) pavit.design, 2022
 */

// helpers
import { Utils } from "./Index"

const focus = (c, value, styles, state, isfocus) => {
	c = c._inputElement || c
	c.setNativeProps({style:isfocus ? styles.inputStyleFocus : (Utils.empty(value) ? styles.inputStyle : styles.inputStyleFocus)})
	state.setState({isfocus})
}

const inputError = (errors, styles) => {
	errors.forEach((v) => {
		const c = v.input._inputElement || v.input
		c.setNativeProps({style:v.ischeckvalue ? (Utils.empty(v.value) ? styles.inputErrorStyleFocus : styles.inputStyleFocus) : styles.inputErrorStyleFocus})
	})
}

export {
	focus,
	inputError
}
import React from 'react'
import PropTypes from 'prop-types'

import { isIterable, getDisplayName, areShallowArraysEqual } from './helpers'

const debug = require('debug')('alc-component:with-validation')

export function _ErrorMessage({messages}) {
	const content = (messages || []).filter(msg => !!msg).join(', ')
	return content ? <span className="input-error">{content}</span> : null
}
_ErrorMessage.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.string).isRequired,
}

// Returns an array of error messages.
// Export for testing.
export function _validate(_arg, value) {
	if (typeof _arg === 'function') {
		const result = _arg(value)
		return result ? [ result ] : []
	} else if (isIterable(_arg)) {
		return _arg.map(fn => {
			return fn(value)
		}).filter(val => !!val)
	}
	return []
}

export default function(FormInput, ErrorMessage=_ErrorMessage) {

	class WithValidation extends React.Component {
		constructor(props) {
			super(props)
			this.onChange = this.onChange.bind(this)
			this.componentWillUpdate = this.componentWillUpdate.bind(this)
			this.state = {
				value: props.value,
				errMsgs: _validate(props.validator, props.value),
			}
		}

		onChange(ev) {
			this.props.onChange(ev)

			const newVal = ev.target.value
			this.updateErrorMessages(newVal)
			this.setState({
				value: newVal,
			})
		}

		componentWillUpdate() {
			// This will re-render error messages if the language changes.
			this.updateErrorMessages()
		}

		updateErrorMessages(newVal) {
			const value = typeof newVal !== 'undefined' ? newVal : this.state.value
			const errMsgs = _validate(this.props.validator, value)

			if (!areShallowArraysEqual(errMsgs, this.state.errMsgs)) {
				this.setState({
					errMsgs: errMsgs,
				})
			}
		}

		render() {
			const { onChange, validator, ...remProps } = this.props
			const passProps = { ...remProps, }

			if (this.state.errMsgs.length > 0) {
				passProps.className = 'invalid'
			}
			return (
				<div>
					<FormInput onChange={this.onChange} {...passProps} />
					<ErrorMessage messages={this.state.errMsgs} />
				</div>
			)
		}
	}
	WithValidation.propTypes = {
		validator: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.array,
		]),
		value: PropTypes.any,
		onChange: PropTypes.func,
	}
	WithValidation.defaultProps = {
		validator: () => '',
		onChange: () => true,
		value: '',
	}
	WithValidation.displayName = `WithValidation(${getDisplayName(FormInput)})`
	return WithValidation
}

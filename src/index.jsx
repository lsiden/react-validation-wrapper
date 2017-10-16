import React from 'react'
import PropTypes from 'prop-types'

import { isIterable, getDisplayName, areShallowArraysEqual } from './helpers'

const debug = require('debug')('with-validation:debug')
const classNames = require('classnames')

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

        static propTypes = {
            validator: PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.array,
            ]).isRequired,
            value: PropTypes.any,
            onChange: PropTypes.func,
        }
        static defaultProps = {
            onChange: () => true,
        }
        static displayName = `WithValidation(${getDisplayName(FormInput)})`

        constructor(props) {
            super(props)
            this.onChange = this.onChange.bind(this)
            this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
            this.state = {
                ...props,
                errMsgs: _validate(props.validator, props.value),
            }
        }

        onChange(ev) {
            const newVal = ev.target.value
            this.props.onChange(ev)
            this.updateErrorMessages(newVal)
            this.setState({
                value: newVal,
            })
        }

        componentWillReceiveProps(nextProps) {
            debug('componenetWillReceiveProps()')
            debug(nextProps)
            const { value } = this.props
            if (nextProps.validator !== this.props.validator) {
                const errMsgs = _validate(nextProps.validator, value)
                this.setState({errMsgs})
            }
        }

        updateErrorMessages(val) {
            const errMsgs = _validate(this.props.validator, val)

            if (!areShallowArraysEqual(errMsgs, this.state.errMsgs)) {
                this.setState({errMsgs: errMsgs, })
            }
        }

        render() {
            const { onChange, validator, className, ...passProps } = this.props
            const inputClass = classNames(className, {
                invalid: this.state.errMsgs.length > 0
            })
            return (
                <div className={'with-validation'}>
                    <FormInput onChange={this.onChange} className={inputClass} {...passProps} />
                    <ErrorMessage messages={this.state.errMsgs} />
                </div>
            )
        }
    }
    return WithValidation
}

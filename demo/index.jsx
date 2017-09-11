import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import WithValidation from '../index'

const debug = require('debug')('with-validation:demo-index')

function SelectFlavor(props) {
	return (
		<select {...props}>
			<option value=""></option>
			<option value="choc">Chocolate</option>
			<option value="van">Vanilla</option>
		</select>
	)
}

function InputQuantity({validator, ...passProps}) {
	return (
		<input type="text" {...passProps} />
	)
}

function validateFlavor(val) {
	return val ? '' : 'You must select a flavor!'
}

function validateQuantity(val) {
	return val === 0 || Number.isFinite(Number(val)) ? '' : 'You must type a valid number.'
}

const SelectFlavorWithValidation = WithValidation(SelectFlavor)
const InputQuantityWithValidation = WithValidation(InputQuantity)

class OrderForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			flavor: '',
			quantity: '',
		}
	}

	onChange(ev) {
		this.setState({
			[ev.target.name]: ev.target.value
		})
	}

	render() {
		return (
			<form>
				<label htmlFor="flavor">Flavor</label>
				<SelectFlavorWithValidation name={"flavor"} value={this.state.flavor} validator={validateFlavor} />
				<br />
				<label htmlFor="quantity">Quantity</label>
				<InputQuantityWithValidation name={"quantity"} value={this.state.quantity} validator={validateQuantity} />
			</form>
		)
	}
}

(function mountDemo() {
	const el = document.getElementById('demo-mountpoint')

	if (el) {
		ReactDOM.render(<OrderForm />, el)
	}
})()

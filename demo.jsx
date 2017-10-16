import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import WithValidation from './src/index'

const debug = require('debug')('with-validation:demo-index')

function selectFlavor(props) {
	return (
		<select {...props}>
			<option value=""></option>
			<option value="choc">Chocolate</option>
			<option value="van">Vanilla</option>
		</select>
	)
}

function inputQuantity({validator, ...passProps}) {
	return (
		<input type="text" {...passProps} />
	)
}

const SelectFlavorWithValidation = WithValidation(selectFlavor)
const InputQuantityWithValidation = WithValidation(inputQuantity)

function validateFlavor(val) {
	return val ? '' : 'You must select a flavor!'
}

function validateQuantity(val) {
	return val !== '' && Number.isFinite(Number(val)) ? '' : 'You must type a valid number.'
}

class OrderForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			flavor: '',
			quantity: '',
		}
		this.onChange = this.onChange.bind(this)
	}

	onChange(ev) {
		this.setState({
			[ev.target.name]: ev.target.value
		})
	}

	render() {
		const { quantity, flavor } = this.state
		return (
			<div>
				<form>
					<label htmlFor="flavor">Flavor</label>
					<SelectFlavorWithValidation name={"flavor"} value={flavor} validator={validateFlavor} onChange={this.onChange} />
					<br />
					<label htmlFor="quantity">Quantity</label>
					<InputQuantityWithValidation name={"quantity"} value={quantity} validator={validateQuantity} onChange={this.onChange} />
				</form>
				<br/>
				{	quantity !== '' && flavor !== '' &&
					<p>You have selected {quantity} of {flavor}.</p>
				}
			</div>
		)
	}
}

(function mountDemo() {
	const el = document.getElementById('demo-mountpoint')

	if (el) {
		ReactDOM.render(<OrderForm />, el)
	}
})()

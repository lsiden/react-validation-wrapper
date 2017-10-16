# with-validation
Higher-order component to validate a form field.

## Installation

	npm install with-validation

or

	yarn add with-validation

## Usage

	import withValidation from 'with-validation'

	// Returns an error-message if invalid, otherwise return empty string.
	function validate_required(val) {
		return val === '' ? '' : 'A value is required.'
	}

	// Returns an error-message if invalid, otherwise return empty string.
	function validateNumber(val, xl8) {
		const isValid = val === 0 || !isEmpty(val) && Number.isFinite(Number(val))
		return isValid ? '' : xl8('Type a valid number')
	}

	function MyInput(props) {
		return <input type="text" {...props} />
	}
	const InputWithValidation = withValidation(MyInput)

	function myForm(props) {
		return (
			<form>
				<!-- with one validator -->
				<MyInput name="item" validator={validateRequired} />
				<br />

				<!-- with more than one validator -->
				<MyInput name="quantity" validator={[validateRequired, validateNumber]} />
			</form>
		)
	}

	// Custom error message element.
	// messages={ array of error message }
	function MyErrorMessage({messages}) {
		const content = (messages || []).filter(msg => !!msg).join(', ')
		return content ? <span className="input-error">{content}</span> : null
	}
	MyErrorMessage.propTypes = {
		messages: PropTypes.arrayOf(PropTypes.string).isRequired,
	}
	const InputWithValidationAndCustomErrorMsg = withValidation(MyInput, MyErrorMessage)

	function myForm(props) {
		return (
			<form>
				<InputWithValidationAndCustomErrorMsg name="item" validator={validateRequired} />
			</form>
		)
	}

## Description

WithValidation is a method that returns a
React [higher-order component](https://facebook.github.io/react/docs/higher-order-components.html).
The new component has a single property, *validators*, that accepts either a single
method or an array of methods.
Each method is a validator that accepts a value
and returns an empty string if the value is valid,
or an error-message if the value is not valid.

If the value becomes invalid,
WithValidation will render an error message
with the class "error-message".

WithValidation can take a second, optional argument.
The second argument is a React component that will override the default error message markup.
It must have a property named "messages" that accepts an array of error messages or null.
Use this if the default error-message markup is not adequate for your app's needs.

Here is the default ErrorMessage component as an example:

	export function ErrorMessage({messages}) {
		const content = (messages || []).filter(msg => !!msg).join(', ')
		return content ? <span className="input-error">{content}</span> : null
	}
	ErrorMessage.propTypes = {
		messages: PropTypes.arrayOf(PropTypes.string).isRequired,
	}

## Author
Lawrence Siden  
Westside Consulting LLC  
Ann Arbor, MI  
lsiden@gmail.com

## Copyright
Lawrence Siden, 2017

## License
[MIT](https://opensource.org/licenses/MIT)

# with-validation
Higher-order component to validate a form field.

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

See ErrorMessage component in [demo.jsx](https://github.com/lsiden/with-validation/blob/master/demo.jsx) as an example.

## Installation

	npm install with-validation

or

	yarn add with-validation

## Usage

See [demo.jsx](https://github.com/lsiden/with-validation/blob/master/demo.jsx)

## Demo

See [demo page](https://lsiden.github.io/with-validation/).

## Author
Lawrence Siden  
Westside Consulting LLC  
Ann Arbor, MI  
lsiden@gmail.com

## Copyright
Lawrence Siden, 2017

## License
[MIT](https://opensource.org/licenses/MIT)

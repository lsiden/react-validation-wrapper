'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('./src/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var debug = require('debug')('with-validation:demo-index');

function SelectFlavor(props) {
	return _react2.default.createElement(
		'select',
		props,
		_react2.default.createElement('option', { value: '' }),
		_react2.default.createElement(
			'option',
			{ value: 'choc' },
			'Chocolate'
		),
		_react2.default.createElement(
			'option',
			{ value: 'van' },
			'Vanilla'
		)
	);
}

function InputQuantity(_ref) {
	var validator = _ref.validator,
	    passProps = _objectWithoutProperties(_ref, ['validator']);

	return _react2.default.createElement('input', _extends({ type: 'text' }, passProps));
}

function validateFlavor(val) {
	return val ? '' : 'You must select a flavor!';
}

function validateQuantity(val) {
	return val === 0 || Number.isFinite(Number(val)) ? '' : 'You must type a valid number.';
}

var SelectFlavorWithValidation = (0, _index2.default)(SelectFlavor);
var InputQuantityWithValidation = (0, _index2.default)(InputQuantity);

var OrderForm = function (_React$Component) {
	_inherits(OrderForm, _React$Component);

	function OrderForm(props) {
		_classCallCheck(this, OrderForm);

		var _this = _possibleConstructorReturn(this, (OrderForm.__proto__ || Object.getPrototypeOf(OrderForm)).call(this, props));

		_this.state = {
			flavor: '',
			quantity: ''
		};
		return _this;
	}

	_createClass(OrderForm, [{
		key: 'onChange',
		value: function onChange(ev) {
			this.setState(_defineProperty({}, ev.target.name, ev.target.value));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'form',
				null,
				_react2.default.createElement(
					'label',
					{ htmlFor: 'flavor' },
					'Flavor'
				),
				_react2.default.createElement(SelectFlavorWithValidation, { name: "flavor", value: this.state.flavor, validator: validateFlavor }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					'label',
					{ htmlFor: 'quantity' },
					'Quantity'
				),
				_react2.default.createElement(InputQuantityWithValidation, { name: "quantity", value: this.state.quantity, validator: validateQuantity })
			);
		}
	}]);

	return OrderForm;
}(_react2.default.Component);

(function mountDemo() {
	var el = document.getElementById('demo-mountpoint');

	if (el) {
		_reactDom2.default.render(_react2.default.createElement(OrderForm, null), el);
	}
})();

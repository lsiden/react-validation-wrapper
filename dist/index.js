'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._ErrorMessage = _ErrorMessage;
exports._validate = _validate;

exports.default = function (FormInput) {
    var ErrorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ErrorMessage;

    var WithValidation = function (_React$Component) {
        _inherits(WithValidation, _React$Component);

        function WithValidation(props) {
            _classCallCheck(this, WithValidation);

            var _this = _possibleConstructorReturn(this, (WithValidation.__proto__ || Object.getPrototypeOf(WithValidation)).call(this, props));

            _this.onChange = _this.onChange.bind(_this);
            _this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
            _this.state = _extends({}, props, {
                errMsgs: _validate(props.validator, props.value)
            });
            return _this;
        }

        _createClass(WithValidation, [{
            key: 'onChange',
            value: function onChange(ev) {
                var newVal = ev.target.value;
                this.props.onChange(ev);
                this.updateErrorMessages(newVal);
                this.setState({
                    value: newVal
                });
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                debug('componenetWillReceiveProps()');
                debug(nextProps);
                var value = this.props.value;

                if (nextProps.validator !== this.props.validator) {
                    var errMsgs = _validate(nextProps.validator, value);
                    this.setState({ errMsgs: errMsgs });
                }
            }
        }, {
            key: 'updateErrorMessages',
            value: function updateErrorMessages(val) {
                var errMsgs = _validate(this.props.validator, val);

                if (!(0, _helpers.areShallowArraysEqual)(errMsgs, this.state.errMsgs)) {
                    this.setState({ errMsgs: errMsgs });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    onChange = _props.onChange,
                    validator = _props.validator,
                    className = _props.className,
                    passProps = _objectWithoutProperties(_props, ['onChange', 'validator', 'className']);

                var inputClass = classNames(className, {
                    invalid: this.state.errMsgs.length > 0
                });
                return _react2.default.createElement(
                    'div',
                    { className: 'with-validation' },
                    _react2.default.createElement(FormInput, _extends({ onChange: this.onChange, className: inputClass }, passProps)),
                    _react2.default.createElement(ErrorMessage, { messages: this.state.errMsgs })
                );
            }
        }]);

        return WithValidation;
    }(_react2.default.Component);

    WithValidation.propTypes = {
        validator: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array]).isRequired,
        value: _propTypes2.default.any,
        onChange: _propTypes2.default.func
    };
    WithValidation.defaultProps = {
        onChange: function onChange() {
            return true;
        }
    };
    WithValidation.displayName = 'WithValidation(' + (0, _helpers.getDisplayName)(FormInput) + ')';

    return WithValidation;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug')('with-validation:debug');
var classNames = require('classnames');

function _ErrorMessage(_ref) {
    var messages = _ref.messages;

    var content = (messages || []).filter(function (msg) {
        return !!msg;
    }).join(', ');
    return content ? _react2.default.createElement(
        'span',
        { className: 'input-error' },
        content
    ) : null;
}
_ErrorMessage.propTypes = {
    messages: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired

    // Returns an array of error messages.
    // Export for testing.
};function _validate(_arg, value) {
    if (typeof _arg === 'function') {
        var result = _arg(value);
        return result ? [result] : [];
    } else if ((0, _helpers.isIterable)(_arg)) {
        return _arg.map(function (fn) {
            return fn(value);
        }).filter(function (val) {
            return !!val;
        });
    }
    return [];
}
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
    "react"
    ],
    "rules": {
        "no-unused-vars": ["error", {
            "varsIgnorePattern": "^debug$|^_"
        }],
        "indent": ["error", 4 ],
        "linebreak-style": ["error", "unix"],
        "quotes": ["warn", "single"],
        "semi": ["warn", "never"],
        "no-console": ["warn", {
            "allow": ["assert"]
        }]
    },
    "overrides": {
        "files": ["**/*.spec.js"],
        "globals": {
            "describe": true,
            "it": true,
            "beforeEach": true,
            "expect": true,
        }
    },
    "globals": {
        "require": true,
    },
};

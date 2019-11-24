module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "rules": {
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "indent": ["error", 2],
    "max-len": ["error", 120],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
    "jsx-quotes": ["error", "prefer-single"],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "no-trailing-spaces": "error",
    "no-multi-spaces": "error",
  }
}

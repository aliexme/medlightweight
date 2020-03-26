module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "env": {
    "browser": true,
    "es6": true
  },
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
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "max-len": ["error", 120],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
    "jsx-quotes": ["error", "prefer-single"],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "no-trailing-spaces": "error",
    "no-multi-spaces": "error",
    'react/prop-types': 'off',
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": '@typescript-eslint/parser',
      "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      "rules": {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/member-delimiter-style": ["error", {
          "multiline": { "delimiter": "none" },
          "singleline": { "delimiter": "comma" },
        }],
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}

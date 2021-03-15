module.exports = {
    env: {
      browser: true,
      node: true,
      commonjs: true,
      es2021: true,
    },
    extends: [
      "airbnb",
      "eslint:recommended",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 7,
      sourceType: "module",
    },
    plugins: [
      // '@typescript-eslint',
    ],
    rules: {
      camelcase: "off",
      "import/no-absolute-path": 0,
      "import/no-extraneous-dependencies": 1,
      "no-underscore-dangle": 0,
      semi: [2, "always"],
      // quotes: [2, "double"],
      quotes: 0,
      indent: [0, 2],
      "import/first": 0,
      "linebreak-style": [2, "unix"],
      "max-len": [
        "warn",
        { comments: 200 },
        { code: 120 },
      ],
      "eol-last": 0,
      "prefer-const": 0,
      "import/no-unresolved": 0,
      "import/prefer-default-export": 1,
      "no-return-assign": 1,
      "consistent-return": 1,
      "no-continue": "warn",
      "no-restricted-syntax": "warn",
      "no-case-declarations": "warn",
      "global-require": "warn",
      "object-curly-newline": 0,
      "import/extensions": 0,
      "no-param-reassign": 0,
      "class-methods-use-this": 0,
      "no-console": 0,
      "no-unused-vars": 1,
      "no-shadow": 0,
      "quote-props": 0,
      "no-nested-ternary": 0,
      "no-tabs": 0,
    },
  };

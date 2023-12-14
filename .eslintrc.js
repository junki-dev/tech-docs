module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    "no-constant-condition": "off",
    "no-implicit-coercion": "error",
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-warning-comments": [
      "warn",
      {
        "terms": ["TODO", "FIXME", "XXX", "BUG"],
        "location": "anywhere"
      }
    ],

    "curly": ["error", "all"],
    "no-console": "warn",

    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", ["parent", "sibling"], "index"],
        "pathGroups": [{ "pattern": "@nest/**", "group": "external", "position": "before" }],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always"
      }
    ],

    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "format": ["camelCase", "UPPER_CASE", "PascalCase"],
        "selector": "variable",
        "leadingUnderscore": "allow"
      },
      { "format": ["camelCase", "PascalCase"], "selector": "function" },
      { "format": ["PascalCase"], "selector": "interface" },
      { "format": ["PascalCase"], "selector": "typeAlias" }
    ],
    "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
    "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": [
          "public-static-field",
          "private-static-field",
          "public-instance-field",
          "private-instance-field",
          "public-constructor",
          "private-constructor",
          "public-instance-method",
          "private-instance-method"
        ]
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": { "alwaysTryTypes": true },
      "alias": {
        "map": [
          ["@src", "./src"]
        ]
      }
    }
  }
};

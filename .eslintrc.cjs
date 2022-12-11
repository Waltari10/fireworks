module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard-with-typescript",
  overrides: [],
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": 2,
    "@typescript-eslint/quotes": 0,
    quotes: 0,
    "comma-dangle": 0,
    semi: 0,
    "@typescript-eslint/semi": 0,
    "@typescript-eslint/space-before-function-paren": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/comma-dangle": 0,
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "multiline-comment-style": ["error", "starred-block"],
    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false,
      },
    ],
    "object-curly-newline": [
      "error",
      {
        minProperties: 2,
        multiline: true,
      },
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    semi: ["error", "always"],
    indent: ["error", 2],
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "max-len": [
      2,
      {
        code: 1000,
        ignorePattern: "^import .*",
      },
    ],
    "linebreak-style": [
      "error",
      process.platform === "win32" ? "windows" : "unix",
    ],
  },
};

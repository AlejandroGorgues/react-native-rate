import react from "eslint-plugin-react";
import react_native from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import path from "path";
import js from "@eslint/js"
import { fileURLToPath } from "url";
import { FlatCompat } from '@eslint/eslintrc';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  js.configs.recommended,
  ...compat.config({
    "plugins": ["react", "react-native"],
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "extends": ["plugin:react/recommended","plugin:jest/recommended"],
    "parser": "@babel/eslint-parser",
    "env": {
      "react-native/react-native": true
    },
    "rules": {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    }
  })
];
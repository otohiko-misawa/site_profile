import globals from 'globals';
import pluginJs from '@eslint/js';
//npm install --save-dev eslint-config-prettierしたものをimport
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // ESLint推奨設定を適用(先頭に付けることでRulesで上書きできる)
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        $: 'readonly', //ESLintの$を定義する
      },
    },
    //カスタムルール指定
    rules: {
      eqeqeq: ['error', 'always'], // 厳密な等価演算子を強制
      'no-console': 'warn', // console.log を警告として表示
      camelcase: ['error', { properties: 'never' }], // キャメルケースを強制:プロパティ名はチェックしない
      'no-var': ['error'], // var の使用を禁止
      // "consistent-return": ["error"], // 一貫した return を強制（コメントアウト中）
      // "curly": "error", // ブロック内の中括弧を必須（コメントアウト中）
      // "no-magic-numbers": ["warn", { ignore: [0, 1] }], // マジックナンバーの使用を警告（コメントアウト中）
    },
  },
  //prettierとの競合を防ぐためにのeslint-config-prettier
  eslintConfigPrettier,
];

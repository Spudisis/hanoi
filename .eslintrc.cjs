module.exports = {
  env: { 
    browser: true,
    es2021: true
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // "react/self-closing-comp": "off",
    'react/display-name': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unused-vars" : "off",
    '@typescript-eslint/ban-ts-comment': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react'],
          ['^next'],
          ['^'],
          ['^\\u0000'],
          ['^@/app'],
          ['^@/components'],
          ['^@/features'],
          ['^@/screens'],
          ['^@/shared'],
          ['^\\.\\./'],
          ['^\\./'],
          ['^.+\\.module\\.s?css$']
        ]
      }
    ],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react', '@typescript-eslint/eslint-plugin', 'simple-import-sort', 'jsx-a11y'],

  settings: {
    'jsx-a11y': {
      polymorphicPropName: 'component'
    }
  }
}
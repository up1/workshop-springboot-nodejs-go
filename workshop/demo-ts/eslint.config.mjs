// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    // add any additional rules or overrides here
    // {
    //     rules: {
    //         'no-console': 'warn',
    //         'no-unused-vars': 'warn',
    //         'quotes': ['error', 'single'],
    //         'semi': ['error', 'always'],
    //         // Add more rules as needed
    //     },
    // }
  );
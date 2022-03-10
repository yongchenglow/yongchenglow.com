import { eslint } from '@betterer/eslint';
import { typescript } from '@betterer/typescript';

export default {
  'no more debuggers': () =>
    eslint({ 'no-debugger': 'error' }).include('./src/**/*.ts'),
  'stricter compilation': () =>
    typescript('./tsconfig.json', {
      strict: true,
    }).include('./src/**/*.ts'),
};

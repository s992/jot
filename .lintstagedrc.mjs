export default {
  '*.{js,jsx,ts,tsx}': ['task prettier:fix --', 'task js:lint-fix --'],
  '*.go': ['task go:format --'],
  '*.{html,json,md,yaml,sql}': ['task prettier:fix --'],
};

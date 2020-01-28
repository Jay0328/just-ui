module.exports = {
  '*.@(js|jsx|ts|tsx)': ['prettier --write', 'npm run lint:ts -- --fix'],
  '*.@(css|sass|scss)': ['prettier --write', 'npm run lint:css -- --fix'],
  '*.@(json|md)': ['prettier --write']
};

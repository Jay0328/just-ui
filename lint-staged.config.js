module.exports = {
  '*.@(js|jsx|ts|tsx)': ['prettier --write', 'npm run lint:ts -- --fix', 'git add'],
  '*.@(css|sass|scss)': ['prettier --write', 'npm run lint:css -- --fix', 'git add'],
  '*.@(json|md)': ['prettier --write', 'git add']
};

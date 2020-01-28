const path = require('path');
const fs = require('fs');

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, '..', '..', 'node_modules');
const PACKAGES_PATH = path.resolve(ROOT_PATH, '..');
const CORE_SRC_PATH = path.resolve(PACKAGES_PATH, 'core', 'src');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(ROOT_PATH, '.storybook', 'tsconfig.json')
          }
        },
        {
          loader: 'react-docgen-typescript-loader'
        }
      ],
      include: [SRC_PATH, CORE_SRC_PATH],
      exclude: [NODE_MODULES_PATH]
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('dart-sass')
          }
        }
      ],
      include: [__dirname, SRC_PATH, CORE_SRC_PATH]
    }
  );
  const packagesAlias = ['core'].reduce((acc, package) => {
    acc[`@just-ui/${package}`] = path.resolve(PACKAGES_PATH, package, 'src');
    return acc;
  }, {});
  config.resolve.alias = { ...config.resolve.alias, ...packagesAlias };
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};

/* eslint-disable no-template-curly-in-string */

const babelConfig = {
  presets: ['@babel/preset-react', '@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    '@loadable/babel-plugin',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@emotion/babel-plugin',
    [
      'babel-plugin-formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        removeDefaultMessage: true,
        ast: true,
      },
    ],
    [
      '@babel/plugin-transform-typescript',
      {
        allowNamespaces: true,
      },
    ],
  ],
};

module.exports = babelConfig;

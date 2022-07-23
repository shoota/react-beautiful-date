const path = require('path')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

/** @type {import('@storybook/react/types').StorybookConfig} */
const webpackConfig = {
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  core: { builder: 'webpack5' },
  features: { postcss: false, interactionsDebugger: true },
  stories: [path.join(__dirname, '../src', './**/*.stories.tsx')],
  typescript: { reactDocgen: false },
  // eslint-disable-next-line @typescript-eslint/require-await
  webpackFinal: async config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: [/[/\\\\]node_modules[/\\\\]/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: path.join(__dirname, '../', 'babel.config.js'),
                cacheDirectory: true,
                compact: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      plugins: [
        ...(config.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          configFile: path.join(__dirname, '../', 'tsconfig.json'),
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        }),
      ],
    },
  }),
}

module.exports = webpackConfig

import babel from 'rollup-plugin-babel'
import flowEntry from 'rollup-plugin-flow-entry'
import json from 'rollup-plugin-json'

import packageJson from './package.json'

const babelOptions = {
  babelrc: false,
  presets: ['@babel/preset-flow'],
  plugins: ['@babel/plugin-proposal-object-rest-spread']
}

const external = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies),
  'buffer',
  'crypto',
  'events',
  'net',
  'tls'
]

export default [
  // Node build:
  {
    external,
    input: './src/platform/node/index.js',
    output: { file: packageJson.main, format: 'cjs', sourcemap: true },
    plugins: [json(), babel(babelOptions), flowEntry()]
  },

  // React Native io stub:
  {
    external,
    input: './src/platform/react-native/react-native-io.js',
    output: {
      file: './lib/react-native-io.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [json(), babel(babelOptions), flowEntry()]
  }
]

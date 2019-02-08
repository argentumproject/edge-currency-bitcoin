// @flow

import type { EdgeCorePluginOptions } from 'edge-core-js'

import { makeEdgeCorePlugins } from '../../plugin/currencyPlugin.js'

window.addEdgeCorePlugins(
  makeEdgeCorePlugins((opts: EdgeCorePluginOptions) => {
    const nativeIo = opts.nativeIo['edge-currency-bitcoin']
    if (nativeIo == null) {
      throw new Error('React Native Bitcoin IO object not loaded')
    }

    const { pbkdf2, secp256k1, makeSocket } = nativeIo
    return { ...opts.io, pbkdf2, secp256k1, makeSocket }
  })
)

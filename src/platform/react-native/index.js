// @flow

import { makeEdgeCorePlugins } from '../../plugin/currencyPlugin.js'

window.addEdgeCorePlugins(
  makeEdgeCorePlugins(io => {
    const flowHack: any = io
    if (
      flowHack.makeSocket == null ||
      flowHack.pbkdf2 == null ||
      flowHack.secp256k1 == null
    ) {
      throw new Error('React Native Bitcoin IO object not loaded')
    }
    return flowHack
  })
)

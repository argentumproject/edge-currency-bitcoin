// @flow

import { makeEdgeCorePlugins } from '../../plugin/currencyPlugin.js'
import { makeCustomIo } from './io.js'

export const edgeCorePlugins = makeEdgeCorePlugins(io => ({
  ...io,
  ...makeCustomIo()
}))

// @flow

import { makeEdgeCorePlugins } from '../../plugin/currencyPlugin.js'
import { makeNodeIo } from './node-io.js'

const edgeCorePlugins = makeEdgeCorePlugins(opts => makeNodeIo(opts.io))

export default edgeCorePlugins

// @flow

import { Buffer } from 'buffer'

import type {
  EdgeCorePluginOptions,
  EdgeCreatePrivateKeyOptions,
  EdgeCurrencyEngine,
  EdgeCurrencyEngineOptions,
  EdgeCurrencyInfo,
  EdgeCurrencyPlugin,
  EdgeCurrencyPluginFactory,
  EdgeEncodeUri,
  EdgeIo,
  EdgeParsedUri,
  EdgeWalletInfo
} from 'edge-core-js'

import {
  CurrencyEngine,
  type EngineCurrencyInfo
} from '../engine/currencyEngine.js'
import { allInfo } from '../info/all.js'
import { type CustomIo } from '../platform/customIo.js'
import {
  type BcoinCurrencyInfo,
  addNetwork,
  patchCrypto
} from '../utils/bcoinExtender/bcoinExtender.js'
import {
  getForksForNetwork,
  getFromatsForNetwork,
  keysFromEntropy
} from '../utils/coinUtils.js'
import { getXPubFromSeed } from '../utils/formatSelector.js'
import { PluginState } from './pluginState.js'
import { encodeUri, parseUri } from './uri.js'

type PluginTable = { [pluginName: string]: EdgeCurrencyPluginFactory }

export type CurrencyPluginFactorySettings = {
  currencyInfo: EdgeCurrencyInfo,
  engineInfo: EngineCurrencyInfo,
  bcoinInfo: BcoinCurrencyInfo
}

export type CurrencyPluginSettings = {
  currencyInfo: EdgeCurrencyInfo,
  engineInfo: EngineCurrencyInfo
}

/**
 * The core currency plugin.
 * Provides information about the currency,
 * as well as generic (non-wallet) functionality.
 */
export class CurrencyPlugin {
  currencyInfo: EdgeCurrencyInfo
  engineInfo: EngineCurrencyInfo
  network: string
  pluginName: string
  io: EdgeIo & CustomIo
  state: PluginState

  // ------------------------------------------------------------------------
  // Private API
  // ------------------------------------------------------------------------
  constructor (
    io: EdgeIo & CustomIo,
    { currencyInfo, engineInfo }: CurrencyPluginSettings
  ) {
    // Validate that we are a valid EdgeCurrencyPlugin:
    // eslint-disable-next-line no-unused-vars
    const test: EdgeCurrencyPlugin = this

    // Public API:
    this.currencyInfo = currencyInfo
    this.pluginName = currencyInfo.pluginName
    console.log(`Creating Currency Plugin for ${this.pluginName}`)
    // Private API:
    this.io = io
    this.engineInfo = engineInfo
    this.network = engineInfo.network
    const { defaultSettings, pluginName, currencyCode } = this.currencyInfo
    this.state = new PluginState({
      io,
      defaultSettings,
      currencyCode,
      pluginName
    })
  }

  // ------------------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------------------
  createPrivateKey (walletType: string, opts?: EdgeCreatePrivateKeyOptions) {
    const randomBuffer = Buffer.from(this.io.random(32))
    return keysFromEntropy(randomBuffer, this.network, opts)
  }

  async derivePublicKey (walletInfo: EdgeWalletInfo) {
    if (!walletInfo.keys) throw new Error('InvalidKeyName')
    const network = this.network
    const { format, coinType = -1 } = walletInfo.keys
    if (!format || !getFromatsForNetwork(network).includes(format)) {
      throw new Error('InvalidWalletType')
    }
    const seed = walletInfo.keys[`${network}Key`] || ''
    if (!seed) throw new Error('InvalidKeyName')
    const xpub = await getXPubFromSeed({ seed, network, format, coinType })
    return { ...walletInfo.keys, [`${network}Xpub`]: xpub }
  }

  async makeEngine (
    walletInfo: EdgeWalletInfo,
    options: EdgeCurrencyEngineOptions
  ): Promise<EdgeCurrencyEngine> {
    const engine = new CurrencyEngine({
      walletInfo,
      engineInfo: this.engineInfo,
      pluginState: this.state,
      options,
      io: this.io
    })
    await engine.load()
    return engine
  }

  parseUri (uri: string): EdgeParsedUri {
    return parseUri(uri, this.network, this.currencyInfo)
  }

  encodeUri (obj: EdgeEncodeUri): string {
    return encodeUri(obj, this.network, this.currencyInfo)
  }

  getSplittableTypes (walletInfo: EdgeWalletInfo): Array<string> {
    const { keys: { format = 'bip32' } = {} } = walletInfo
    const forks = getForksForNetwork(this.network)
    return forks
      .filter(network => getFromatsForNetwork(network).includes(format))
      .map(network => `wallet:${network}`)
  }

  async changeSettings (settings: Object): Promise<mixed> {
    return this.state.updateServers(settings)
  }
}

const makeCurrencyPluginFactory = (
  { currencyInfo, engineInfo, bcoinInfo }: CurrencyPluginFactorySettings,
  customizeIo: (io: EdgeIo) => CustomIo & EdgeIo
) => {
  addNetwork(bcoinInfo)
  return {
    pluginType: 'currency',
    currencyInfo: currencyInfo,
    pluginName: currencyInfo.pluginName,
    makePlugin: async (
      options: EdgeCorePluginOptions
    ): Promise<EdgeCurrencyPlugin> => {
      const io: CustomIo & EdgeIo = customizeIo(options.io)

      // Create a core plugin given the currencyInfo and plugin options
      const plugin = new CurrencyPlugin(io, { currencyInfo, engineInfo })
      // Extend bcoin to support this plugin currency info
      // and faster crypto if possible
      const { secp256k1, pbkdf2 } = io
      patchCrypto(secp256k1, pbkdf2)
      // Return the plugin after it finished loading from cache
      return plugin.state.load().then(() => plugin)
    }
  }
}

export function makeEdgeCorePlugins (
  customizeIo: (io: EdgeIo) => CustomIo & EdgeIo
): PluginTable {
  const out: PluginTable = {}
  for (const info of allInfo) {
    const pluginName = info.currencyInfo.pluginName
    out[pluginName] = makeCurrencyPluginFactory(info, customizeIo)
  }
  return out
}

// @flow
import type { AbcCurrencyInfo } from 'edge-core-js'

export const feathercoinInfo: AbcCurrencyInfo = {
  // Basic currency information:
  currencyCode: 'FTC',
  currencyName: 'Feathercoin',
  pluginName: 'feathercoin',
  denominations: [
    { name: 'FTC', multiplier: '100000000', symbol: 'F' },
    { name: 'mFTC', multiplier: '100000', symbol: 'mF' }
  ],
  walletTypes: [
    // 'wallet:feathercoin-bip49', // Disable creating segwit wallets for now
    'wallet:feathercoin-bip44',
    'wallet:feathercoin'
  ],

  // Configuration options:
  defaultSettings: {
    forks: [],
    network: {
      type: 'feathercoin',
      magic: 0xd9b4bef9,
      keyPrefix: {
        privkey: 0x80,
        xpubkey: 0x0488bc26,
        xprivkey: 0x0488daee,
        xpubkey58: 'xpub',
        xprivkey58: 'xprv',
        coinType: 8
      },
      addressPrefix: {
        pubkeyhash: 0x0e,
        scripthash: 0x05,
        witnesspubkeyhash: 0x06,
        witnessscripthash: 0x0a,
        bech32: 'fc'
      }
    },
    customFeeSettings: ['satPerByte'],
    gapLimit: 10,
    maxFee: 1000000,
    defaultFee: 1000,
    feeUpdateInterval: 60000,
    feeInfoServer: '',
    infoServer: '',
    simpleFeeSettings: {
      highFee: '1200',
      lowFee: '400',
      standardFeeLow: '600',
      standardFeeHigh: '800',
      standardFeeLowAmount: '2000000000',
      standardFeeHighAmount: '98100000000'
    },
    electrumServers: [
      'electrum://electrumx-ch-1.feathercoin.ch:50001',
      'electrum://electrumx-de-2.feathercoin.ch:50001',
      'electrum://electrumxftc.trezarcoin.com:50001',
      'electrum://electrum.feathercoin.network:50001'
    ]
  },
  metaTokens: [],

  // Explorers:
  addressExplorer: 'https://fsight.chain.tips/address/%s',
  blockExplorer: 'https://fsight.chain.tips/block/%s',
  transactionExplorer: 'https://fsight.chain.tips/tx/%s',

  // Images:
  symbolImage:
    'data:image/png;base64,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',
  symbolImageDarkMono:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAAAmJLR0QAjE6D7DkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiBAYIBxbyNZsbAAAFWUlEQVRYw8WYe2wURRzHvzM7ew/65OjD0oItCiVgUeMDiVZjIraEGAQE0zSiFEwRMZFoNDExwfQPA4kYsRYoYGLU+H6BlWpITIoPLCAQgijYEh49aaFHe1zvtTsz/kFtuOve3dxeG7/31+7Nzmd/j/3Nb4ZIFwkjDTUTEI142GXBZC4mYCKRslf0SDfWSPVZpJNIQpQe2EWHtDwWqYhU4x55N5/FQUCgQQP1iuPymNbp7BR9EV7GH1WYTxKiZKXudkXmmcv5I6Io8awE9Jj+pf65OOsMNYhUc6YEtzjcJYHlfC0vV/MkAftB2ywOlg4sFbbBH2hXi/gK4yXuQZrS9umbtIPPDNgC78wK1xgbeBVsiUB/l26u+HMhTxO8bWr0BWOtZMhAmpetz25f6bf8zzrniudGtph1kiIjyRyxjMvFJ/cEFMEF8423+TyMiXi1LFt08NtBBfBbDxlviDkYM/FbxLTHDuweSAF+58Hom3IMsQAgKnnF4z9+M3T9vbgobp1jbBxrLAAYi/xNbc6EFrcWhjea8zEuklX+6N79lhbvcEZW8mUYJ0mHsW7rAkuwcZvxssT4SZSEX/wof5Srt2Tz1/ldCkUBDJrSj2JUsS4OR/5z93Dl+kq7WBNsS22vA5XIh1Cwj6APp0bdpUfy6xr+AoDhknjWTZ5TcXMWquFWdO0BC7CcFXgSr4zEuI24Zpu1KpNNUMYC3Zadh1m9s3QE3OWM1KvYq6FQ/cvFJevsnjlUOwJ2OEW9ymQ6SpTBvTCtwQXi/uEYb6fGncJjBxzAQIKVleBk4i+6smX22hMMMKhYoPb9ujAx5vpv/A6WIKf9iacpN+/ACQaYGu5VwdK4CIfhxRU7NaxYzAQokKOL21UeYHGO9mPQXvGELAUoYE4RTnvgK3arZ2HrZNpCjBuVmmvoKI65HkDI7oKRLwsYAZ0ilUpgQWzJRxZuskwtilPgySfLjuSxqEJTf614TI57kWmYavmCg+hKBXbTbMZVW9VRYCesU+OcwiIiJKVqBkNTrloXFMAETIeEitWTrDthC/WkBpuayRiEP31HJ1YQwdSDroorrFFu6yKQKatWLLgfhxGwCBJBCAr7fL/uY4DzXFABXBpz7cPxDLovcrnwIgXCA7Q71dDcmAwW9mvWtdXMuyREgaigv6QaWhoXx8uZtJuD9DRAARfX2tNzdBD9mVh8Xj8OUKBRaD9RntziyWNoMem++dBw68P7aHvy3jI3bl0S9rFB2vlweBjsjuo7kg2OdXQIfZlEuNvZNtLsNXBygJ1STa1QBo4mgv665uh1eyenj21SB1+yb+8Zx3sxm7ZVBr5nRxK1eJPiesuoXXs563j257jdYoVXb7Jep2IzOppBhMmZnI2jtqkLBetgu6yGF4PDGP6ZCKDXLvaqvu3ahm3UOVdLVfQLc3r8A7PgGanlBEH8gbAdLtf2rF+c8ICteWH0M+HGOIieKHmgrj/h4cv0dvY8GQ9sT259XX+SU58aXva+49WxRlOfZ/XqYynOuT4xGzuHTHlfpseJ12H/8TQ8tVfhZO9j87uOw345V45FrAU9nbNkVYflqmyt5qXRDWI2MvI6CdL9RU/UX0rQDiTS9srga6JG5tuEStLjaF3XlKQPSabmhujTskpmpY31ar/lNK06krQBSq5Pi/tWR2vlDFmkiDRxgR7Sd61rT9l5pdaH+b5F5gI5Q5ahUCZDeslZetS1e80+pZZPVa1VobniVpTLQuQhR+oki+gyIgMkIv3ER3ppFz2U17GiXzUHGDHTid7XWRfL+Q2iQDrh0Vw8IH00SHr1C43n09ohM0gd/4Ok/i/2iud+ATMltgAAAABJRU5ErkJggg=='
}

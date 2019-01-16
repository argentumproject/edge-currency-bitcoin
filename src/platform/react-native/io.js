// @flow
// The native code will use this file to set up the IO object
// before sending it across the bridge to the core side.

// $FlowFixMe
import { pbkdf2, secp256k1 } from 'react-native-fast-crypto'
// $FlowFixMe
import { Socket } from 'react-native-tcp'
import { bridgifyObject } from 'yaob'

import {
  type CustomIo,
  type EdgeSocket,
  type EdgeSocketOptions,
  makeEdgeSocket
} from '../customIo.js'

export function makeCustomIo (): CustomIo {
  bridgifyObject(pbkdf2)
  bridgifyObject(secp256k1)

  return {
    pbkdf2,
    secp256k1,

    makeSocket (opts: EdgeSocketOptions): Promise<EdgeSocket> {
      let socket: net$Socket
      if (opts.type === 'tcp') socket = new Socket()
      else if (opts.type === 'tls') throw new Error('No TLS support')
      else throw new Error('Unsupported socket type')

      return Promise.resolve(makeEdgeSocket(socket, opts))
    }
  }
}

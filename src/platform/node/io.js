// @flow

import { Socket } from 'net'
import { TLSSocket } from 'tls'

import { crypto } from 'bcoin'

import {
  type CustomIo,
  type EdgeSocket,
  type EdgeSocketOptions,
  makeEdgeSocket
} from '../customIo.js'

export function makeCustomIo (): CustomIo {
  const { secp256k1, pbkdf2 } = crypto

  return {
    pbkdf2,
    secp256k1,

    makeSocket (opts: EdgeSocketOptions): Promise<EdgeSocket> {
      let socket: net$Socket
      if (opts.type === 'tcp') socket = new Socket()
      else if (opts.type === 'tls') socket = new TLSSocket(new Socket())
      else throw new Error('Unsupported socket type')

      return Promise.resolve(makeEdgeSocket(socket, opts))
    }
  }
}

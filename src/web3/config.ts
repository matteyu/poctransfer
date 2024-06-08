import { createConfig, http } from 'wagmi'
import { holesky } from 'wagmi/chains'
import { createPublicClient, createWalletClient, custom, createClient } from 'viem'
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [holesky],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
  connectors: [
    injected(),
  ],
});

export const client = createWalletClient({
  chain: holesky,
  transport: custom(window.ethereum!)
})
export const publicClient = createPublicClient({ 
    chain: holesky,
    transport: http()
  })
export const [account] = await client.getAddresses()
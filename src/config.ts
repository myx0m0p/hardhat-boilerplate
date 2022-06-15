import { NomicLabsHardhatPluginError } from 'hardhat/plugins'

export enum NetworkID {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  // Binance Smart Chain
  BSC = 56,
  BSC_TESTNET = 97,
  // Huobi ECO Chain
  //HECO = 128,
  //HECO_TESTNET = 256,
  // Fantom mainnet
  //OPERA = 250,
  // Optimistim
  //OPTIMISTIC_ETHEREUM = 10,
  //OPTIMISTIC_KOVAN = 69,
  // Polygon
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  // Arbitrum
  //ARBITRUM_ONE = 42161,
  //Hardhat
  HARDHAT = 31337,
  GANACHE = 1337,
}

const multicallAddress: { [networkID in NetworkID]?: string | undefined } = {
  [NetworkID.MAINNET]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.ROPSTEN]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.RINKEBY]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.GOERLI]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.KOVAN]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.BSC]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.BSC_TESTNET]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.POLYGON]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  [NetworkID.POLYGON_MUMBAI]: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
}

export async function getMulticallAddress(networkId: string): Promise<string> {
  const chainID = parseInt(networkId) as NetworkID

  const address = multicallAddress[chainID]

  if (address === undefined) {
    throw new NomicLabsHardhatPluginError(
      'Multicall Address',
      `The multicall address could not be found for this network. ChainID: ${chainID}.`
    )
  }

  return address
}

export async function getNetworkName(chainID: string): Promise<string> {
  const networkId = parseInt(chainID)

  if (networkId === undefined) {
    throw new NomicLabsHardhatPluginError(
      'Network Name',
      `The network ID could not be found for this network. ChainID: ${chainID}.`
    )
  }

  return NetworkID[networkId]
}

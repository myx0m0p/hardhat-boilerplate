require('dotenv').config()

import 'hardhat-deploy'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import 'hardhat-tracer'
import 'solidity-coverage'

import { HardhatUserConfig } from 'hardhat/config'

const INFURA_API_KEY = process.env.INFURA_API_KEY || ''

const MAINNET_MNEMONIC = process.env.MAINNET_MNEMONIC || ''
const TESTNET_MNEMONIC = process.env.TESTNET_MNEMONIC || ''

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || ''
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ''

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    localhost: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: MAINNET_MNEMONIC,
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    bsc: {
      url: `https://rpc.ankr.com/bsc`,
      saveDeployments: true,
      accounts: {
        mnemonic: MAINNET_MNEMONIC,
      },
      //gasPrice: 6000000000,
    },
    bsctest: {
      url: `https://data-seed-prebsc-2-s3.binance.org:8545`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
    polygon: {
      url: `https://rpc.ankr.com/polygon`,
      saveDeployments: true,
      accounts: {
        mnemonic: MAINNET_MNEMONIC,
      },
    },
    mumbai: {
      url: `https://rpc.ankr.com/polygon_mumbai`,
      saveDeployments: true,
      accounts: {
        mnemonic: TESTNET_MNEMONIC,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      ropsten: ETHERSCAN_API_KEY,
      rinkeby: ETHERSCAN_API_KEY,
      kovan: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

export default config

import hre from 'hardhat'
import { tokenToWei } from '../src/utils'

import { TestERC20 } from '../typechain-types'

async function main() {
  const { getNamedAccounts, ethers } = hre
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner(deployer)

  const sampleInstance = (await ethers.getContract('TestERC20', signer)) as TestERC20

  console.log('sampleInstance instance loaded at %s', sampleInstance.address)

  const supply = await sampleInstance.totalSupply()

  if (supply.eq(0)) {
    console.log('[Token] Minting new tokens...')
    await sampleInstance.setBalance(deployer, tokenToWei(1000))
  } else {
    console.log('[Token] Minting skipped...')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { sleep } from '../src/utils'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, run } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  //const args: any[] = [];
  const args = ['Test Token', 'TKN']

  const token = await deploy('TestERC20', {
    from: deployer,
    args,
    log: true,
  })

  const isTest = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

  if (!isTest) console.log('Token deployed successfully: ', token.address)

  if (!isTest) {
    try {
      console.log('Waiting to verify...')

      await sleep(25000)

      await run('verify:verify', {
        address: token.address,
        constructorArguments: args,
        //contract: 'contracts/test/TestERC20.sol:TestERC20',
      })
    } catch (err) {
      console.log(err)
    }
  }
  if (!isTest) console.log('Done')
}

export default func
func.tags = ['Sample', 'ERC20']

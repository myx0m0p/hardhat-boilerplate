import { expect } from './shared/chai-setup'
import hre, { getUnnamedAccounts, deployments } from 'hardhat'

import { Address } from 'hardhat-deploy/types'

import { TestERC20 } from '../typechain-types'
import { tokenToWei } from '../src/utils'

type SetupParams = {
  deployer: Address
  alice: Address
  bob: Address
  carol: Address
  token: TestERC20
  aliceToken: TestERC20
  bobToken: TestERC20
  carolToken: TestERC20
}

const setupTest = deployments.createFixture<SetupParams, unknown>(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    await deployments.fixture(['Sample', 'ERC20'])

    const { deployer } = await getNamedAccounts()
    const accounts = await getUnnamedAccounts()

    const alice = accounts[0]
    const bob = accounts[1]
    const carol = accounts[2]

    hre.tracer.nameTags[ethers.constants.AddressZero] = 'Zero'
    hre.tracer.nameTags[deployer] = 'Deployer'
    hre.tracer.nameTags[alice] = 'Alice'
    hre.tracer.nameTags[bob] = 'Bob'
    hre.tracer.nameTags[carol] = 'Carol'

    const token = (await ethers.getContract('TestERC20', deployer)) as TestERC20

    hre.tracer.nameTags[token.address] = 'TestERC20'

    const aliceToken = await token.connect(await ethers.getSigner(alice))
    const bobToken = await token.connect(await ethers.getSigner(bob))
    const carolToken = await token.connect(await ethers.getSigner(carol))

    return {
      deployer,
      alice,
      bob,
      carol,
      token,
      aliceToken,
      bobToken,
      carolToken,
    }
  }
)

describe('TestERC20 tests', () => {
  let _: SetupParams

  beforeEach(async () => {
    _ = await setupTest()
  })

  describe('Nested test', () => {
    beforeEach(async () => {
      await _.token.setBalance(_.alice, tokenToWei(1000))
    })

    it('balanceOf', async () => {
      const balanceOfAlice = await _.token.balanceOf(_.alice)
      expect(balanceOfAlice).to.be.eq(tokenToWei(1000))

      expect(await _.token.balanceOf(_.bob)).to.be.eq(0)
    })

    it('Transfer Event', async () => {
      await expect(_.aliceToken.transfer(_.bob, tokenToWei(1)))
        .to.emit(_.token, 'Transfer')
        .withArgs(_.alice, _.bob, tokenToWei(1))
    })

    it('Transfer Revert', async () => {
      await expect(_.bobToken.transfer(_.alice, tokenToWei(1000))).to.be.revertedWith(
        'ERC20: transfer amount exceeds balance'
      )
    })
  })
})

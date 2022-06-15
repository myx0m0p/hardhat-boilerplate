const { ethers } = require("hardhat")

const { BigNumber } = ethers

export async function advanceBlock() {
  return ethers.provider.send("evm_mine", [])
}

export async function advanceBlockTo(blockNumber: number) {
  for (let i = await ethers.provider.getBlockNumber(); i < blockNumber; i++) {
    await advanceBlock()
  }
}

export async function advanceBlockWith(blockCount: number) {
  const currentBlockNumber = await ethers.provider.getBlockNumber()
  const newBlockNumber = currentBlockNumber + blockCount
  await advanceBlockTo(newBlockNumber)
}

export async function increase(value: any) {
  await ethers.provider.send("evm_increaseTime", [value.toNumber()])
  await advanceBlock()
}

export async function latest() {
  const block = await ethers.provider.getBlock("latest")
  return BigNumber.from(block.timestamp)
}

export async function latestBlock() {
  const block = await ethers.provider.getBlock("latest")
  return block
}

export async function latestBlockNumber() {
  const block = await ethers.provider.getBlock("latest")
  return block.number
}

export async function advanceTimeAndBlock(time: number) {
  await advanceTime(time)
  await advanceBlock()
}

export async function advanceTime(time: number) {
  await ethers.provider.send("evm_increaseTime", [time])
}

export const duration = {
  seconds: function (val: string) {
    return BigNumber.from(val)
  },
  minutes: function (val: string) {
    return BigNumber.from(val).mul(this.seconds("60"))
  },
  hours: function (val: string) {
    return BigNumber.from(val).mul(this.minutes("60"))
  },
  days: function (val: string) {
    return BigNumber.from(val).mul(this.hours("24"))
  },
  weeks: function (val: string) {
    return BigNumber.from(val).mul(this.days("7"))
  },
  years: function (val: string) {
    return BigNumber.from(val).mul(this.days("365"))
  },
}

# Hardhat Boilerplate

- [Hardhat](https://github.com/nomiclabs/hardhat): with plugins (hardhat-deploy, hardhat-deploy-ethers, hardhat-etherscan, hardhat-tracer)
- [TypeChain](https://github.com/ethereum-ts/TypeChain): contract types generation
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
- [Solcover](https://github.com/sc-forks/solidity-coverage): code coverage
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter
- [@0xsequence/multicall](https://github.com/0xsequence/sequence.js): An Ethereum provider wrapper that aggregates multiple operations in one, reducing the network load on clients and servers.

## Usage

### Before

Create a `.env` file and from `.env.example`.

Install:

```sh
$ yarn
```

### Compile

Compile the smart contracts and generate types:

```sh
$ yarn compile
```

### Start local node

Start and deploy the contracts:

```sh
$ yarn node
```

### Test

Run the Mocha tests:

```sh
$ yarn test test/Sample.spec.ts
```

There is sample test with fixtures which greatly increases tests speed for large contracts and/or complex setup.

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Deploy

Deploy the contracts:

```sh
$ yarn deploy --network <network_name> --tags <deploy_tags>
```

There is sample deploy script in deploy directory.

### Setup

Run setup script:

```sh
$ yarn setup scripts/000-setup-sample.ts --network <network_name>
```

There is sample setup script as well.

### Notes

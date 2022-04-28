require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const private_key = [
  process.env.PRIVATE_KEY_0,
  process.env.PRIVATE_KEY_1,
]


module.exports = {
  contracts_build_directory: "./client/public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider({
          privateKeys: private_key ,
          providerOrUrl: 'https://rinkeby.infura.io/v3/ce71593d5f1e4f4c939d498531303136',
          numberOfAddress: 2
      }),
      network_id: 4,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    ropsten: {
    provider: () => new HDWalletProvider({
      privateKeys: private_key ,
      providerOrUrl: 'wss://ropsten.infura.io/ws/v3/ce71593d5f1e4f4c939d498531303136',
      numberOfAddress: 2
    }),
    network_id: 3,       // Ropsten's id
    gas: 5500000,        // Ropsten has a lower block limit than mainnet
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200,// # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

 
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this hight gas value
      gasPrice: 0x01 // <-- Use this low gas price
    }
  },

  plugins: ["solidity-coverage"],
 
  compilers: {
    solc: {
      version: "0.8.7+commit.e28d00a7.Emscripten.clang",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};

import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      network: "mainnet",
      rpc: {
        1: "https://mainnet.infura.io/v3/",
        56: "https://bsc-dataseed1.binance.org",
        137: "https://polygon-rpc.com"
      }
    }
  }
};

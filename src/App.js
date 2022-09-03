import React, { useState, useEffect } from "react";
import "./styles.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import networkParams from "./networks";
import { providerOptions } from "./providerOptions";
import { toHex, hexToNumber } from "./utils";

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

export default function App() {
  const [connectWallet, setConnectWallet] = useState({
    status: false,
    address: "",
    balance: "200"
  });
  const [provider, setProvider] = useState();
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [token, setToken] = useState();
  console.log(token);

  const wallet = async (web3) => {
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      setProvider(provider);
      const chainId = await web3.eth.getChainId();
      setChainId(chainId);
      console.log(`welcome, you are connected to ${chainId}`);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setConnectWallet((value) => ({ ...value, address: accounts[0] }));
      setConnectWallet((value) => ({ ...value, status: true }));
    } catch (error) {
      console.error(error);
    }
  };

  const disconnect = async () => {
    // await provider.close();
    await web3Modal.clearCachedProvider();
    setProvider(null);
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      wallet();
    }
  }, []);

  useEffect(() => {
    switchNetwork();
  }, [network]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts)
          setConnectWallet((value) => ({ ...value, address: accounts[0] }));
        // wallet();
      };

      const handleChainChanged = (chainId) => {
        setChainId(hexToNumber(chainId));
        console.log(`provider switched to ${chainId}`);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  function handleNetwork(event) {
    const id = event.target.value;
    setNetwork(id);
  }

  function handleToken(event) {
    const id = event.target.value;
    setToken(id);
  }

  const switchNetwork = async () => {
    try {
      const switchednetwork = await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: toHex(network)
          }
        ]
      });
      const web3 = new Web3(provider);
      const chainId = await web3.eth.getChainId();
      console.log(`switched to ${chainId}`);
      setChainId(chainId);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="App">
      <Navbar address={connectWallet.address} disconnect={disconnect} />
      <Card
        connectWallet={connectWallet}
        handleConnect={wallet}
        handleNetwork={handleNetwork}
        handleToken={handleToken}
        chainId={chainId}
      />
    </div>
  );
}

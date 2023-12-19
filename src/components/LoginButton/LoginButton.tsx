import React, { useState } from "react";
import { LoginButtonProps } from "./LoginButton.types";
import { ethers } from 'ethers';
import { Spinner } from "../Spinner";

export function LoginButton ({
  style,
  disabled
}: React.PropsWithChildren<LoginButtonProps>) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const buttonStyle = {
    width: 'fit-content',
    minWidth: "135px",
    padding: '8px 12px',
    backgroundColor: "#0077FF",
    color: "#FFFFFF",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  };

  const beautifyAddress = (address: string): string => {
    return `${address.slice(0, 10)}...${address.slice(-8)}`; 
  }

  async function connectWallet() {
    if (!isConnected) {
      setIsLoading(true);
      try {
        // Connect the wallet using ethers.js
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        const signature = await signer.signMessage("Message to sign");

        setIsConnected(true);
        setWalletAddress(address);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
  }

  async function disconnectWallet() {
    if (isConnected) {
      // Disconnect the wallet
      (window as any).ethereum.selectedAddress = null;
      setIsConnected(false);
      setWalletAddress("");
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      style={{ ...buttonStyle, ...style }}
      onClick={connectWallet}
    >
      {isLoading ? <Spinner/> : isConnected ? beautifyAddress(walletAddress) : "Connect wallet"}
    </button>
  );
};
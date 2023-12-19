import React, { useState } from "react";
import { LoginButtonProps } from "./LoginButton.types";
import { ethers } from 'ethers';
import { Spinner } from "../Spinner";
import { CoreService } from '../../services';

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

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
        
        const message = await CoreService.getMessage();
        const signature = await signer.signMessage(message);
        const isValid = await CoreService.verifyMessage(signature);

        if (!isValid) throw new Error("Invalid signature");

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
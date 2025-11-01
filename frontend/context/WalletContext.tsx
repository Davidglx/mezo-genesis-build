import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setWalletAddress,
  setChainId,
  setBalance,
  setMusdBalance,
  disconnectWallet as disconnectWalletAction,
} from '../store/address/address.reducer';

interface WalletContextType {
  account: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string | null;
  musdBalance: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

const MUSD_ADDRESS = "0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503";
const MEZO_TESTNET_CHAIN_ID = 31611;
const DISCONNECTED_FLAG = 'wallet_manually_disconnected';

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const walletState = useSelector((state: RootState) => state.wallet);
  
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize wallet from persisted state
  useEffect(() => {
    const initWallet = async () => {
      if (isInitialized) return;
      
      // Check if user manually disconnected
      const wasManuallyDisconnected = localStorage.getItem(DISCONNECTED_FLAG) === 'true';
      
      if (wasManuallyDisconnected || !walletState.address || typeof window.ethereum === 'undefined') {
        setIsInitialized(true);
        return;
      }

      try {
        // Check if MetaMask is already connected WITHOUT prompting
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts'
        });
        
        // Only proceed if there are connected accounts
        if (accounts.length > 0) {
          const connectedAddress = accounts[0].toLowerCase();
          
          if (connectedAddress === walletState.address.toLowerCase()) {
            // Create provider WITHOUT calling any methods that might prompt
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider);
            
            // Get chainId directly from ethereum object (no provider call needed)
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            dispatch(setChainId(parseInt(chainId, 16)));
            
            // Update balances
            await updateBalancesWithoutSigner(provider, walletState.address);
            
            console.log('✅ Wallet auto-reconnected:', walletState.address);
          } else {
            console.log('Address mismatch, clearing wallet state');
            dispatch(disconnectWalletAction());
          }
        } else {
          console.log('No connected accounts, clearing wallet state');
          dispatch(disconnectWalletAction());
        }
      } catch (error) {
        console.error('Error initializing wallet:', error);
        dispatch(disconnectWalletAction());
      }
      
      setIsInitialized(true);
    };

    initWallet();
  }, []);

  // Listen for account and chain changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0].toLowerCase() !== walletState.address?.toLowerCase()) {
        // Clear the disconnected flag since user is switching accounts
        localStorage.removeItem(DISCONNECTED_FLAG);
        dispatch(setWalletAddress(accounts[0]));
        setSigner(null);
        if (provider) {
          updateBalancesWithoutSigner(provider, accounts[0]);
        }
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      dispatch(setChainId(parseInt(chainIdHex, 16)));
      // Optionally reload or just update the state
      // window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [walletState.address, provider]);

  // Update balances when account changes
  useEffect(() => {
    if (walletState.address && provider && isInitialized) {
      updateBalancesWithoutSigner(provider, walletState.address);
    }
  }, [walletState.address, provider, isInitialized]);

  const updateBalancesWithoutSigner = async (
    providerInstance: ethers.BrowserProvider,
    address: string
  ) => {
    try {
      // Get BTC balance - no signer needed
      const btcBal = await providerInstance.getBalance(address);
      dispatch(setBalance(ethers.formatEther(btcBal)));

      // Get MUSD balance - no signer needed for read-only operations
      const musdContract = new ethers.Contract(
        MUSD_ADDRESS,
        ['function balanceOf(address) view returns (uint256)'],
        providerInstance
      );
      const musdBal = await musdContract.balanceOf(address);
      dispatch(setMusdBalance(ethers.formatEther(musdBal)));
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this app!');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      // Clear the disconnected flag when user manually connects
      localStorage.removeItem(DISCONNECTED_FLAG);
      
      // This WILL prompt the user
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      // Get chainId directly from ethereum
      const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      const currentChainId = parseInt(chainIdHex, 16);

      setProvider(provider);
      setSigner(signer);
      dispatch(setWalletAddress(address));
      dispatch(setChainId(currentChainId));

      await updateBalancesWithoutSigner(provider, address);

      if (currentChainId !== MEZO_TESTNET_CHAIN_ID) {
        await switchToMezoTestnet();
      }

      console.log('✅ Wallet connected:', address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const switchToMezoTestnet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x7B5B' }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x7B5B',
                chainName: 'Mezo Testnet',
                nativeCurrency: {
                  name: 'Bitcoin',
                  symbol: 'BTC',
                  decimals: 18,
                },
                rpcUrls: ['https://testnet-rpc.mezo.org'],
                blockExplorerUrls: ['https://explorer.test.mezo.org'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Mezo network:', addError);
        }
      }
    }
  };

  const disconnectWallet = () => {
    // Set flag to prevent auto-reconnection
    localStorage.setItem(DISCONNECTED_FLAG, 'true');
    
    dispatch(disconnectWalletAction());
    setProvider(null);
    setSigner(null);
    console.log('👋 Wallet disconnected');
  };

  return (
    <WalletContext.Provider
      value={{
        account: walletState.address,
        isConnected: walletState.isConnected,
        chainId: walletState.chainId,
        balance: walletState.balance,
        musdBalance: walletState.musdBalance,
        connectWallet,
        disconnectWallet,
        provider,
        signer,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
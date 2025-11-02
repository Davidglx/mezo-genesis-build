declare let window: any;

import { useState, useRef, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { UilCopy } from '@iconscout/react-unicons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  ConnectButton,
  HeaderContainer,
  SVGLogo,
  TextLogo,
  WalletSection,
  WalletInfo,
  NetworkBadge,
  BalanceCard,
  BalanceLabel,
  BalanceAmount,
  AddressDropdown,
  AddressButton,
  DropdownMenu,
  DropdownContent,
  DropdownLabel,
  DropdownAddress,
  DisconnectButton,
  BorrowNotice,
} from './index.styled';

const Header = () => {
  const { account, isConnected, balance, musdBalance, chainId, connectWallet, disconnectWallet } = useWallet();
  const [handleCopyAddress, setHandleCopyAddress] = useState(false);
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const balanceDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(event.target as Node)) {
        setShowAddressDropdown(false);
      }
      if (balanceDropdownRef.current && !balanceDropdownRef.current.contains(event.target as Node)) {
        setShowBalanceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (bal: string | null) => {
    if (!bal) return '0.00';
    return parseFloat(bal).toFixed(4);
  };

  const hasMUSD = musdBalance && parseFloat(musdBalance) > 0;
  const isCorrectNetwork = chainId === 31611;

  return (
    <HeaderContainer>
      <TextLogo href="/">
        <img style={{ width: '6rem' }} src="/assets/poker-chip.png" alt="" />
      </TextLogo>


      <WalletSection>
        {!isConnected ? (
          <div className="dropdown">
            <ConnectButton className="roboto-flex" onClick={connectWallet}>
              Connect Wallet
            </ConnectButton>
          </div>
        ) : (
          <WalletInfo>
            {/* Network Badge */}
            {/* <NetworkBadge isCorrect={isCorrectNetwork}>
              {isCorrectNetwork ? 'Mezo Testnet' : 'Wrong Network'}
            </NetworkBadge> */}

            {/* Balance - Click to toggle MUSD/BTC */}
            <div style={{ position: 'relative' }} ref={balanceDropdownRef}>
              <BalanceCard
                onClick={() => setShowBalanceDropdown(!showBalanceDropdown)}
                style={{ cursor: 'pointer' }}
              >
                <BalanceLabel>
                  {hasMUSD ? 'MUSD Balance' : 'BTC Balance'}
                </BalanceLabel>
                <BalanceAmount>
                  {hasMUSD ? formatBalance(musdBalance) : formatBalance(balance)}
                  {hasMUSD ?
                    <img
                      src="/assets/mezoicon.svg"
                      alt="MUSD"
                      style={{ width: '16px', marginLeft: '0.3rem', verticalAlign: 'middle' }}
                    />
                    :
                    <img
                      src="/assets/bitcoin.webp"
                      alt="BTC"
                      style={{ width: '14px', marginLeft: '0.3rem', verticalAlign: 'middle' }}
                    />
                  }
                </BalanceAmount>
              </BalanceCard>

              {/* Balance Dropdown */}
              {showBalanceDropdown && (
                <DropdownMenu
                  className="balance-dropdown"
                  style={{ display: 'block' }}
                >
                  <DropdownContent>
                    <DropdownLabel>BTC Balance</DropdownLabel>
                    <DropdownAddress style={{ marginBottom: '0.5rem' }}>
                      {formatBalance(balance)}
                      <img
                        src="/assets/bitcoin.webp"
                        alt="BTC"
                        style={{ width: '16px', marginLeft: '0.3rem', verticalAlign: 'middle' }}
                      />
                    </DropdownAddress>

                    <DropdownLabel>MUSD Balance</DropdownLabel>
                    <DropdownAddress>
                      {formatBalance(musdBalance)}
                      <img
                        src="/assets/mezoicon.svg"
                        alt="MUSD"
                        style={{ width: '16px', marginLeft: '0.3rem', verticalAlign: 'middle' }}
                      />
                    </DropdownAddress>

                    {!hasMUSD && (
                      <BorrowNotice>
                        💡 You need MUSD to play!<br />
                        <a
                          href="https://testnet.mezo.org/faucet"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Get MUSD from Faucet →
                        </a>
                      </BorrowNotice>
                    )}
                  </DropdownContent>
                </DropdownMenu>
              )}
            </div>

            {/* Address & Disconnect Dropdown */}
            <AddressDropdown className="dropdown" ref={addressDropdownRef}>
              <AddressButton onClick={() => setShowAddressDropdown(!showAddressDropdown)}>
                {formatAddress(account!)}
                <CopyToClipboard text={account!}>
                  <span
                    style={{
                      margin: '0 0 0 0.5rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHandleCopyAddress(true);
                      setTimeout(() => setHandleCopyAddress(false), 1000);
                    }}
                  >
                    {handleCopyAddress ? (
                      <img src="/assets/copy.png" style={{ width: '14px' }} alt="copied" />
                    ) : (
                      <UilCopy size="15" />
                    )}
                  </span>
                </CopyToClipboard>
              </AddressButton>

              {showAddressDropdown && (
                <DropdownMenu
                  className="dropDownConnect__items"
                  style={{ display: 'block' }}
                >
                  <DropdownContent>
                    <DropdownLabel>Connected</DropdownLabel>
                    <DropdownAddress>{account}</DropdownAddress>
                    <DisconnectButton
                      onClick={() => {
                        disconnectWallet();
                        setShowAddressDropdown(false);
                      }}
                    >
                      {/* <img 
                        src="/assets/cancel.png" 
                        alt="disconnect" 
                        style={{ width: '16px', marginRight: '8px' }}
                      /> */}
                      Disconnect
                    </DisconnectButton>
                  </DropdownContent>
                </DropdownMenu>
              )}
            </AddressDropdown>
          </WalletInfo>
        )}
      </WalletSection>
    </HeaderContainer>
  );
};

export default Header;
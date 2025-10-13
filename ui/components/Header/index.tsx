// Copyright Tippers 🎲🃏 2022
// 17 U.S.C §§ 101-1511

// declaring global module
declare let window: any;

// importing stylings from styled-component
import {
  ConnectButton,
  HeaderContainer,
  SVGLogo,
  TextLogo,
} from "./index.styled";
import { AngleDownIcon } from "../../svgs";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
// @ts-ignore
import { UilCopy } from "@iconscout/react-unicons";

import { useEffect, useState } from "react";

// JSX Component
const Header = (): JSX.Element => {
  // temporarily removed Redux dispatch and selector
  const [address, setAddress] = useState<string | null>(null);
  const [handleCopyAddress, setHandleCopyAddress] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          localStorage.setItem("wallet-type", "metamask");
        }
      });
    }
  }, []);

  return (
    <HeaderContainer>
      <TextLogo href="/">
        <img style={{ width: "12rem" }} src="/assets/mezo.svg" alt="" />
      </TextLogo>

      <SVGLogo href="/">
        <img src="/assets/svg-logo.svg" alt="" />
      </SVGLogo>

      <div className="dropdown">
        <ConnectButton style={{ cursor: address ? "unset" : "pointer" }}>
          {address ? (
            <span
              style={{
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {address.substring(0, 5)}...
              {address.substring(38, 42)}
              <CopyToClipboard text={address}>
                <span
                  style={{
                    margin: "0.2rem 0.1rem 0.1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setHandleCopyAddress(!handleCopyAddress);
                    setTimeout(() => {
                      setHandleCopyAddress(false);
                    }, 1000);
                  }}
                >
                  {handleCopyAddress ? (
                    <img src="/assets/copy.png" style={{ width: "14px" }} />
                  ) : (
                    <UilCopy size="15" />
                  )}
                </span>
              </CopyToClipboard>
            </span>
          ) : (
            "Connect Wallet"
          )}
          {!address && <AngleDownIcon size="20" />}
        </ConnectButton>
      </div>
    </HeaderContainer>
  );
};

export default Header;

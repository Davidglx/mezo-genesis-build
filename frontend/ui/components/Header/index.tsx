
// // declaring global module
// declare let window: any;

// // importing stylings from styled-component
// import {
//   ConnectButton,
//   HeaderContainer,
//   SVGLogo,
//   TextLogo,
// } from "./index.styled";
// import { AngleDownIcon } from "../../svgs";
// // @ts-ignore
// import { CopyToClipboard } from "react-copy-to-clipboard";
// // @ts-ignore
// import { UilCopy } from "@iconscout/react-unicons";

// import { useEffect, useState } from "react";

// // JSX Component
// const Header = (): JSX.Element => {
//   // temporarily removed Redux dispatch and selector
//   const [address, setAddress] = useState<string | null>(null);
//   const [handleCopyAddress, setHandleCopyAddress] = useState(false);

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", (accounts: string[]) => {
//         if (accounts.length > 0) {
//           setAddress(accounts[0]);
//           localStorage.setItem("wallet-type", "metamask");
//         }
//       });
//     }
//   }, []);

//   return (
//     <HeaderContainer>
//       <TextLogo href="/">
//         {/* <img style={{ width: "12rem" }} src="/assets/mezo.svg" alt="" /> */}
//         {/* <img style={{ width: "6rem" }} src="/assets/real-chip.png" alt="" /> */}
//         {/* <img style={{ width: "6rem" }} src="/assets/casi-casi-new.png" alt="" /> */}
//         <img style={{ width: "6rem" }} src="/assets/poker-chip.png" alt="" />


//       </TextLogo>

//       <SVGLogo href="/">
//         <img src="/assets/svg-logo.svg" alt="" />
//       </SVGLogo>

//       <div className="dropdown">
//         <ConnectButton style={{ cursor: address ? "unset" : "pointer" }}>
//           {address ? (
//             <span
//               style={{
//                 textTransform: "capitalize",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {address.substring(0, 5)}...
//               {address.substring(38, 42)}
//               <CopyToClipboard text={address}>
//                 <span
//                   style={{
//                     margin: "0.2rem 0.1rem 0.1rem",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => {
//                     setHandleCopyAddress(!handleCopyAddress);
//                     setTimeout(() => {
//                       setHandleCopyAddress(false);
//                     }, 1000);
//                   }}
//                 >
//                   {handleCopyAddress ? (
//                     <img src="/assets/copy.png" style={{ width: "14px" }} />
//                   ) : (
//                     <UilCopy size="15" />
//                   )}
//                 </span>
//               </CopyToClipboard>
//             </span>
//           ) : (
//             "Connect Wallet"
//           )}
//           {!address && <AngleDownIcon size="20" />}
//         </ConnectButton>
//       </div>
//     </HeaderContainer>
//   );
// };

// export default Header;




// // declaring global module
// declare let window: any;

// import { useEffect, useState } from "react";
// import {
//   ConnectButton,
//   HeaderContainer,
//   SVGLogo,
//   TextLogo,
// } from "./index.styled";
// import { AngleDownIcon } from "../../svgs";
// // @ts-ignore
// import { CopyToClipboard } from "react-copy-to-clipboard";
// // @ts-ignore
// import { UilCopy } from "@iconscout/react-unicons";

// import { metaMaskConnection, walletDisconnect } from "../../../utils/walletConnection";

// const Header = (): JSX.Element => {
//   const [address, setAddress] = useState<string | null>(null);
//   const [handleCopyAddress, setHandleCopyAddress] = useState(false);

//   // detect account change
//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", (accounts: string[]) => {
//         if (accounts.length > 0) {
//           setAddress(accounts[0]);
//           localStorage.setItem("wallet-type", "metamask");
//         } else {
//           setAddress(null);
//         }
//       });
//     }
//   }, []);

//   return (
//     <HeaderContainer>
//       <TextLogo href="/">
//         <img style={{ width: "6rem" }} src="/assets/poker-chip.png" alt="Mezo Logo" />
//       </TextLogo>

//       <SVGLogo href="/">
//         <img src="/assets/svg-logo.svg" alt="SVG Logo" />
//       </SVGLogo>

//       <div className="dropdown">
//         {/* Wallet Button */}
//         <ConnectButton style={{ cursor: address ? "unset" : "pointer" }}>
//           {address ? (
//             <span
//               style={{
//                 textTransform: "capitalize",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {address.substring(0, 5)}...{address.substring(38, 42)}
//               <CopyToClipboard text={address}>
//                 <span
//                   style={{
//                     margin: "0.2rem 0.1rem 0.1rem",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => {
//                     setHandleCopyAddress(true);
//                     setTimeout(() => setHandleCopyAddress(false), 1000);
//                   }}
//                 >
//                   {handleCopyAddress ? (
//                     <img src="/assets/copy.png" style={{ width: "14px" }} />
//                   ) : (
//                     <UilCopy size="15" />
//                   )}
//                 </span>
//               </CopyToClipboard>
//             </span>
//           ) : (
//             "Connect Wallet"
//           )}
//           {!address && <AngleDownIcon size="20" />}
//         </ConnectButton>

//         {/* Dropdown options */}
//         {!address ? (
//           <div className="dropDownConnect__items">
//             <div
//               className="dropDownConnect_item"
//               onClick={async () => {
//                 const userAddress = await metaMaskConnection();
//                 if (userAddress) setAddress(userAddress);
//               }}
//             >
//               <div className="dropDownConnect_img">
//                 <img src="/assets/metamask.png" alt="metamask logo" />
//               </div>
//               <p>MetaMask</p>
//             </div>
//           </div>
//         ) : (
//           <div className="dropDownConnect__items">
//             <div
//               className="dropDownConnect_item"
//               onClick={() => {
//                 walletDisconnect();
//                 setAddress(null);
//               }}
//               style={{
//                 background: "rgba(170, 74, 68, 0.6)",
//                 borderRadius: "3px",
//               }}
//             >
//               <div className="dropDownConnect_img">
//                 <img src="/assets/cancel.png" alt="disconnect logo" />
//               </div>
//               <p
//                 style={{
//                   fontSize: "10px",
//                 }}
//                 className="disconnect"
//               >
//                 Disconnect wallet
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </HeaderContainer>
//   );
// };

// export default Header;




// declaring global module
declare let window: any;

import {
  ConnectButton,
  HeaderContainer,
  SVGLogo,
  TextLogo,
} from "./index.styled";
import { AngleDownIcon } from "../../svgs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UilCopy } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";

const Header = (): JSX.Element => {
  const [address, setAddress] = useState<string | null>(null);
  const [handleCopyAddress, setHandleCopyAddress] = useState(false);

  // 🧠 function to connect MetaMask
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        localStorage.setItem("wallet-type", "metamask");
      } catch (err) {
        console.error("User rejected wallet connection:", err);
      }
    } else {
      alert("MetaMask not found. Please install it!");
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          localStorage.setItem("wallet-type", "metamask");
        } else {
          setAddress(null);
        }
      });
    }
  }, []);

  return (
    <HeaderContainer>
      <TextLogo href="/">
        <img style={{ width: "6rem" }} src="/assets/poker-chip.png" alt="" />
      </TextLogo>

      <SVGLogo href="/">
        <img src="/assets/svg-logo.svg" alt="" />
      </SVGLogo>

      <div className="dropdown">
        <ConnectButton
          onClick={!address ? connectWallet : undefined}
          style={{ cursor: address ? "unset" : "pointer" }}
        >
          {address ? (
            <span
              style={{
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {address.substring(0, 5)}...{address.substring(38, 42)}
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

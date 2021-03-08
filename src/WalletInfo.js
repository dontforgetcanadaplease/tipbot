import WalletModel from './WalletModel';
import React, { useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { shortNum } from './utils';
import './WalletInfo.scss'; 

const ConnectYourWalletButton = () => {
  return <div className="connect-wallet-button cute-pink-btn" onClick={WalletModel.askForWallet}>
    Connect to a wallet
  </div>
}

const WalletDetails = ({ walletModel }) => {
  const address = walletModel.address;
  const shorthand = address.substr(0, 6) + '...' + address.substr(address.length - 4);
  return <div className="wallet-details box">
    <div className="donut-bal">{shortNum(walletModel.donutBal)}  🍩</div>
    <div className="address-container">
      <div className="short-address">{shorthand}</div>
      <Jazzicon diameter={18} seed={jsNumberForAddress(walletModel.address)} />
    </div>
  </div>
};

export default () => {
  const walletModel = useContext(WalletModel.context);
  return <div className="wallet-info">
    {!walletModel.isConnected && <ConnectYourWalletButton />}
    {walletModel.isConnected && <WalletDetails walletModel={walletModel} />}
  </div>
};

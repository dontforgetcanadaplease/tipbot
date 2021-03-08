import { useState, useContext } from 'react';
import classNames from 'classnames';
import WalletModel from './WalletModel';
import { commaNumber } from './utils';

import './TippingInterface.scss';

const urlParams = new URLSearchParams(window.location.search);
const recipient = urlParams.get('recipient');
const initialTipAmount = urlParams.get('tipAmount') || 1000;

export default () => {

  const [isSending, setIsSending] = useState(false);

  const [tipAmount, setTipAmount] = useState(commaNumber(initialTipAmount));
  const walletModel = useContext(WalletModel.context);

  const buttonClass = classNames('complete cute-pink-btn', {
    disabled: !walletModel.isConnected || isSending,
  });

  const setFormattedTipAmount = amount => {
    setTipAmount(commaNumber(amount.replace(/,/g, '')));
  };

  const handleSend = async () => {
    if (isSending) return;
    if (!walletModel.isConnected) {
      WalletModel.askForWallet();
      return;
    }
    setIsSending(true);
    try {
      const amount = Number(tipAmount.replace(/,/g, ''));
      await WalletModel.sendTip(recipient, amount);
    } catch (error) {
      alert(error.message);
    }
    setIsSending(false);
  };

  return <div className="tipping-interface box">
    <div className="tip-token">🍩</div>
    <div className="cute-header tip-info">Tipping /u/{recipient}</div>
    <div className="tip-token-info">EthTrader DONUTs</div>
    <div className="cute-input quantity-container">
      <input value={tipAmount} onChange={e => setFormattedTipAmount(e.target.value)} />
      <div className="token">DONUT</div>
    </div>
    <div className={buttonClass} onClick={handleSend}>
      {walletModel.isConnected ? 'Send Tip' : 'Connect Wallet First'}
    </div>
  </div>;
};

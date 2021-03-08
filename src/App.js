import { useState } from 'react';
import classNames from 'classnames';
import './App.css';

import WalletInfo from './WalletInfo';
import TippingInterface from './TippingInterface';
import Faq from './Faq';
import { WalletProvider } from './WalletModel';

function App() {

  const [showFaq, setShowFaq] = useState(false);
  const appClassName = classNames('app', {
    faqMode: showFaq,
  });

  const toggleFaq = () => setShowFaq(!showFaq);

  return (
    <div className={appClassName}>
      <div className="nav" onClick={toggleFaq}>
        {showFaq ? '← Go Back' : 'FAQ And Credits'}
      </div>
      <WalletProvider>
        <WalletInfo />
        <TippingInterface />
      </WalletProvider>
      <Faq />
    </div>
  );
}

export default App;

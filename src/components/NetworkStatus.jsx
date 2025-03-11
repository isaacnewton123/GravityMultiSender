// src/components/NetworkStatus.jsx
import { useSwitchChain } from 'wagmi';
import { gravityAlphaMainnet } from '../config/networks';

const NetworkStatus = () => {
  const { switchChain } = useSwitchChain();

  const handleSwitchNetwork = () => {
    switchChain({ chainId: gravityAlphaMainnet.id });
  };

  return (
    <div className="network-status">
      <div className="network-error">
        <h2>Wrong Network</h2>
        <p>Please connect to Gravity Alpha Mainnet to use this application.</p>
        <div className="network-info">
          <div className="network-detail">
            <span className="label">Network Name:</span>
            <span className="value">Gravity Alpha Mainnet</span>
          </div>
          <div className="network-detail">
            <span className="label">RPC URL:</span>
            <span className="value">https://rpc.gravity.xyz</span>
          </div>
          <div className="network-detail">
            <span className="label">Chain ID:</span>
            <span className="value">1625</span>
          </div>
          <div className="network-detail">
            <span className="label">Currency Symbol:</span>
            <span className="value">G</span>
          </div>
          <div className="network-detail">
            <span className="label">Block Explorer:</span>
            <span className="value">https://explorer.gravity.xyz</span>
          </div>
        </div>
        <button className="button switch-button" onClick={handleSwitchNetwork}>
          Switch to Gravity Alpha Mainnet
        </button>
      </div>
    </div>
  );
};

export default NetworkStatus;
// src/components/TokenSelector.jsx
import { useState } from 'react';
import { COMMON_TOKENS } from '../config/constants';

const TokenSelector = ({ isNativeToken, tokenAddress, onTokenChange }) => {
  const [customAddress, setCustomAddress] = useState('');
  const [isCustomToken, setIsCustomToken] = useState(false);

  const handleTokenTypeChange = (e) => {
    const value = e.target.value;
    if (value === 'native') {
      onTokenChange('');
    } else if (value === 'custom') {
      setIsCustomToken(true);
      // Don't change token address yet until user enters it
    } else {
      setIsCustomToken(false);
      onTokenChange(value);
    }
  };

  const handleCustomAddressChange = (e) => {
    setCustomAddress(e.target.value);
  };

  const handleCustomAddressSubmit = () => {
    if (customAddress && customAddress.startsWith('0x') && customAddress.length === 42) {
      onTokenChange(customAddress);
    }
  };

  return (
    <div className="token-selector">
      <div className="selector-row">
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              value="native"
              checked={isNativeToken}
              onChange={handleTokenTypeChange}
              name="tokenType"
            />
            <span className="radio-text">Native Token (G)</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              value="custom"
              checked={!isNativeToken && isCustomToken}
              onChange={handleTokenTypeChange}
              name="tokenType"
            />
            <span className="radio-text">Custom Token</span>
          </label>

          {COMMON_TOKENS.map(token => (
            <label className="radio-label" key={token.address}>
              <input
                type="radio"
                value={token.address}
                checked={tokenAddress === token.address}
                onChange={handleTokenTypeChange}
                name="tokenType"
              />
              <span className="radio-text">{token.symbol}</span>
            </label>
          ))}
        </div>
      </div>

      {isCustomToken && (
        <div className="custom-token-section">
          <input
            type="text"
            className="token-input"
            placeholder="Enter token contract address: 0x..."
            value={customAddress}
            onChange={handleCustomAddressChange}
          />
          <button 
            className="button load-token-button"
            onClick={handleCustomAddressSubmit}
            disabled={!customAddress || customAddress.length !== 42}
          >
            Load Token
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenSelector;
// src/components/Footer.jsx
import { gravityAlphaMainnet } from '../config/networks';

const Footer = () => {
  const contractAddress = gravityAlphaMainnet.contracts.multiSender.address;
  const explorerURL = `${gravityAlphaMainnet.blockExplorers.default.url}/address/${contractAddress}`;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p>
              MultiSender Contract:{' '}
              <a
                href={explorerURL}
                target="_blank"
                rel="noopener noreferrer"
                className="address-link"
              >
                {contractAddress.substring(0, 8)}...{contractAddress.substring(contractAddress.length - 6)}
              </a>
            </p>
          </div>
          <div className="footer-links">
            <a
              href="https://explorer.gravity.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Explorer
            </a>
            <a
              href="https://gravity.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Gravity Website
            </a>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 Gravity MultiSender - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
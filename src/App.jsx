// src/App.jsx
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { gravityAlphaMainnet } from './config/networks';
import { ThemeProvider } from './context/ThemeContext';
import MultiSender from './components/MultiSender';
import Header from './components/Header';
import Footer from './components/Footer';

// Tambahkan import CSS baru di sini
import './styles/global.css';
import './styles/theme.css';
import './styles/elegant-ui-styles.css';
import './styles/elegant-popup-styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Konfigurasi dengan jaringan Gravity Alpha Mainnet
const config = getDefaultConfig({
  appName: 'Gravity MultiSender',
  projectId: 'abd69daf0c462c572fc2c5237e05430d', // Menggunakan project ID yang sama
  chains: [gravityAlphaMainnet],
  transports: {
    [gravityAlphaMainnet.id]: http()
  }
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ThemeProvider>
            <div className="app">
              <Header />
              <main className="main-content">
                <MultiSender />
              </main>
              <Footer />
              <ToastContainer position="bottom-right" theme="colored" />
            </div>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
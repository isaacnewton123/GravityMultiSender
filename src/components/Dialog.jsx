// src/components/Dialog.jsx
import { useEffect, useRef } from 'react';
import { gravityAlphaMainnet } from '../config/networks';

const Dialog = ({ type, title, message, txHash, onClose }) => {
  const dialogRef = useRef(null);

  // Efek untuk menambahkan/menghapus class "open" untuk animasi
  useEffect(() => {
    const dialog = dialogRef.current;
    
    // Tambahkan class "open" setelah komponen dimount
    setTimeout(() => {
      if (dialog) {
        dialog.classList.add('open');
      }
    }, 10);

    // Event listener untuk menutup dialog ketika mengklik di luar
    const handleClickOutside = (e) => {
      if (dialog && !dialog.contains(e.target)) {
        closeDialog();
      }
    };

    // Event listener untuk menutup dialog dengan tombol Escape
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        closeDialog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Fungsi untuk menambahkan animasi saat menutup dialog
  const closeDialog = () => {
    const dialog = dialogRef.current;
    
    // Hapus class "open" untuk animasi keluar
    if (dialog) {
      dialog.classList.remove('open');
    }
    
    // Tunggu sampai animasi selesai
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Render berdasarkan tipe popup
  const renderContent = () => {
    switch(type) {
      case 'loading':
        return (
          <>
            <div className="dialog-header">
              <div className="loading-spinner"></div>
              <h3>{title}</h3>
              <button className="close-button" onClick={closeDialog}>×</button>
            </div>
            <div className="dialog-content">
              <p>{message}</p>
            </div>
          </>
        );
        
      case 'success':
        return (
          <>
            <div className="dialog-header">
              <div className="dialog-icon success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>{title}</h3>
              <button className="close-button" onClick={closeDialog}>×</button>
            </div>
            <div className="dialog-content">
              <p>{message}</p>
              
              {txHash && (
                <div className="tx-info">
                  <a 
                    href={`${gravityAlphaMainnet.blockExplorers.default.url}/tx/${txHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="tx-link"
                  >
                    View on Explorer
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              )}
            </div>
            <div className="dialog-footer">
              <button className="dialog-button" onClick={closeDialog}>
                Done
              </button>
            </div>
          </>
        );
        
      case 'error':
        return (
          <>
            <div className="dialog-header">
              <div className="dialog-icon error">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3>{title}</h3>
              <button className="close-button" onClick={closeDialog}>×</button>
            </div>
            <div className="dialog-content">
              <p>{message}</p>
            </div>
            <div className="dialog-footer">
              <button className="dialog-button" onClick={closeDialog}>
                Close
              </button>
            </div>
          </>
        );
        
      default:
        return (
          <>
            <div className="dialog-header">
              <div className="dialog-icon info">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3>{title}</h3>
              <button className="close-button" onClick={closeDialog}>×</button>
            </div>
            <div className="dialog-content">
              <p>{message}</p>
            </div>
            <div className="dialog-footer">
              <button className="dialog-button" onClick={closeDialog}>
                OK
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dialog-overlay">
      <div className={`dialog ${type}`} ref={dialogRef}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dialog;
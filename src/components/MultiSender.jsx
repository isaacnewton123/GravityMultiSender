// src/components/MultiSender.jsx
import { useState, useEffect } from 'react';
import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Papa from 'papaparse';
import { TAX_PERCENTAGE } from '../config/constants';
import { gravityAlphaMainnet } from '../config/networks';
import BatchPreview from './BatchPreview';
import NetworkStatus from './NetworkStatus';
import { useTheme } from '../context/ThemeContext';
import Dialog from './Dialog';

const MultiSender = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const { theme } = useTheme();
  
  // State management
  const [csvData, setCsvData] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [totalAmount, setTotalAmount] = useState('0');
  const [totalTax, setTotalTax] = useState('0');
  const [isParsing, setIsParsing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [currentBatch, setCurrentBatch] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false); // Track file upload status
  const [fileName, setFileName] = useState(''); // Track name of uploaded file
  
  // State untuk popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(''); // 'loading', 'error', 'success'
  const [popupMessage, setPopupMessage] = useState('');
  const [popupDetails, setPopupDetails] = useState('');
  
  const multiSenderContract = gravityAlphaMainnet.contracts.multiSender;

  const { isLoading: isPending, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Reset states when app loads
  useEffect(() => {
    setCsvData('');
    setRecipients([]);
    setAmounts([]);
    setTotalAmount('0');
    setTotalTax('0');
    setShowPreview(false);
    setTxHash('');
    setFileUploaded(false);
    setFileName('');
  }, []);

  // Menampilkan popup untuk pesan sukses
  useEffect(() => {
    if (isSuccess && txHash) {
      showPopupMessage(
        'success', 
        'Transaction Successful!', 
        `Your tokens have been sent successfully. Transaction hash: ${txHash.substring(0, 10)}...`
      );
    }
  }, [isSuccess, txHash]);

  // Fungsi untuk menampilkan popup
  const showPopupMessage = (type, message, details = '') => {
    setPopupType(type);
    setPopupMessage(message);
    setPopupDetails(details);
    setShowPopup(true);
  };

  // Handle file drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      handleFiles(event.target.files[0]);
    }
  };
  
  const handleFiles = (file) => {
    if (!file) return;
    
    // Simpan nama file
    setFileName(file.name);
    
    // Tampilkan popup loading
    showPopupMessage('loading', 'Processing File', 'Please wait while we process your file...');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setCsvData(content);
      parseCSV(content);
    };
    reader.readAsText(file);
  };

  const handleTextAreaChange = (e) => {
    const content = e.target.value;
    setCsvData(content);
    if (content.trim().length > 0) {
      parseCSV(content);
    } else {
      // Reset file uploaded state jika textarea dikosongkan
      setFileUploaded(false);
      setFileName('');
    }
  };

  const parseCSV = (content) => {
    setIsParsing(true);
    
    try {
      Papa.parse(content, {
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length === 0) {
            showPopupMessage('error', 'Invalid Data', 'CSV file is empty.');
            setIsParsing(false);
            setFileUploaded(false);
            return;
          }

          const newRecipients = [];
          const newAmounts = [];
          let newTotalAmount = 0;
          let errors = [];

          for (let i = 0; i < results.data.length; i++) {
            const row = results.data[i];
            if (row.length < 2) {
              errors.push(`Line ${i + 1}: Each row must have at least 2 columns (address and amount).`);
              continue;
            }

            const address = row[0]?.trim();
            const amount = parseFloat(row[1]?.trim());

            if (!address.startsWith('0x') || address.length !== 42) {
              errors.push(`Line ${i + 1}: Invalid address format.`);
              continue;
            }

            if (isNaN(amount) || amount <= 0) {
              errors.push(`Line ${i + 1}: Amount must be a positive number.`);
              continue;
            }

            newRecipients.push(address);
            newAmounts.push(amount.toString());
            newTotalAmount += amount;
          }

          if (errors.length > 0) {
            showPopupMessage(
              'error', 
              'Validation Errors', 
              errors.join('\n')
            );
            setFileUploaded(false);
          }

          if (newRecipients.length > 0) {
            setRecipients(newRecipients);
            setAmounts(newAmounts);
            
            const totalAmount = newTotalAmount.toString();
            setTotalAmount(totalAmount);
            
            // Calculate tax (1%)
            const tax = (newTotalAmount * TAX_PERCENTAGE / 100).toString();
            setTotalTax(tax);

            // Calculate batches
            const batchSize = 200;
            const batches = Math.ceil(newRecipients.length / batchSize);
            setTotalBatches(batches);
            
            // Tandai file sebagai berhasil diupload jika tidak ada error
            if (errors.length === 0) {
              setFileUploaded(true);
            }
            
            // Close any loading popup
            setShowPopup(false);
          } else {
            setRecipients([]);
            setAmounts([]);
            setTotalAmount('0');
            setTotalTax('0');
            setTotalBatches(0);
            setFileUploaded(false);
            
            if (errors.length === 0) {
              showPopupMessage('error', 'No Valid Data', 'No valid recipients found in the provided data.');
            }
          }

          setIsParsing(false);
        },
        error: (error) => {
          showPopupMessage('error', 'CSV Parsing Error', error.message);
          setIsParsing(false);
          setFileUploaded(false);
        }
      });
    } catch (error) {
      showPopupMessage('error', 'Error Processing Data', error.message);
      setIsParsing(false);
      setFileUploaded(false);
    }
  };

  // Function to reset file upload
  const handleResetFile = () => {
    setCsvData('');
    setFileUploaded(false);
    setFileName('');
    setRecipients([]);
    setAmounts([]);
    setTotalAmount('0');
    setTotalTax('0');
    setTotalBatches(0);
    setShowPreview(false);
  };

  const processNativeMultiSend = async () => {
    if (!isConnected || recipients.length === 0 || amounts.length === 0) return;

    const batchSize = 200;
    const batches = Math.ceil(recipients.length / batchSize);
    setTotalBatches(batches);
    
    showPopupMessage('loading', 'Sending Tokens', `Preparing to send ${batches} batch(es)...`);

    for (let i = 0; i < batches; i++) {
      try {
        setCurrentBatch(i + 1);
        
        // Update popup message for current batch
        showPopupMessage('loading', 'Transaction in Progress', `Sending batch ${i + 1} of ${batches}...`);
        
        const startIdx = i * batchSize;
        const endIdx = Math.min(startIdx + batchSize, recipients.length);
        
        const batchRecipients = recipients.slice(startIdx, endIdx);
        const batchAmounts = amounts.slice(startIdx, endIdx).map(amount => 
          parseUnits(amount, 18)
        );
        
        // Calculate total amount for this batch including tax
        let batchTotal = 0n;
        for (let j = 0; j < batchAmounts.length; j++) {
          batchTotal += batchAmounts[j];
        }
        
        // Add 1% tax
        const tax = batchTotal * BigInt(TAX_PERCENTAGE) / 100n;
        const totalValue = batchTotal + tax;

        const hash = await writeContractAsync({
          address: multiSenderContract.address,
          abi: multiSenderContract.abi,
          functionName: 'multiSendNative',
          args: [batchRecipients, batchAmounts],
          value: totalValue,
        });

        setTxHash(hash);
        
        // Show success for this batch
        showPopupMessage('success', 'Batch Sent Successfully', 
          `Batch ${i + 1}/${batches} has been sent. Transaction hash: ${hash.substring(0, 10)}...`
        );
        
      } catch (error) {
        console.error('MultiSend error:', error);
        showPopupMessage('error', 'Transaction Failed', 
          `Error in batch ${i + 1}/${batches}: ${error.message || 'Transaction failed'}`
        );
        break;
      }
    }
  };

  const handleSend = async () => {
    if (!isConnected) {
      showPopupMessage('error', 'Wallet Not Connected', 'Please connect your wallet first.');
      return;
    }

    if (recipients.length === 0 || amounts.length === 0) {
      showPopupMessage('error', 'No Data', 'No recipients or amounts found.');
      return;
    }

    if (recipients.length !== amounts.length) {
      showPopupMessage('error', 'Data Mismatch', 'Number of recipients and amounts do not match.');
      return;
    }

    try {
      setIsSending(true);
      await processNativeMultiSend();
    } catch (error) {
      console.error('Transaction error:', error);
      showPopupMessage('error', 'Transaction Failed', error.message || 'Transaction failed');
    } finally {
      setIsSending(false);
      setCurrentBatch(0);
    }
  };

  const handlePreviewClick = () => {
    if (recipients.length === 0 || amounts.length === 0) {
      showPopupMessage('error', 'No Data', 'No recipients or amounts found. Upload or enter your data first.');
      return;
    }
    
    setShowPreview(true);
  };

  if (!isConnected) {
    return (
      <div className="connect-container">
        <div className="connect-card">
          <div className="connect-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"/>
              <path d="M1 9h22"/>
              <path d="M9 21h6"/>
            </svg>
          </div>
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to use the Gravity MultiSender</p>
          <div className="connect-button-wrapper">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  if (chainId !== gravityAlphaMainnet.id) {
    return <NetworkStatus />;
  }

  return (
    <div className="multi-sender">
      <div className="app-header">
        <h1 className="app-title">Gravity MultiSender</h1>
        <p className="app-subtitle">Send tokens to multiple addresses in one transaction</p>
      </div>

      {/* Upload Card */}
      <div className="card slide-in">
        <h2>Upload Recipients</h2>
        <p>Upload a CSV file with addresses and amounts or paste them directly below.</p>
        
        <div 
          className={`upload-area ${dragActive ? 'active' : ''} ${fileUploaded ? 'success' : ''}`}
          onDragEnter={fileUploaded ? null : handleDrag}
          onDragOver={fileUploaded ? null : handleDrag}
          onDragLeave={fileUploaded ? null : handleDrag}
          onDrop={fileUploaded ? null : handleDrop}
        >
          <div className="upload-content">
            {fileUploaded ? (
              // Tampilan setelah file berhasil diupload
              <>
                <div className="success-checkmark">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="upload-text">File uploaded successfully</p>
                <p className="upload-filename">{fileName}</p>
                <button 
                  className="reset-button"
                  onClick={handleResetFile}
                >
                  Upload another file
                </button>
              </>
            ) : (
              // Tampilan normal untuk upload file
              <>
                <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="upload-text">Drag & drop your CSV file here</p>
                <p className="upload-subtext">or</p>
                <label htmlFor="csv-upload" className="file-label">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="M12 18v-6"></path>
                    <path d="M9 15h6"></path>
                  </svg>
                  Choose File
                </label>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="file-input"
                  id="csv-upload"
                />
              </>
            )}
          </div>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="format-container">
          <div className="format-heading">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            CSV Format
          </div>
          <p className="format-hint">Each line should contain: <code>address,amount</code> (e.g. <code>0x123...abc,1.5</code>)</p>
        </div>
        
        <div className="textarea-container">
          <textarea
            className="csv-textarea"
            placeholder="Paste addresses and amounts here:&#10;0x123...abc,1.5&#10;0x456...def,2.75"
            value={csvData}
            onChange={handleTextAreaChange}
            rows={6}
          />
          <span className="textarea-counter">{recipients.length > 0 ? `${recipients.length} recipients` : ''}</span>
        </div>

        {recipients.length > 0 && (
          <div className="summary-card">
            <div className="summary-heading">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Transaction Summary
            </div>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Recipients</span>
                <span className="summary-value">{recipients.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value highlight">{parseFloat(totalAmount).toFixed(6)} G</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Service Fee (1%)</span>
                <span className="summary-value">{parseFloat(totalTax).toFixed(6)} G</span>
              </div>
              {totalBatches > 1 && (
                <div className="summary-item">
                  <span className="summary-label">Batches</span>
                  <span className="summary-value">{totalBatches}</span>
                </div>
              )}
            </div>
            <div className="button-container">
              <button 
                className="button preview-button"
                onClick={handlePreviewClick}
                disabled={isParsing || recipients.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Preview Transactions
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="card slide-in">
          <h2>Review & Send</h2>
          <BatchPreview 
            recipients={recipients} 
            amounts={amounts} 
            tokenSymbol="G" 
          />
          
          <div className="button-container mt-4">
            <button 
              className="button send-button"
              onClick={handleSend}
              disabled={isSending || isPending || recipients.length === 0}
            >
              {isSending || isPending ? 'Processing...' : 'Send Tokens'}
            </button>
          </div>
        </div>
      )}

      <div className="disclaimer">
        <p>
          <strong>Note:</strong> A 1% service fee is charged on all transactions. 
          All transactions are processed through the Gravity MultiSender contract.
        </p>
      </div>

      {/* Popup Dialog */}
      {showPopup && (
        <Dialog 
          type={popupType}
          title={popupMessage}
          message={popupDetails}
          txHash={txHash}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default MultiSender;
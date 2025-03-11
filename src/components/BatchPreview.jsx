// src/components/BatchPreview.jsx
import { useState } from 'react';

const BatchPreview = ({ recipients, amounts, tokenSymbol }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(recipients.length / itemsPerPage);
  
  const displayedRecipients = recipients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const displayedAmounts = amounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, pageCount));
  };

  return (
    <div className="batch-preview">
      <h3>Transaction Preview</h3>
      
      <div className="recipients-table">
        <div className="table-header">
          <div className="header-cell">#</div>
          <div className="header-cell">Recipient</div>
          <div className="header-cell">Amount</div>
        </div>
        
        {displayedRecipients.map((recipient, index) => (
          <div className="table-row" key={`${recipient}-${index}`}>
            <div className="cell">{(currentPage - 1) * itemsPerPage + index + 1}</div>
            <div className="cell address" title={recipient}>
              {recipient.substring(0, 8)}...{recipient.substring(recipient.length - 6)}
            </div>
            <div className="cell amount">{parseFloat(displayedAmounts[index]).toFixed(6)} {tokenSymbol}</div>
          </div>
        ))}
      </div>
      
      {pageCount > 1 && (
        <div className="pagination">
          <button 
            className="page-button" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
          >
            &lt; Prev
          </button>
          <span className="page-info">
            Page {currentPage} of {pageCount}
          </span>
          <button 
            className="page-button" 
            onClick={handleNextPage} 
            disabled={currentPage === pageCount}
          >
            Next &gt;
          </button>
        </div>
      )}
      
      {recipients.length > 10 && (
        <div className="preview-note">
          <p>Showing {displayedRecipients.length} of {recipients.length} recipients</p>
        </div>
      )}
    </div>
  );
};

export default BatchPreview;
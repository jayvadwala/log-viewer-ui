import React from 'react';

interface LogViewerProps {
  logs: string[];
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const LogViewer: React.FC<LogViewerProps> = ({
  logs,
  currentPage,
  totalPages,
  onNext,
  onPrev,
}) => {
  return (
    <div>
      <h2>Log Viewer</h2>
      <div className="table-container">
        <table style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>#</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Log Entry</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {(currentPage - 1) * 100 + index + 1}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{log}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center', padding: '8px' }}>
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-container" style={{ marginTop: '16px', textAlign: 'center' }}>
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          style={{
            padding: '8px 16px',
            marginRight: '8px',
            backgroundColor: currentPage === 1 ? '#ddd' : '#007bff',
            color: '#fff',
            border: 'none',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 16px',
            marginLeft: '8px',
            backgroundColor: currentPage === totalPages ? '#ddd' : '#007bff',
            color: '#fff',
            border: 'none',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LogViewer;

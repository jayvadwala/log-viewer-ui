import React, { useState } from 'react';
import axios from 'axios';
import LogSearchForm from './components/LogSearchForm';
import LogViewer from './components/LogViewer';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 100;

  const totalPages = Math.ceil(logs.length / logsPerPage);

  const fetchLogs = async (fileName: string, keyword: string, limit: number) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/logs', {
        params: { fileName, keyword, limit },
      });
      setLogs(response.data.logLines);
      setCurrentPage(1); // Reset to first page when new logs are fetched
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get logs for the current page
  const paginatedLogs = logs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  return (
    <div>
      <h1>Log Retrieval System</h1>
      <LogSearchForm onSearch={fetchLogs} />
      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <LogViewer
          logs={paginatedLogs}
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      )}
    </div>
  );
};

export default App;

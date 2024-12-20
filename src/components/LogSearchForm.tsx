import React, { useState } from 'react';

interface LogSearchFormProps {
  onSearch: (fileName: string, keyword: string, limit: number) => void;
}

const LogSearchForm: React.FC<LogSearchFormProps> = ({ onSearch }) => {
  const [fileName, setFileName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [limit, setLimit] = useState(100);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(fileName, keyword, limit);
  };

  return (
    <form onSubmit={handleSearch}>
      <label>
        File Name:
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
      </label>
      <label>
        Keyword:
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </label>
      <label>
        Limit:
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          min="1"
        />
      </label>
      <button type="submit">Search Logs</button>
    </form>
  );
};

export default LogSearchForm;

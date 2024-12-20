import axios from 'axios';

export const fetchLogs = async (fileName: string, keyword: string, limit: number) => {
  const response = await axios.get('http://localhost:3000/logs', {
    params: { fileName, keyword, limit },
  });
  return response.data.logLines;
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SettingsDisplay() {
  const [status, setStatus] = useState('');
  const [settings, setSettings] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://localhost:8080/github', { key: 'value' });
        const { responseData } = response.data;
        setSettings(responseData.timezone);
        setStatus('Success');
      } catch (error) {  
        console.error('Error fetching settings:', error.message);
        setStatus('Failed');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="settings-display">
      <p>Request is {status}</p>  
      {settings ? (
        <div>
          <p>Timezone in Github Settings is {settings}</p>
        </div>
      ) : (
        <p>Loading...</p >
      )}
    </div>
  );
};

export default SettingsDisplay;
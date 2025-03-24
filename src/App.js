import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        console.log('Start laden van Excel bestand...');
        const response = await fetch('/Locaties_Werchter.xlsx');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log('Geladen data:', data); // Debug log
        setLocations(data);
        console.log('Locaties succesvol geladen:', data.length);
      } catch (error) {
        console.error('Fout bij laden locaties:', error);
        setError(error.message);
      }
    };

    loadLocations();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.jpeg" alt="Oupeye Logo" className="App-logo" />
        <h1>Oupeye Interactieve Kaart</h1>
      </header>
      {error ? (
        <div className="error-message">
          Er is een fout opgetreden bij het laden van de locaties: {error}
        </div>
      ) : (
        <div className="locations-container">
          {locations.map((location, index) => (
            <div key={index} className="location-item">
              <h3>{location.Naam}</h3>
              <p>Latitude: {location.Latitude}</p>
              <p>Longitude: {location.Longitude}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App; 
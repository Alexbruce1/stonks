import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [stockSymbol, setStockSymbol] = useState("");

  useEffect(() => {}, [])

  return (
    <div className="App">
      <header className="App-header">
        Stonks 📈
      </header>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import { fetchStockSymbols, fetchStockDataIntraDay, fetchNews } from "./api";
import "./App.css";

function App() {
  const [formText, setFormText] = useState("");
  const [sharesText, setSharesText] = useState("");
  const [sharesOwned, setSharesOwned] = useState(localStorage.getItem("sharesOwned") || "");
  const [stockSymbol, setStockSymbol] = useState(localStorage.getItem("stockSymbol") || "LLY");
  const [stockPrice, setStockPrice] = useState(localStorage.getItem("stockPrice") || "");
  const [bestMatches, setBestMatches] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(localStorage.getItem("portfolioValue") || "");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (stockSymbol) {
      fetchStockDataIntraDay(stockSymbol).then(data => {
        if (data && Object.keys(data).length > 0) {
          setStockPrice(Object.values(data)[0]["4. close"]);
        } else {
          console.error("Data is undefined or empty:", data);
        }
      }).catch(error => {
        console.error("Error fetching stock data:", error);
      });
    }

    fetchNews(stockSymbol).then(data => {
      setArticles(data)
    })
  }, [stockSymbol]);

  useEffect(() => {
    if (stockPrice && sharesOwned) {
      const calculatedValue = Math.round(stockPrice * sharesOwned * 100);
      setPortfolioValue(calculatedValue);
      localStorage.setItem("portfolioValue", calculatedValue);
    }
  }, [stockPrice, sharesOwned]);

  const updateSharesOwned = (event) => {
    event.preventDefault();
    setSharesOwned(sharesText);
    localStorage.setItem("sharesOwned", sharesText);
  };

  const getSymbols = (event) => {
    event.preventDefault();
    if (formText) {
      fetchStockSymbols(formText).then(response => {
        const perfectMatch = response.find(symbol => symbol["9. matchScore"] === "1.0000");
        if (perfectMatch) {
          const selectedSymbol = perfectMatch["1. symbol"];
          setStockSymbol(selectedSymbol);
          localStorage.setItem("stockSymbol", selectedSymbol);
        } else {
          setBestMatches(response);
        }
      });
    }
  };

  const saveSharesText = value => setSharesText(value);
  const setInputText = value => setFormText(value);

  return (
    <div className="App">
      <header className="App-header">Stonks 📈</header>
      <div className="stock-price-display">
        {stockSymbol && (
          <div className="stock-entity-container">
            <h1 className="stock-symbol">{stockSymbol}</h1>
            {stockPrice && <h1 className="stock-price">${Number(stockPrice).toFixed(2)}</h1>}
          </div>)}
      </div>
      {sharesOwned && <h2 className="shares-owned">Shares Owned: {sharesOwned}</h2>}
      {portfolioValue && (
        <h1 className="portfolio-value">
          Value: ${(portfolioValue / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
      )}
      <div className="forms-container">
        <form className="shares-form" onSubmit={updateSharesOwned}>
          <input
            className="shares-form-input"
            type="number"
            placeholder={sharesOwned.length ? `${sharesOwned} Shares` : `Owned Shares`}
            onChange={(event) => saveSharesText(event.target.value)}
          />
        </form>
        <form className="symbols-form" onSubmit={getSymbols}>
          <input
            className="symbols-form-input"
            type="text"
            placeholder={stockSymbol.length ? `Symbol: ${stockSymbol}` : `Symbol`}
            value={sharesText.toUpperCase()}
            onChange={(event) => setSharesText(event.target.value)}
                  />
          {bestMatches && (
            <ul className="best-matches-list">
              {bestMatches.map(option => (
                <div key={option["1. symbol"]} className="stock-symbol-match">
                  <p className="match-symbol">{option["1. symbol"]}</p>
                  <p className="match-name">: {option["2. name"]}</p>
                </div>
              ))}
            </ul>
          )}
        </form>
      </div>
      {stockSymbol && (
        <div className="news-container">
          { articles && articles.length && (
            articles.map(article => {
              return (
                <article
                  onClick={() => window.open(`${article.url}`, "_blank")}
                  className="article">
                  <img
                    className="article-image"
                    src={article.image}/>
                  <div className="article-text-container">
                    <h3 className="article-title article-text">
                      {article.title}
                      <strong className="article-publication article-text">{article.source.name}</strong>
                    </h3>
                    <p className="article-desctiption article-text">{article.description}</p>
                  </div>
                </article>
              )
            })
          )}
        </div>
      )}
    </div>
  );
}

export default App;
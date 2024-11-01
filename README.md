# Stock Portfolio Tracker

A simple stock-tracking application to monitor the value of a single stock holding based on real-time price updates and the number of shares owned. This app stores the selected stock symbol and portfolio data, allowing you to view your equity’s value conveniently.

## Features

- **Single Equity Tracking**: Store a single stock symbol to track.
- **Real-Time Price Updates**: Fetch the latest stock price from Alpha Vantage and display it.
- **Portfolio Value Calculation**: Calculate and display the total value based on the latest stock price and the number of shares owned.
- **Local Storage**: Save stock symbol, shares owned, and portfolio value for easy access when reopening the app.

## How to Use

1. **Enter a Stock Symbol**: Input a stock symbol in the search bar to select a stock.
2. **Enter Shares Owned**: Input the number of shares owned for the selected stock.
3. **View Portfolio Value**: The app will display the latest price and calculate the portfolio value based on the entered shares.

## API

This app uses the Alpha Vantage API to fetch real-time stock data. You’ll need an API key from Alpha Vantage to use this app.

## Technologies Used

- **React**: For building the UI.
- **JavaScript**: For logic and calculations.
- **Alpha Vantage API**: For real-time stock price data.
- **AWS Amplify**: For app deployment.

## Deployment

The app is deployed on AWS Amplify and can be accessed here: [Stock Portfolio Tracker on AWS](https://main.d2vchp228scbdb.amplifyapp.com/)

## Notes

This app is intended for personal use to monitor a single equity in your portfolio.

import React from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';


const Div = styled.div`
  text-align: center;
  background-color: rgb(99, 99, 100);
  color: #eee6e6;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          balance: 0.5,
          price: 35000.00
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          balance: 32.0,
          price: 1299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          balance: 0,
          price: 1.0
        },
        {
          name: 'Polkadot',
          ticker: 'DOT',
          balance: 254.0,
          price: 17.99
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          balance: 1000.2,
          price: 0.22
        },
      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  
  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map( function( {ticker, name, price} ) {
      let newPrice = price;
      if ( valueChangeTicker === ticker){
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage;
      }
      return {
        ticker,
        name,
        price: newPrice
      }
    });
    
    this.setState({ coinData: newCoinData });
  }

  render(){
    return (
      <Div>      
        <Header/>
        <AccountBalance amount={this.state.balance} showBalance={true} />
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} />
      </Div>
    );
  }
}

export default App;

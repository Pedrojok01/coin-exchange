import React, {useState, useEffect} from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/ExchangeHeader/ExchangeHeader';
import Footer from './components/ExchangeFooter/ExchangeFooter';
import styled from 'styled-components';
import axios from 'axios';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';


const Div = styled.div`
  text-align: center;
  background-color: rgb(99, 99, 100);
  color: #eee6e6;
`;

const formatPrice = price => parseFloat(Number(price).toFixed(2));

function App() {
  const [coinCount] = useState(20);
  const [balance, setBalance] = useState(25000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);
  
  const getTopIds = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    return response.data.slice(0, coinCount).map(coin => coin.id);
  }

  const getNewCoinData = async (ids) => {
    const response = await axios.get('https://api.coinpaprika.com/v1/tickers');
    const coin = response.data;
    let data = [];
    
    for (let i = 0; i < coin.length; i++) {
      for (let j = 0; j < ids.length; j++) {
        if (ids[j] === coin[i].id) {
          data.push({ 
            key: coin[i].id,
            rank: coin[i].rank,
            name: coin[i].name,
            ticker: coin[i].symbol,
            balance: 0,
            price: formatPrice(coin[i].quotes.USD.price),
            change: coin[i].quotes.USD.percent_change_7d + "%",
          });
        }
        data.sort((a, b) => (a.rank > b.rank) ? 1 : -1)
      }
    }
    return data;
  }

  const componentDidMount = async () => {
    const topIds = await getTopIds();
    const newCoinData = await getNewCoinData(topIds);
    setCoinData(newCoinData);
  }

  useEffect(function(){
    if ( coinData.length === 0 ) {
      componentDidMount();
    }
  });

  const handleBalanceVisibilityChange = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map( function( values ) {
      let newValues = {...values};
      if ( valueChangeId === values.key){
        newValues.price = newPrice;
      }
      return newValues;
    });  
    setCoinData(newCoinData);
  }

  const handleTransaction = (isBuy, valueChangeId) => { 
    const balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values };
      if (valueChangeId === values.key) {
        newValues.balance += balanceChange;
        setBalance( oldBalance => oldBalance - balanceChange * newValues.price );
      }
      return newValues;
    });    
    setCoinData(newCoinData);
  }

  const handleAirdrop = () => {
    setBalance(oldValue => oldValue + 1200);
  }

  return (
    <Div>      
      <Header/>
      <AccountBalance
        amount={balance} 
        showBalance={showBalance} 
        handleBalanceVisibilityChange = {handleBalanceVisibilityChange}
        handleAirdrop={handleAirdrop} />
      <CoinList
        coinData={coinData}
        showBalance={showBalance}
        handleRefresh={handleRefresh}
        handleTransaction={handleTransaction}/>
      <Footer/>
    </Div>
  );
}

export default App;
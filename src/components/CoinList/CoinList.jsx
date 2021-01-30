import React from 'react';
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
    font-size: 1rem;
    display: inline-block;
    width:90%;
    overflow: auto;
`;

export default function CoinList (props) {
    return (
        <Table className="table table-primary table-bordered">
        <thead>
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Last 7d</th>
            <th>Balance</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {
            props.coinData.map( ({key, rank, name, ticker, price, change, balance}) =>
                <Coin
                key={key}
                handleRefresh={props.handleRefresh}
                handleTransaction={props.handleTransaction}
                rank={rank}
                name={name}
                ticker={ticker} 
                price={price}
                change={change}
                balance={balance}
                showBalance={props.showBalance}
                id = {key} />
            )}
        </tbody>
        </Table>
    )
}

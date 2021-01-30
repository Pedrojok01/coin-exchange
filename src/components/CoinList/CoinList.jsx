import React from 'react';
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
    font-size: 1rem;
    display: inline-block;
    margin: 0 2rem 0 2rem;
`;

export default function CoinList (props) {
    return (
        <Table className="table table-primary table-bordered">
        <thead>
        <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Balance</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {
            props.coinData.map( ({key, name, ticker, price, balance}) =>
                <Coin
                key={key}
                handleRefresh={props.handleRefresh}
                handleTransaction={props.handleTransaction}
                name={name}
                ticker={ticker} 
                price={price}
                balance={balance}
                showBalance={props.showBalance}
                id = {key} />
            )}
        </tbody>
        </Table>
    )
}

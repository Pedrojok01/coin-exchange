import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './Coin.css';
import axios from 'axios';
import Popup from 'reactjs-popup';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 12vw;
`;

const TdRank = styled(Td)`
    width: 5vw;
`;

const TdControl = styled(Td)`
    width: 25vw;
`;

const TdName = styled(Td)`
    width: 18vw;
`;

const Button = styled.button`
    font-size: 12 px; 
    width: 64px;
    line-height: 12 px; 
    padding: 4px;
    border-radius: 5px; 
    margin: 3px 5px 0;
    border: 2px solid rgb(28, 110, 164); 
`;

const CoinName = styled.button`
    font-size: 1rem;
    width: 18vw;
`;

export default function Coin(props) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [coinDescription, setCoinDescription] = useState('');

    const handleRefresh = (event) => {
        event.preventDefault();
        props.handleRefresh(props.id);
    }

    const handleBuy = (event) => {
        event.preventDefault();
        props.handleTransaction(true, props.id);
    }
    const handleSell = (event) => {
        event.preventDefault();
        props.handleTransaction(false, props.id);
    }

    const CoinDescription = async (event) => {
        setOpen(o => !o);
        const promise = await axios.get(`https://api.coinpaprika.com/v1/coins/${props.id}`);
        const coinDesc = promise.data.description;
        setCoinDescription(coinDesc);
    }

    return (
        <tr>
            <TdRank>{props.rank}</TdRank>
            <Td>
                <CoinName 
                    className="btn btn-primary" 
                    onClick={CoinDescription}>
                    {props.name}
                </CoinName>
            </Td>
            <Popup 
                open={open} 
                closeOnDocumentClick 
                onClose={closeModal}>
                    <div className="popup">
                    <button className="close" onClick={closeModal}>
                        &times;
                    </button>
                        {coinDescription}
                    </div>
            </Popup>
            <Td>{props.ticker}</Td>
            <TdName>${props.price}</TdName>
            <Td>{props.change}</Td>
            <Td>{props.showBalance ? props.balance : '-'}</Td>
            <TdControl>
                <form action="">
                    <Button className='btn btn-info' onClick={handleRefresh}>Refresh</Button>
                    <Button className='btn btn-success' onClick={handleBuy}>Buy</Button>
                    <Button className='btn btn-danger' onClick={handleSell}>Sell</Button>
                </form>
            </TdControl>
        </tr>
    );
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}  
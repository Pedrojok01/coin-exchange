import React, { Component } from 'react'
import logo from './logo.png';
import styled from 'styled-components';
import HeaderStyling from './HeaderStyling.css';

const Img = styled.img`
    height: 10vmin;
    pointer-events: none;
    margin-right: 2rem;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 15vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
`;

const H1 = styled.h1`
    font-size: 3rem;
    line-height:8rem;
    fold-weight: bold;
    min-width: 300px;
`;

export default class ExchangeHeader extends Component {
    render() {
        return (
            <Header>
                <Img className= "rotate" src={logo} alt="logo"/>
                <H1>
                      Top 20 Crypto By Market Cap  
                </H1>
            </Header>
        )
    }
}

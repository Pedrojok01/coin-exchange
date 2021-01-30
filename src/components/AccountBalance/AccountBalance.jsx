import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: center;
    margin-bottom:2rem;
    line-height: 3rem;
    display: inline-block;
`;

const Button = styled.button`
    margin: 0 8px;
`;

const BalanceButton = styled(Button)`
    width: 150px;
`;

const Balance = styled.div`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 2em;
    text-align: right;
`;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export default function AccountBalance(props) {
    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    let content = '\u00A0';
    if (props.showBalance) {
        content = <>{ formatter.format(props.amount)}</>;
    }
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-default' : 'btn-info')
    return (
        <>
            <Balance>
                {content}
            </Balance>
            <Section>
                <BalanceButton
                    onClick={props.handleBalanceVisibilityChange}
                    className={buttonClass}>
                    {buttonText}
                </BalanceButton>
                <Button
                    onClick={props.handleAirdrop}
                    className="btn btn-success">
                    AirDrop <i className="fas fa-helicopter"></i>
                </Button> 
            </Section>
        </>
    );
}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}  
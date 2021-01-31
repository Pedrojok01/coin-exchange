import React, { Component } from 'react';
import './ExchangeFooter.css'

export default class ExchangeFooter extends Component{
    render(){
        return (
            <footer className="footer">
                <div>
                    <div>
                        <p>Powered by <a className="link" href="https://coinpaprika.com/">coinpaprika.com</a></p>
                    </div>
                    <hr/>
                    <div>
                        <p >Designed by: <a className="link" href="https://pedrojok01.github.io/">pedrojok01</a></p>
                    </div>
                </div>
            </footer>
        );
    }
}
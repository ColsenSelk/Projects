//import React from 'react';
//import ReactDOM from 'react-dom';
//var React = require('react');

        /*
        var money = 50.00;
        var moneyElem = document.createElement("p");
        var moneyElemStyle = "right: 5%; top: 0%; width: 100px; height: 60px; text-align: center; line-height: 60px; font-size: 50px; color: #C9C9C9; position: absolute; visibility: visible;";
        moneyElem.style = moneyElemStyle;
        moneyElem.innerText = money.toFixed(2);
        document.getElementById('all').appendChild(moneyElem);
        var moneyElem2 = document.createElement("span");
        moneyElem2.innerHTML = "$";
        moneyElem2.style = "color: green;";
        moneyElem.appendChild(moneyElem2);
        */

        class Money extends React.Component {
            
            constructor(props) {
                super(props);
                this.state = {
                    value: null,
                };
            }
            
            render() {
                return ( 
                    <p>
                        money 
                    </p>
                );
            }
        }

        ReactDOM.render(
            <Money />,
            document.getElementById('all')
        );
        
        
/*
 style = "right: 5%; top: 0%; width: 100px; height: 60px; text-align: center; line-height: 60px; font-size: 50px; color: #C9C9C9; position: absolute; visibility: visible;"

{money.toFixed(2)}
<span style = "color: green">$</span>



<script src="JavaScriptHtml3.jsx"></script>
*/
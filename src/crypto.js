import React, {Component} from "react";
import './crypto.css'
import CryptoList from "./crypto-list";
import axios from 'axios';


class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cryptoList: [],
            savedCryptoList: [],
        }
    }


    fetchData() {
        axios.get(`https://blockchain.info/pl/ticker`)
            .then(res => {
              let cryptoList = [];
              let oldCrypto = this.state.cryptoList;
              for (let key in res.data) {
                let object = {
                  cur: key,
                  ...res.data[key],
                }
        
                let oldRate = oldCrypto.find(obj => obj.cur === object.cur)

                if(oldRate !== undefined){
                    if(oldRate.last === object.last) {
                        object.class = 'equal';
                        object.arrow = String.fromCharCode(8596);
                        } else if(oldRate.last < object.last) {
                        object.class = 'decrease';
                        object.arrow = String.fromCharCode(8595);
                        } else if(oldRate.last < object.last) {
                        object.class = 'increase';
                        object.arrow = String.fromCharCode(8593);
                        } 
                    } else {
                        object.class = 'equal';
                        object.arrow = String.fromCharCode(8596);
                }
                cryptoList.push(object);
              }
    
              this.setState({
                cryptoList: cryptoList,
                savedCryptoList: cryptoList,
              });

            });
    }

    
    componentDidMount() {
        this.fetchData()
        this.interval = setInterval(() => {
            if(this.inputValue.value === ""){
            this.fetchData()
            }
        }, 5000);
      }

      onFilter = () => {
        let filter = this.inputValue.value.trim().toUpperCase();
        let filteredCryptoList = this.state.cryptoList;
        // let savedCryptoList = this.state.cryptoList
        console.log(filteredCryptoList);
        filteredCryptoList = this.state.savedCryptoList.filter((currency) => {
          return currency.cur.includes(filter)});
        console.log(filteredCryptoList);
        
        this.setState({
          cryptoList: filteredCryptoList,
        });
           
      }
    

    render() {

      return (
        <div className="crypto">
          <header className="main-header">
            <h1>current bitcoin course</h1>
            <i className="fab fa-bitcoin"></i>
          </header>
          <input type="text" className="search-box" placeholder="Search by currency" ref={input => this.inputValue = input} onChange = {this.onFilter}/>
          <CryptoList cryptoList = {this.state.cryptoList}/>
        </div>
      );
    }
  }
  
  export default Crypto;
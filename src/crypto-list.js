import React, {
  Component
} from "react";
import './crypto-list.css'

class CryptoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  render() {
    return ( 
    <div className = "crypto-list-container">
      <ul className = "crypto-list" > {
        this.props.cryptoList.map((obj) => {
          return <li  key = {obj.cur}> Last rate: < span className={obj.class}> {obj.last} </span> <span className={obj.class}>{obj.arrow}</span> {obj.cur} {obj.symbol} </li>})} 
      </ul>
    </div>
    );
  }
}

export default CryptoList;
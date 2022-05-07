import { React, useState } from "react";
import styles from "./Wallet.module.css";

const Interactions = (props) => {
  console.log(props.infor);
  const [transferHash, setTransferHash] = useState("");

  const transferHandler = async (e) => {
    e.preventDefault();
    var transferAmount = (
      e.target.sendAmount.value * 1000000000000000000
    ).toString();
    let recieverAddress = "0xb438185e405722CE0612D9625CB6742bd3386Dc1";

    let txt = await props.contract.transfer(recieverAddress, transferAmount);
    setTransferHash(
      "this product was bought"
    );
  };

  return (
    <div className={styles.interactionsCard}>
        <img src={props.infor.img} style={{
            width: '100%',
            height: '240px',
            // borderRadius: '50%',
            position: 'relative',
            left: '50%',
            bottom: '20px',
            transform: "translateX(-50%)"

        }} />
      <form onSubmit={transferHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
          
        <h3> {props.infor.title}</h3>

        
        <input
          type="number"
          id="sendAmount"
          value={props.infor.Price}
          min="0"
          step="1"
        
        />

        <button
          type="submit"
        //   className={styles.button6}
        style={{ padding: '10px 45px'}}
          disabled={transferHash ? true : false}
        >
          BUY
        </button>
        <div>{transferHash}</div>
      </form>
    </div>
  );
};

export default Interactions;

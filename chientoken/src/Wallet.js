import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "./Wallet.module.css";
import simple_token_abi from "./Contracts/simple_token_abi.json";
import Interactions from "./Interactions";
import Product from "./Products";
import { useModal } from "react-hooks-use-modal";
import Menu from "./Menu";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();

  const data = localStorage.getItem("accessToken");
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  // deploy simple token contract and paste deployed contract address here. This value is local ganache chain
  let contractAddress = "0x2906b9e26361C2C4f4Fb5E6E66128F36c633D799";

  const [errorMessage, setErrorMessage] = useState(null);
  const [value, setValue] = useState(0);
  const [valueTitle, setValueTitle] = useState("");
  const [img, setImg] = useState("");

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [tokenName, setTokenName] = useState("Token");
  const [balance, setBalance] = useState(null);
  const [transferHash, setTransferHash] = useState(null);
  const [arr, setArr] = useState([]);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };
  const addPruduct = async () => {
    try {
      const getToken = localStorage.getItem('accessToken')
      const res = await axios.post(
        "http://localhost:5001/product",
        {
          price: value,
          title: valueTitle,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      if (res) {
        setArr([
          ...arr,
          res?.data
        ]);
      }
    } catch (error) {}

    setValue(0);
    setValueTitle("");
    close();
  };

  const updateBalance = async () => {
    let balanceBigN = await contract.balanceOf(defaultAccount);
    let balanceNumber = balanceBigN.toNumber();

    let tokenDecimals = await contract.decimals();

    let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

    setBalance(toFixed(tokenBalance));
  };

  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      const data = await axios.get("http://localhost:5001/product");
      if (data) {
        setArr(data?.data);
      }
    } catch (error) {}
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };
  const handleImg = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      simple_token_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  useEffect(() => {
    if (contract != null) {
      updateBalance();
      updateTokenName();
    }
  }, [contract]);
  if (!data) {
    return navigate("/login");
  }

  const updateTokenName = async () => {
    setTokenName(await contract.name());
  };

  return (
    <div>
      <Menu />
      <h2 style={{ textAlign: "center" }}> {tokenName + " ERC-20 Wallet"} </h2>
      <button className={styles.button6} onClick={connectWalletHandler}>
        {connButtonText}
      </button>
      <header>
        <div class="overlay">
          <h1>Token Address</h1>
          <h3>Reasons for Choosing US</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
            nostrum quis, odio veniam itaque ullam debitis qui magnam
            consequatur ab. Vero nostrum quis, odio veniam itaque ullam debitis
            qui magnam consequatur ab.
          </p>
          <button>{defaultAccount}</button>
        </div>
      </header>

      <div className={styles.walletCard}>
        <div>{/* <h3>Address: {defaultAccount}</h3> */}</div>

        <div>{/* <h3>{tokenName} Balance: {balance}</h3> */}</div>

        {errorMessage}
      </div>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "auto auto auto",
          marginTop: "50px",
          paddingLeft: "40px",
        }}
      >
        {arr.map((e, index) => {
          return (
            <div key={index} style={{ width: "350px" }}>
              <Interactions contract={contract} infor={e} />
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={open}>Add pruduct</button>
        <Modal>
          <div className={styles.popup} style={{ padding: "20px" }}>
            <h1>Name product</h1>
            <input
              value={valueTitle}
              onChange={(e) => {
                setValueTitle(e.target.value);
              }}
              style={{
                outline: "none",
                border: "1px solid black",
                background: "white",
                padding: "0 20px",
              }}
            />
            <p>Price</p>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            {/* <p>Image</p> */}
            {/* <input type="file" onChange={(e) => handleImg(e)} /> */}
            <button onClick={() => addPruduct()}>Confirm</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Wallet;

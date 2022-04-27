import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import { useEthers } from "@usedapp/core";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import Button from "@material-ui/core/Button";
import SendEther from "./artifacts/contracts/SendEther.sol/SendEther.json";
import { ethers } from "ethers";
import { MuiThemeProvider } from "@material-ui/core";
// import { ThemeProvider } from "@mui/material";
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const SendEtherContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    padding: theme.spacing(4),
  },
  palette: {
    background: {
      default: "#222222",
    },
  },
}));

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222",
    },
  },
});

function App() {
  const SendEthereum = async (addressToSend, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        SendEtherContractAddress,
        SendEther.abi,
        signer
      );
      console.log(contract);
      try {
        const val = "2";
        const stringAmount = amount.toString();
        console.log(typeof addressToSend, addressToSend);
        console.log(addressToSend);
        const tx = await contract.send_ether(addressToSend, {
          value: ethers.utils.parseEther(stringAmount),
        });
        console.log("tx: ", tx);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  const etherValueInputRef = useRef();
  const [ethValue, setEthValue] = useState(0);
  const [address, setAddress] = useState(0);

  const sendEther = (event) => {
    console.log("sending ether line 91");
    console.log(
      "sending values: \n address",
      address,
      "\netherValue: ",
      ethValue
    );
    event.preventDefault();
    SendEthereum(address, ethValue);
  };

  const handleEthChange = (event) => {
    setEthValue(event.target.value);
    console.log(ethValue);
  };

  const handleAddressChange = (event) => {
    console.log("handling address changeline 109");
    setAddress(event.target.value);
    console.log(address);
  };

  console.log(address);

  return (
    <div className="App">
      <br />
      <header className="App-header">
        <form onSubmit={sendEther}>
          <div className="inputField">
            <h3>Amount of ether</h3>
            <TextField
              label="ethAmount"
              variant="outlined"
              id="ethAmount"
              type="number"
              onChange={handleEthChange}
              ref={etherValueInputRef}
              placeholder="amount of eth"
            ></TextField>
          </div>
          <br />

          <div className="inputField">
            <h3>Address to send ether</h3>
            <TextField
              label="address"
              variant="outlined"
              id="address"
              type="text"
              onChange={handleAddressChange}
              ref={etherValueInputRef}
              placeholder="address of user"
            ></TextField>
          </div>

          <br />
          <br />
          <Button type="submit" color="secondary" variant="contained">
            Send ether
          </Button>
        </form>
      </header>
    </div>
  );
}

export default App;

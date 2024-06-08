import React, { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
} from "wagmi";
import { injected } from "wagmi/connectors";
import styles from "./App.module.css";
import { config } from "./web3/config";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Main from "./components/Main";

ChartJS.register(ArcElement, Tooltip, Legend);

const App: React.FC = () => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    config: config,
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>PoC Fake wETH Transferer.</h1>
      {!isConnected ? (
        <button
          className={styles.button}
          onClick={() => connect({ connector: injected() })}
        >
          Connect Wallet
        </button>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default App;

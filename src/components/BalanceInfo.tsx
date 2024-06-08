import React from "react";
import styles from "../App.module.css";

const BalanceInfo: React.FC<{
  address: `0x${string}` | undefined;
  ethBalance: string;
  fakeEthBalance: string;
  fakeEthSymbol: string;
}> = ({ address, ethBalance, fakeEthBalance, fakeEthSymbol }) => {
  return (
    <div>
      <p>
        <span className={styles.labels}>Address:</span>{" "}
        <a
          target="_blank"
          href={`${process.env.REACT_APP_BLOCK_EXPLORER}/address/${address}`}
          rel="noreferrer"
        >
          {address}
        </a>
      </p>
      <p>
        <span className={styles.labels}>ETH Balance:</span> {ethBalance} ETH
      </p>
      <p>
        <span className={styles.labels}>FAKE_WETH Balance:</span>{" "}
        {fakeEthBalance} {fakeEthSymbol}
      </p>
    </div>
  );
};

export default BalanceInfo;

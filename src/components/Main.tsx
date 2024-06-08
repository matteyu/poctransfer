import React, { useEffect, useState } from "react";
import styles from "../App.module.css";
import { useAccount, useDisconnect } from "wagmi";
import Chart from "./Chart";
import BalanceInfo from "./BalanceInfo";
import Transfer from "./Transfer";
import Loading from "./Loading";
import { getNativeBalance, getERC20Balance } from "../web3/utils";

const Main: React.FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState<boolean>(false);
  const [ethBalance, setEthBalance] = useState<string | null>("0");
  const [fakeEthBalance, setFakeEthBalance] = useState<string | null>("0");
  const [fakeEthSymbol, setFakeEthSymbol] = useState<string | null>(
    "FAKE_WETH"
  );

  useEffect(() => {
    (async () => {
      try {
        const nativeBalance = await getNativeBalance();
        const erc20Balance = await getERC20Balance();
        setEthBalance(nativeBalance);
        setFakeEthBalance(erc20Balance.value);
        setFakeEthSymbol(erc20Balance.symbol);
      } catch (err) {
        console.log(err);
        setEthBalance("0");
        setFakeEthBalance("0");
      }
    })();
  }, []);

  return (
    <div className={styles.content}>
      <button className={styles.button} onClick={() => disconnect()}>
        Disconnect Wallet
      </button>
      <div className={styles.balanceInfo}>
        <div className={styles.balanceLeft}>
          <BalanceInfo
            address={address}
            ethBalance={ethBalance || "0"}
            fakeEthBalance={fakeEthBalance || "0"}
            fakeEthSymbol={fakeEthSymbol || "FAKE_WETH"}
          />
          <Transfer
            address={address}
            setLoading={setLoading}
            balances={[ethBalance || "0", fakeEthBalance || "0"]}
          />
        </div>
        <div className={styles.balanceRight}>
          {loading ? (
            <Loading />
          ) : (
            <Chart
              symbols={["ETH", fakeEthSymbol || "FAKE_WETH"]}
              balances={[ethBalance || "0", fakeEthBalance || "0"]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;

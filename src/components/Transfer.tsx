import React from "react";
import styles from "../App.module.css";
import { checkAllowance, transferToken } from "../web3/utils";

const Transfer: React.FC<{
  address: `0x${string}` | undefined;
  balances: string[];
  setLoading: (val: boolean) => void;
}> = ({ address, balances, setLoading }) => {
  const formattedBalances = balances.map((balance) => Number(balance));
  const totalBalances = formattedBalances.reduce((pre, curr) => pre + curr, 0);

  const handleTransfer = async () => {
    if (address && totalBalances) {
      setLoading(true);
      try{
        await checkAllowance()
        await transferToken()
      }
      catch(err){
        console.log(err)
      }
      setLoading(false);
    }
  };
  return (
    <div>
      <button disabled={!totalBalances} className={styles.button} onClick={handleTransfer}>
        Transfer Fake_WETH
      </button>
    </div>
  );
};

export default Transfer;

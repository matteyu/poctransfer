import React from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "../App.module.css";

const Chart: React.FC<{ balances: string[]; symbols: string[] }> = ({
  balances,
  symbols,
}) => {
  const formattedBalances = balances.map((balance) => Number(balance));
  const totalBalances = formattedBalances.reduce((pre, curr) => pre + curr, 0);
  if (!totalBalances) {
    return (
      <div className={styles.loading}>
        <p>No available balances</p>
      </div>
    );
  }
  return (
    <Doughnut
      data={{
        labels: symbols,
        datasets: [
          {
            label: "Balance",
            data: formattedBalances,
            backgroundColor: ["#676d93", "#ff4fd4"],
            hoverOffset: 4,
          },
        ],
      }}
    />
  );
};

export default Chart;

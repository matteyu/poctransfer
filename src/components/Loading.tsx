import React from "react";
import { PulseLoader } from "react-spinners";
import styles from "../App.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <p>Transaction in Progress..</p>
      <PulseLoader color="#511ff5" />
    </div>
  );
};

export default Loading;

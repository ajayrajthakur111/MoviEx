import React from "react";
import styles from "./Loader.module.css";

export const Loader: React.FC = () => {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
};

import React from "react";
import styles from "./styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loader}>
      <div className={styles.loader_inner}></div>
    </div>
  );
}

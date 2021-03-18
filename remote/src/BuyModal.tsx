import React, { FC } from "react";
import styles from "./BuyModal.scss";

// @ts-ignore
const TextBox = React.lazy(() => import("http://127.0.0.1:3002/nest-module.mjs"));

interface Props {
  text: string;
  visible: boolean;
  onClose: () => void;
}

const BuyModal: FC<Props> = ({ text, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div
      className={styles["modal"]}
      onClick={() => {
        onClose();
      }}
    >
      <div className={styles["modal-content"]}>
        <span className={styles["close"]}>&times;</span>
        <p>{text}</p>
        <TextBox text={text}></TextBox>
      </div>
    </div>
  );
};

export default BuyModal;

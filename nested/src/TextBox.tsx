import React, { FC } from "react";
import styles from "./TextBox.scss";

interface Props {
  text: string;
}

const TextBox: FC<Props> = ({ text }) => {
  return <div className={styles["box"]}>{`nested text box: ${text}`}</div>;
};

export default TextBox;

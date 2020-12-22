import styles from "./index.scss";

const HelloWorld = ({ text, onInputUpdate }) => {
  return (
    <div>
      <input
        className={styles["input-class"]}
        value={text}
        onChange={onInputUpdate}
      ></input>
    </div>
  );
};

export default HelloWorld;

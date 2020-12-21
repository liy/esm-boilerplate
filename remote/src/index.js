const HelloWorld = ({ text, onInputUpdate }) => {
  return (
    <div>
      <input value={text} onChange={onInputUpdate}></input>
    </div>
  );
};

export default HelloWorld;

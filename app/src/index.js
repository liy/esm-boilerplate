const HelloWorld = React.lazy(() => import("http://127.0.0.1:3001/esm.js"));

function Main() {
  const [text, setText] = React.useState("hello");

  return (
    <div>
      <div>
        <b>Root app</b>
        <div>
          This is a rough demo for loading remote react component or library.
        </div>
        <div>{text}</div>
      </div>
      <br></br>
      <div>
        <b>Sub module</b>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <HelloWorld
          text={text}
          onInputUpdate={(event) => {
            setText(event.target.value);
          }}
        ></HelloWorld>
      </React.Suspense>
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById("app"));

const HelloWorld = React.lazy(() => import("http://127.0.0.1:3001/esm.js"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

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
        <ErrorBoundary>
          <HelloWorld
            text={text}
            onInputUpdate={(event) => {
              setText(event.target.value);
            }}
          ></HelloWorld>
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById("app"));

import Title from "./Title";

const BuyModal = React.lazy(() =>
  import("http://127.0.0.1:3001/esm.mjs").then((module) => {
    console.log(module);
    return { default: module.BuyModal };
  })
);
const BuyButton = React.lazy(() =>
  import("http://127.0.0.1:3001/esm.mjs").then((module) => {
    console.log(module);

    return { default: module.BuyButton };
  })
);

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
  const [text, setText] = React.useState("Want a washing machine?");
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <div>
      <Title></Title>
      <div>
        <div>
          This is a rough demo for loading remote react component or library.
        </div>
        <div>{text}</div>
        <button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Open Modal
        </button>
      </div>
      <br></br>
      <div>
        <b>Remote module</b>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <BuyButton
            sku="EWD81483WUKN_WH"
            onClick={(value) => {
              setText(value);
            }}
          ></BuyButton>
          <BuyModal
            text="this is a lazy loaded modal component"
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
          ></BuyModal>
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById("app"));

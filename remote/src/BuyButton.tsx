import React, { FC } from "react";
import TestLabel from "./TestLabel";

interface Props {
  sku: string;
  text: string;
  onClick: (value: string) => void;
}

const BuyButton: FC<Props> = ({ sku, onClick }) => {
  const initialQuantity: number = Number(localStorage.getItem("quantity")) || 0;

  const [processing, setProcessing] = React.useState<boolean>(false);
  const [quantity, setQuantity] = React.useState<number>(initialQuantity);

  return (
    <div>
      {processing ? <TestLabel text={"Processing order"}></TestLabel> : null}
      <button
        disabled={processing}
        onClick={() => {
          setProcessing(true);
          setTimeout(() => {
            setProcessing(false);
            setQuantity(quantity + 1);
            localStorage.setItem("quantity", (quantity + 1).toString());
            onClick(`You have bought ${quantity + 1} pineapple!`);
          }, 2000);
        }}
      >
        Buy me now!!
      </button>
      <div>{quantity !== 0 ? `${quantity} pineapple` : null}</div>
    </div>
  );
};

export default BuyButton;

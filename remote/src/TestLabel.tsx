import React, { FC } from "react";

interface Props {
  text: string;
}

const TestLabel: FC<Props> = ({ text }) => {
  return <div>{text}</div>;
};

export default TestLabel;

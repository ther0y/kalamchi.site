import { FC } from "react";

type props = {
  show: boolean;
};

const Spinner: FC<props> = ({ show }) => {
  return <div className={"loading-spinner" + (show ? " show" : "")} />;
};

export default Spinner;

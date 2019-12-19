import React from "react";
import Loader from "react-loader-spinner";

export const OwnLoader = () => {
  return (
    <Loader
      type="Bars"
      color="#d77fa1"
      height={50}
      width={50}
      style={{ textAlign: "center" }}
    />
  );
};

import React from "react";
import Navigation from "./Navigation";

const Protected = ({ children }) => {
  return (
    <div className="flex">
      <Navigation />
      {children}
    </div>
  );
};

export default Protected;

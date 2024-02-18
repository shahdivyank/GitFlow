import React from "react";
import Navigation from "./Navigation";

const Protected = ({ children, title }) => {
  return (
    <div className="flex">
      <Navigation />
      <title>{title}</title>
      {children}
    </div>
  );
};

export default Protected;

import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div>
      <h1 className="text-4xl">Esta página no existe</h1>
      <Link to="/">
        <button>Regresar</button>
      </Link>
    </div>
  );
};

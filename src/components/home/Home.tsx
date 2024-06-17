import React from "react";
import { routes } from "../../routes/router";

export const Home = () => {
  return (
    <>
      <div className="container">
        {routes.map((e) => (
          <p>
            <a href={e.path}>{e.name}</a>
          </p>
        ))}
      </div>
    </>
  );
};

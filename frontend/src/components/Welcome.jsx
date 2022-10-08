import React from "react";

const Welcome = (props) => {
  return (
    <div>
      <h1 className="title">Dashboard {props.role}</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{props.username}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
